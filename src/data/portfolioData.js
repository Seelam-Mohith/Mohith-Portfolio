export const personalData = {
  name: 'Mohith Seelam',
  subtitle: 'CSE Student | AIML | MERN | Cybersecurity | 2× Hackathon Winner',
  intro: 'Passionate developer focused on building intelligent applications, full-stack web solutions, and innovative products that solve real-world problems.',
  about: "I am a Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, and Full-Stack Development. I enjoy participating in hackathons, building innovative products, and continuously learning new technologies. My interests include MERN Stack Development, AI-powered applications, cloud technologies, and competitive programming.",
  email: 'seelammohith2222@gmail.com',
  social: {
    github: 'https://github.com/Seelam-Mohith',
    linkedin: 'https://www.linkedin.com/in/mohith-seelam',
    leetcode: 'https://leetcode.com/MohithSeelam',
  },
  // TODO: Replace with actual resume PDF link (e.g., '/resume.pdf' or Google Drive link)
  resumeUrl: 'https://drive.google.com/file/d/1F3htDIqYH95Wcf4r9I4XbnvhHZxjlRp4/view',
}

export const education = {
  degree: 'B.Tech in Computer Science Engineering',
  specialization: 'Cybersecurity, Blockchain and IoT',
  university: 'University Name',
  year: '2023 - 2027',
  cgpa: '8.5/10',
}

export const interests = [
  'Artificial Intelligence & Machine Learning',
  'Full Stack Development',
  'Data Structures & Algorithms',
  'Cybersecurity',
  'UI/UX Design',
]

export const careerGoals = [
  'Become a full-stack AI engineer',
  'Build a strong tech portfolio',
  'Contribute to open-source AI tools',
  'Secure a top-tier internship',
  'To start a Tech Venture',
]
export const funFacts = [
  'Enjoy staying physically active and fit',
  'I\'ve participated in 10+ hackathons',
  'Passionate about building real-world impact projects',
  'Love playing story-driven campaign games',
  'Always exploring new technologies and tools'
]

export const skills = {
  Languages: [
    { name: 'Python', icon: 'FaPython', color: '#3776AB', proficiency: 90 },
    { name: 'Java', icon: 'FaJava', color: '#007396', proficiency: 60 },
    { name: 'JavaScript', icon: 'FaJs', color: '#F7DF1E', proficiency: 80 },

  ],
  Frontend: [
    { name: 'HTML', icon: 'FaHtml5', color: '#E34F26', proficiency: 95 },
    { name: 'CSS', icon: 'FaCss3', color: '#1572B6', proficiency: 95 },
    { name: 'Bootstrap', icon: 'FaBootstrap', color: '#7952B3', proficiency: 90 },
    { name: 'React.js', icon: 'FaReact', color: '#61DAFB', proficiency: 80 },
  ],
  Backend: [
    { name: 'Node.js', icon: 'FaNodeJs', color: '#339933', proficiency: 60 },
    { name: 'Express.js', icon: 'SiExpress', color: '#ffffff', proficiency: 60 },
    { name: 'Flask', icon: 'SiFlask', color: '#C0C0C0', proficiency: 75 },
  ],
  Databases: [
    { name: 'MongoDB', icon: 'SiMongodb', color: '#47A248', proficiency: 80 },
    { name: 'MySQL', icon: 'SiMysql', color: '#4479A1', proficiency: 78 },
    { name: 'Firebase', icon: 'SiFirebase', color: '#FFCA28', proficiency: 75 },
  ],
  'AI/ML': [
    { name: 'NumPy', icon: 'SiNumpy', color: '#4DABCF', proficiency: 85 },
    { name: 'Pandas', icon: 'SiPandas', color: '#E70488', proficiency: 85 },
    { name: 'Matplotlib', icon: 'SiPlotly', color: '#3F8FBF', proficiency: 85 },
    { name: 'Scikit-learn', icon: 'SiScikitlearn', color: '#F7931E', proficiency: 70 },
    { name: 'SpaCy', icon: 'SiSpacy', color: '#09A3D5', proficiency: 70 },
  ],
  'Tools & Platforms': [
    { name: 'Git', icon: 'FaGitAlt', color: '#F05032', proficiency: 98 },
    { name: 'GitHub', icon: 'FaGithub', color: '#ffffff', proficiency: 98 },
    { name: 'VS Code', icon: 'SiVisualstudiocode', color: '#007ACC', proficiency: 95 },
    { name: 'Vercel', icon: 'SiVercel', color: '#ffffff', proficiency: 90 },
    { name: 'Vite', icon: 'SiVite', color: '#646CFF', proficiency: 80 },
    { name: 'Linux', icon: 'SiLinux', color: '#FCC624', proficiency: 65 },
    { name: 'Figma', icon: 'SiFigma', color: '#F24E1E', proficiency: 95 },
  ],
}

export const projects = [
  {
    title: 'Briefly AI',
    description: 'An AI-driven video summarization platform that transforms lengthy videos into concise and meaningful text summaries. Built using NLP techniques and Azure AI services, it enables users to quickly extract key insights and save time on content consumption.',
    tech: ['Django', 'Azure AI Services', 'SpaCy', 'Scikit-learn', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Seelam-Mohith/BrieflyAI',
    live: '#',
    image: null,
  },
  {
    title: 'DevSync',
    description: 'A competitive coding platform that helps friends stay consistent and motivated by tracking their LeetCode and GitHub performance. Features dynamic leaderboards, progress analytics, and secure authentication to foster healthy competition and collaborative growth.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JWT Authentication'],
    github: 'https://github.com/Seelam-Mohith/DevSync',
    live: 'https://devsyncx.netlify.app',
    image: null,
  },
  {
    title: 'QuantShield',
    description: 'An AI-powered cybersecurity platform that detects phishing emails, malicious URLs, smishing attacks, and network intrusions using multiple machine learning models. It provides real-time threat analysis to enhance digital security and cyber awareness.',
    tech: ['React', 'Python', 'Flask', 'LinearSVC', 'Generative AI'],
    github: 'https://github.com/Seelam-Mohith/QuantShield',
    live: 'https://quantshield.vercel.app',
    image: null,
  },
  {
    title: 'ScholarChat AI',
    description: 'An AI-powered academic assistant built with a RAG pipeline that enables students to interact with syllabus documents using natural language. Users can upload PDFs and receive accurate, context-aware answers through both text and voice queries.',
    tech: ['Python', 'Streamlit', 'LangChain', 'Web Speech API', 'Gen AI', 'RAG Pipeline'],
    github: 'https://github.com/Seelam-Mohith/ScholarChat-AI',
    live: '#',
    image: null,
  },
  {
    title: 'Align-AI',
    description: 'A full-stack AI-powered career assistant that helps users analyze resumes, identify skill gaps, and evaluate job readiness. It generates personalized learning roadmaps and recommendations to support career growth and upskilling.',
    tech: ['React', 'Node.js', 'Express.js', 'Python', 'Machine Learning', 'Unsupervised Learning'],
    github: 'https://github.com/Seelam-Mohith/Align-AI',
    live: '#',
    image: null,
  },
  {
    title: 'Pixel-QR',
    description: 'A lightweight Flask-based web application that transforms URLs and text into downloadable QR codes instantly. Designed for simplicity and speed, it provides a seamless way to generate high-quality QR codes through an intuitive interface.',
    tech: ['Python', 'Flask', 'QR Code Generator', 'HTML', 'Render Deployment'],
    github: 'https://github.com/Seelam-Mohith/Pixel-QR',
    live: 'https://pixel-qr.onrender.com/',
    image: null,
  },
  {
    title: 'Voxora',
    description: 'A speech-to-text AI agent that leverages LLMs to convert spoken language into accurate text and enable intelligent conversational interactions. Built with LiveKit and LangChain, it supports real-time voice processing and AI-powered responses.',
    tech: ['Python', 'OpenAI', 'Speech-to-Text (STT)', 'LiveKit', 'LangChain'],
    github: 'https://github.com/Seelam-Mohith/Voxora',
    live: '#',
    image: null,
  },
  {
    title: 'FlickFinder.mov',
    description: 'A movie discovery web application that allows users to search, explore, and learn more about their favorite films through a clean and responsive interface. Powered by the TMDB API, it provides detailed movie information and an engaging browsing experience.',
    tech: ['React', 'TMDB API', 'Appwrite Database', 'JavaScript'],
    github: 'https://github.com/Seelam-Mohith/FlickFinder.mov',
    live: 'https://flickfinder-mov.vercel.app/',
    image: null,
  },
  {
    title: 'Planora',
    description: 'A full-stack MERN project management platform designed to streamline task tracking and team collaboration. Following a Kanban-style SDLC workflow, it enables teams to organize, monitor, and manage projects efficiently from planning to completion.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Axios'],
    github: 'https://github.com/Seelam-Mohith/Planora-ProjectManagementSystem',
    live: '#',
    image: null,
  },
]

export const experiences = [
  {
    role: 'Intern',
    organization: 'Mitt Arv',
    duration: 'May 2026 – June 2026',
    responsibilities: [
      'Gained hands-on experience with Jira, understanding project workflows, task management, sprint planning, and collaborative development practices.',
      'Explored and analyzed key projects across Cybersecurity, Artificial Intelligence, and MERN Stack domains to understand real-world development processes.',
      'Studied React and Redux implementation patterns, focusing on state management, component architecture, and scalable frontend development.',
      'Contributed to assigned tasks related to Movie Recommendation Systems and Project Management Systems, assisting in feature development and technical research.',
    ],
    achievements: [
      'Key Skills: Jira, React.js, Redux, MERN Stack, Artificial Intelligence, Cybersecurity, Agile Development',
    ],
  },
  {
    role: 'General Secretary',
    organization: 'COSC – Technical Club',
    duration: '2026 – Present',
    responsibilities: [
      'Led the organization of Hacktoberfest, managing a team of 15 members and coordinating an event with 1,700+ participants worldwide and 350+ teams. Website: https://cbit-hacktoberfest25.vercel.app/',
      'Organized and delivered Global Open Source Awareness Sessions, encouraging students and developers to contribute to open-source projects and communities.',
      'Contributed to the planning and execution of OpenSys 2026, engaging 1,200+ participants through multiple technical events, workshops, and community activities.',
      'Continuing to drive new initiatives, expand community engagement, and develop impactful opportunities for students and open-source enthusiasts.',
    ],
    achievements: [
      'Key Skills: Leadership, Event Management, Community Building, Open Source Advocacy, Team Coordination, Public Speaking',
    ],
  },
  {
    role: 'Junior Developer',
    organization: 'COSC – Technical Club',
    duration: '2025 – 2026',
    responsibilities: [
      'Contributed to the development and maintenance of the HackWeek Website, which supported 900+ participants. Website: https://cosc-hackweek.vercel.app/',
      'Assisted in organizing and conducting Git & GitHub workshops, helping students learn version control and collaborative development practices.',
      'Contributed to the planning and execution of Google Summer of Code (GSoC) Awareness Sessions, promoting open-source participation among students.',
      'Supported the organization and technical activities of OpenSys\'25, contributing to event coordination and community engagement initiatives.',
    ],
    achievements: [
      'Key Skills: Git, GitHub, Web Development, Event Management, Open Source, Team Collaboration, Technical Mentoring',
    ],
  },
]

export const hackathons = [
  {
    name: 'VNRVJIT Krithathon 3.0 Hackathon',
    project: 'AI-Powered Traffic Optimization System',
    position: '1st Place - Winner 🏆',
    tech: ['YOLOv8', 'OpenCV', 'Flutter', 'Firebase', 'OSM', 'OSRM'],
    icon: 'trophy',
    details: [
      'Built an AI-powered traffic optimization system to reduce urban congestion using real-time vehicle detection.',
      'Leveraged YOLOv8 and OpenCV for vehicle detection and tracking from live CCTV feeds.',
      'Integrated OSM and OSRM for dynamic route optimization and traffic light simulation.',
      'Designed cross-platform mobile interface with Flutter and Firebase for real-time data sync.',
    ],
    certificate: 'https://drive.google.com/file/d/16KNgleS4-BWNru21-u4PnqFkwwl5VKNV/view',
    github: 'https://github.com/Seelam-Mohith/AI-TrafficOptimization',
  },
  {
    name: 'CBIT Hacktoberfest Hackathon',
    project: 'Briefly AI – Video Summarization Platform',
    position: '2nd Place - Runner Up',
    tech: ['Django', 'Azure AI', 'Scikit-learn', 'SpaCy', 'NLP', 'Rapid Prototyping'],
    icon: 'medal',
    details: [
      'Secured 2nd Place by developing Briefly AI, an intelligent video summarization platform.',
      'The solution converts lengthy video content into concise and meaningful text summaries.',
      'Built the solution within a 24-hour hackathon environment using AI-powered text processing and summarization techniques.',
      'Collaborated with team members to design, develop, and present a functional prototype under tight deadlines.',
    ],
    certificate: 'https://cbitosc.github.io/verify24/hfestM/?id=mohithHTF24M0010',
    github: 'https://github.com/Seelam-Mohith/BrieflyAI',
  },
]

export const certifications = [
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    org: 'Oracle',
    date: 'Oct 2025',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=12581DC2DABD0233557B21839C526735B8E11D82B37006D64D7F16C9F1FAEA49',
    credentialId: '12581DC2DABD0233557B21839C526735B8E11D82B37006D64D7F16C9F1FAEA49',
    logo: 'oracle',
  },
  {
    name: 'Artificial Intelligence Fundamentals',
    org: 'IBM',
    date: 'Jul 2025',
    link: 'https://www.credly.com/badges/5199f89f-111a-4203-b803-74ee4cb072bc/linked_in_profile',
    credentialId: '5199f89f-111a-4203-b803-74ee4cb072bc',
    logo: 'ibm',
  },
  {
    name: 'Practical Cyber Security for Cyber Security Practitioners',
    org: 'NPTEL',
    date: 'Dec 2024',
    link: 'https://drive.google.com/file/d/1aUs9UijMD0DtOWyLT67nw9IpeM37PN1g/view',
    credentialId: 'NPTEL24CS85S350202325',
    logo: 'nptel',
  },
  {
    name: 'Oracle Cloud Infrastructure 2024 Generative AI',
    org: 'Oracle',
    date: 'Aug 2024',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=92818E0757A1329C54EED498058FE2FD040B35B28CB7725BF4775B81D5C23C24',
    credentialId: '100761627OCI2024GAIOCP',
    logo: 'oracle',
  },
]
