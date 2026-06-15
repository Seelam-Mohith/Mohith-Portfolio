import emailjs from '@emailjs/browser'

export const EMAILJS_CONFIG = {
  publicKey: 'deB8BUinhLkzaGM3V',
  serviceID: 'service_32yho48',
  templateID: 'template_a6juqw4',
}

emailjs.init(EMAILJS_CONFIG.publicKey)

export const sendEmail = async ({ name, email, subject, message }) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      { name, email, subject, message }
    )
    return { success: true, response }
  } catch (error) {
    console.error('EmailJS error:', error)
    return { success: false, error }
  }
}
