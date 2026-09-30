import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ *
 * Tunables — everything that controls the feel of the animation.
 * ------------------------------------------------------------------ */
const CONFIG = {
  src: '/charc_movement_scrub.mp4',
  pointerSmoothing: 0.13, // lerp factor for the cursor vector (per 60fps frame)
  timeSmoothing: 0.16, // lerp factor for the video time (per 60fps frame)
  deadZone: 0.22, // cursor radius below this keeps the character neutral
  fullStrength: 0.75, // cursor radius at which the character is fully committed
  intensityGamma: 1.35, // shapes distance -> strength (higher = stays neutral longer)
  maxSweepRate: 10, // max video seconds advanced per real second
  sourceFps: 24, // seeks are quantised to the source frame grid
  neutralTime: 9.96, // pose at the centre of the hero / cursor outside the hero
  dirHysteresis: 0.05, // turns of hysteresis on the shortest-path direction
}

/* Poses read off the source video's timeline.
 * `turn` is measured clockwise from "up" in eighths of a full circle. */
/* Poses read off the source video's timeline (24fps, 240 frames).
 * `turn` is measured clockwise from "up" in eighths of a full circle.
 * NOTE the last entry is 11.00s, NOT 0.00s. Frame 0 of this clip is the
 * character standing at centre, so wrapping to 0.00s would point the
 * top of the hero at a neutral pose instead of looking up. 11.00s is the
 * same 1.00s frame-24 "up" pose one loop later; the unwrapping in tick()
 * picks whichever copy is closest to the current playhead. */
const POSES = [
  { turn: 0.0, time: 1.0 }, // up (f24)
  { turn: 0.125, time: 1.75 }, // upper-right (f42)
  { turn: 0.25, time: 2.5 }, // right (f60)
  { turn: 0.375, time: 3.75 }, // lower-right (f90)
  { turn: 0.5, time: 4.875 }, // down (f117, held f114-120)
  { turn: 0.625, time: 5.75 }, // lower-left (f138)
  { turn: 0.75, time: 6.875 }, // left (f165, held f162-168)
  { turn: 0.875, time: 8.0 }, // upper-left (f192)
  // The gap between upper-left and up carries the video's own return-to-centre
  // tail (f216 centre, f234-239 idle), which is what keeps the wrap seamless.
  { turn: 0.9167, time: 9.0 }, // centre (f216)
  { turn: 0.9583, time: 9.96 }, // neutral / idle (f239)
  { turn: 1.0, time: 11.0 }, // up again (f24 of the next loop)
]

const NEUTRAL_TURN = 0.9583
const FALLBACK_DURATION = 10
const TAU = Math.PI * 2

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)

/* Continuous, piecewise-linear lookup over the pose table. Never returns a
 * bare timestamp: between any two poses it interpolates. */
function timeForTurn(turn) {
  const t = ((turn % 1) + 1) % 1
  for (let i = 0; i < POSES.length - 1; i += 1) {
    const a = POSES[i]
    const b = POSES[i + 1]
    if (t >= a.turn && t <= b.turn) {
      const f = (t - a.turn) / (b.turn - a.turn)
      return a.time + (b.time - a.time) * f
    }
  }
  return POSES[0].time
}

export default function CursorFollowVideo({ areaRef, className = '', ...motionProps }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    // Paused timeline only — playback is never started.
    video.pause()
    video.currentTime = CONFIG.neutralTime

    const coarse = window.matchMedia('(pointer: coarse)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (coarse.matches || reduced.matches) return undefined

    const state = {
      px: 0, // raw cursor, viewport space
      py: 0,
      x: 0, // smoothed cursor, normalised to the hero box
      y: 0,
      dir: 0, // shortest-path direction, latched for hysteresis
      time: CONFIG.neutralTime,
      maxTime: FALLBACK_DURATION,
      rect: null,
      rectDirty: true,
      lastFrame: -1,
      seekPending: false,
      seekTimer: 0,
      raf: 0,
      prev: 0,
    }

    // Chromium/WebKit/Safari expose this; Firefox has it too. Without it we
    // fall back to seeking every frame, which the denser keyframes make cheap.
    const canFrameCallback = typeof video.requestVideoFrameCallback === 'function'

    const onPresented = () => {
      state.seekPending = false
      window.clearTimeout(state.seekTimer)
    }

    const onMetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) state.maxTime = video.duration
      video.currentTime = CONFIG.neutralTime
      state.time = CONFIG.neutralTime
      state.lastFrame = -1
    }

    const area = () => (areaRef && areaRef.current) || video.closest('section') || video

    const onMove = (e) => {
      state.px = e.clientX
      state.py = e.clientY
    }

    const onLayout = () => {
      state.rectDirty = true
    }

    const tick = (now) => {
      const dt = clamp((now - state.prev) / 1000, 0.001, 0.05)
      state.prev = now

      if (state.rectDirty) {
        state.rect = area().getBoundingClientRect()
        state.rectDirty = false
      }
      const rect = state.rect
      const rx = rect.width / 2
      const ry = rect.height / 2

      // Cursor relative to the hero, normalised to the box. Staying outside the
      // hero collapses the target to the centre, which relaxes to neutral.
      const tx = rx > 0 ? clamp((state.px - (rect.left + rx)) / rx, -1, 1) : 0
      const ty = ry > 0 ? clamp((state.py - (rect.top + ry)) / ry, -1, 1) : 0

      const kp = 1 - Math.pow(1 - CONFIG.pointerSmoothing, dt * 60)
      state.x += (tx - state.x) * kp
      state.y += (ty - state.y) * kp

      const radius = Math.hypot(state.x, state.y)
      const reach = clamp(
        (radius - CONFIG.deadZone) / (CONFIG.fullStrength - CONFIG.deadZone),
        0,
        1
      )
      const intensity = Math.pow(reach, CONFIG.intensityGamma)

      let targetTurn = NEUTRAL_TURN
      if (intensity > 0.0001) {
        const turn = (Math.atan2(state.x, -state.y) / TAU + 1) % 1
        const raw = turn - NEUTRAL_TURN
        let delta = raw - Math.round(raw)
        // Latch the sweep direction so a cursor parked on the antipode of the
        // neutral pose cannot flip between the two equally long paths.
        if (state.dir > 0 && raw < -(0.5 + CONFIG.dirHysteresis)) delta = raw + 1
        else if (state.dir < 0 && raw > 0.5 + CONFIG.dirHysteresis) delta = raw - 1
        if (delta !== 0) state.dir = delta > 0 ? 1 : -1
        targetTurn = NEUTRAL_TURN + delta * intensity
      }

      const mapped = timeForTurn(targetTurn)
      const mappedTime = Number.isFinite(mapped) ? mapped : CONFIG.neutralTime
      // Unwrap onto the periodic timeline. Frame 0 and frame 238 are the same
      // pose, so the 9.9 -> 0.0 wrap is one frame of travel, not a full sweep:
      // without this the character would visibly hang on the neutral pose.
      const dur = state.maxTime > 0 ? state.maxTime : FALLBACK_DURATION
      const targetTime = mappedTime + Math.round((state.time - mappedTime) / dur) * dur

      const kt = 1 - Math.pow(1 - CONFIG.timeSmoothing, dt * 60)
      const cap = CONFIG.maxSweepRate * dt
      state.time += clamp((targetTime - state.time) * kt, -cap, cap)

      const frames = Math.max(1, Math.round(state.maxTime * CONFIG.sourceFps))
      const frame = ((Math.round(state.time * CONFIG.sourceFps) % frames) + frames) % frames

      // Only ever keep ONE seek in flight. Writing currentTime faster than the
      // browser can decode and present just builds a queue of stale seeks, and
      // the video lands on an old frame. requestVideoFrameCallback tells us
      // when the previous seek actually reached the screen; until then we hold
      // the newest target and jump straight to it once we are free. The
      // watchdog stops us deadlocking if a browser never fires the callback.
      if (frame !== state.lastFrame && !state.seekPending && video.readyState >= 2) {
        state.lastFrame = frame
        video.currentTime = frame / CONFIG.sourceFps
        if (canFrameCallback) {
          state.seekPending = true
          video.requestVideoFrameCallback(onPresented)
          window.clearTimeout(state.seekTimer)
          state.seekTimer = window.setTimeout(onPresented, 200)
        }
      }

      state.raf = window.requestAnimationFrame(tick)
    }

    video.addEventListener('loadedmetadata', onMetadata)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onLayout, { passive: true })
    window.addEventListener('resize', onLayout, { passive: true })
    state.rect = area().getBoundingClientRect()
    state.prev = performance.now()
    state.raf = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(state.raf)
      window.clearTimeout(state.seekTimer)
      video.removeEventListener('loadedmetadata', onMetadata)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onLayout)
      window.removeEventListener('resize', onLayout)
      video.pause()
    }
  }, [areaRef])

  return (
    <motion.video
      ref={videoRef}
      {...motionProps}
      src={CONFIG.src}
      muted
      playsInline
      preload="auto"
      aria-label="Character reacting to the cursor"
      className={className}
    />
  )
}