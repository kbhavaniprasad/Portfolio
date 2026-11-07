/**
 * PORTFOLIO DATA - SINGLE SOURCE OF TRUTH
 * All personal, educational, experience, skill, project, certification,
 * and questionnaire data for Bhavani Prasad Kola.
 */

export const portfolio = {
  // Personal Info
  name: "Bhavani Prasad Kola",
  shortName: "Bhavani Prasad",
  initials: "BK",
  role: "Full Stack Developer & AI/ML Engineer",
  roles: [
    "MERN Stack Engineer"
  ],
  bio: "Computer Science & Engineering graduate (8.37 CGPA) specializing in MERN full-stack development and applied AI/ML engineering. Proven track record building high-performance React interfaces, scalable Node.js/Express REST APIs, real-time computer vision pipelines, and co-inventing a patented precision drone AI system.",
  location: "Vijayawada, Andhra Pradesh, India",
  email: "kolabhavaniprasad@gmail.com",
  phone: "+91 8309304558",
  photo: "/profile.jpg",
  resumePath: "/resume.pdf",

  // Social & Professional Links
  links: {
    github: "https://github.com/bhavani-prasad",
    linkedin: "https://www.linkedin.com/in/kola-bhavani-prasad-b5298a296/",
    email: "mailto:kolabhavaniprasad@gmail.com",
    portfolio: "https://portfolio-frontend-rzmx.onrender.com",
    resume: "/resume.pdf"
  },

  // Key Highlights / Metrics
  stats: [
    { label: "Vision Corpus", value: "50K+", detail: "Pest Dataset Images" },
    { label: "Internships", value: "3", detail: "MERN, AI/ML & Salesforce" },
    { label: "Patents & Papers", value: "2", detail: "1 Patent + 1 ICICT Proceeding" },
    { label: "Hackathon Win", value: "1st", detail: "National 48-Hour AI Contest" }
  ],

  // Education
  education: [
    {
      institution: "Lakireddy Bali Reddy College of Engineering",
      degree: "B.Tech, Computer Science and Engineering",
      score: "CGPA: 8.37 / 10 (79.52%)",
      duration: "2022 – 2026",
      location: "Mylavaram, Andhra Pradesh",
      badge: "Degree Program",
      highlights: "Core curriculum in Data Structures, Algorithms, Database Systems, Web Architectures, and Applied AI.",
      bullets: [
        "Achieved an 8.37 CGPA (79.52%) with coursework in Data Structures, Algorithms, Database Systems, Web Architectures, and Applied AI.",
        "Engineered full-stack capstone applications and edge computer vision prototypes as core engineering coursework."
      ]
    }
  ],

  // Internships / Professional Experience
  internships: [
    {
      id: "biztron",
      company: "Biztron Softech Ltd.",
      role: "MERN Stack Intern",
      duration: "Jun 2024 – Jul 2024",
      location: "Vijayawada, Andhra Pradesh",
      badge: "Full-Stack Engineering",
      bullets: [
        "Built modular, reusable React.js components to accelerate UI delivery across production web views.",
        "Integrated Node.js and Express RESTful APIs, facilitating reliable asynchronous data synchronization.",
        "Optimized MongoDB query operations and schema validation to maintain data consistency."
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JavaScript"]
    },
    {
      id: "smartbridge-ai",
      company: "SmartBridge (APSCHE)",
      role: "AI & ML Virtual Intern",
      duration: "Dec 2024 – May 2025",
      location: "Remote",
      badge: "Machine Learning",
      bullets: [
        "Engineered end-to-end ML pipelines spanning data ingestion, cleaning, feature scaling, and model evaluation.",
        "Trained supervised and unsupervised models (regression, classification, clustering, PCA) using Scikit-Learn.",
        "Optimized model accuracy through cross-validation and hyperparameter tuning, deploying containerized inference workflows."
      ],
      techStack: ["Python", "Scikit-Learn", "Machine Learning", "Data Pipelines", "Model Deployment"]
    },
    {
      id: "smartbridge-salesforce",
      company: "SmartBridge",
      role: "Salesforce Developer Intern",
      duration: "May 2025 – Jul 2025",
      location: "Remote",
      badge: "Cloud Engineering",
      bullets: [
        "Developed customized Lightning Web Components (LWC) and Apex controllers for enterprise customer workflows.",
        "Automated multi-step business logic by authoring custom Apex triggers and event-driven Salesforce Flows.",
        "Configured relational data schemas, security profiles, and role hierarchies to enforce enterprise access controls."
      ],
      techStack: ["Salesforce", "LWC", "Apex", "Flow Automation", "Cloud Architecture"]
    }
  ],

  // Categorized Skills (Frontend, Backend, Database, Tools)
  skills: {
    Frontend: [
      { name: "React.js", pct: 92, iconKey: "react", level: "Hooks, Router, State & Vitest" },
      { name: "JavaScript (ES6+)", pct: 94, iconKey: "javascript", level: "Async/Await, Closures, DOM" },
      { name: "HTML5 & CSS3", pct: 90, iconKey: "html5", level: "Semantic Markup & Responsive UI" },
      { name: "Tailwind CSS", pct: 88, iconKey: "tailwind", level: "Utility-First Styling & Theming" }
    ],
    Backend: [
      { name: "Node.js", pct: 88, iconKey: "nodejs", level: "Event-Driven Asynchronous Runtime" },
      { name: "Express.js", pct: 86, iconKey: "express", level: "RESTful Routing & Middleware" },
      { name: "REST APIs", pct: 90, iconKey: "api", level: "Architecture, Auth & Rate-Limiting" },
      { name: "Java", pct: 84, iconKey: "java", level: "Object-Oriented Programming & DSA" }
    ],
    Database: [
      { name: "MongoDB", pct: 88, iconKey: "mongodb", level: "Mongoose ODM & Aggregation Pipelines" },
      { name: "SQL", pct: 82, iconKey: "sql", level: "Relational Modeling, Joins & Queries" }
    ],
    Tools: [
      { name: "Python", pct: 90, iconKey: "python", level: "AI/ML, OpenCV & Scientific Scripting" },
      { name: "TensorFlow & Keras", pct: 85, iconKey: "tensorflow", level: "Deep Neural Networks & Inference" },
      { name: "OpenCV & MediaPipe", pct: 86, iconKey: "opencv", level: "Computer Vision & Landmark Tracking" },
      { name: "Git & GitHub", pct: 92, iconKey: "git", level: "Version Control & Collaborative PRs" },
      { name: "Data Structures & Algorithms", pct: 88, iconKey: "dsa", level: "Algorithmic Efficiency & Complexities" }
    ]
  },

  // Projects
  projects: [
    {
      id: "sign-language",
      title: "Real-Time Sign Language Recognition Using Deep Learning",
      tagline: "Computer Vision & Gesture Speech Synthesis",
      duration: "2025 – 2026",
      badge: "Computer Vision & AI",
      featured: true,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      techStack: [
        "Python",
        "TensorFlow",
        "Keras",
        "MediaPipe",
        "MobileNetV2",
        "CBAM",
        "OpenCV"
      ],
      description:
        "An end-to-end accessible vision system translating real-time hand gestures into instant text and vocalized speech.",
      bullets: [
        "Architected an OpenCV and MediaPipe vision pipeline tracking 21 3D hand landmarks in real time with high frame rates.",
        "Trained a deep neural network pairing MobileNetV2 with CBAM attention in TensorFlow/Keras for robust gesture classification.",
        "Implemented instantaneous gesture-to-text conversion and vocalized speech synthesis to deliver fluid accessibility communication."
      ],
      github: "https://github.com/bhavani-prasad",
      live: "https://portfolio-frontend-rzmx.onrender.com"
    },
    {
      id: "api-key-manager",
      title: "API Key Management System",
      tagline: "MERN Stack Credential Vault & RBAC",
      duration: "2026",
      badge: "Full-Stack Security",
      featured: true,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "REST APIs"
      ],
      description:
        "A secure full-stack enterprise credential vault providing cryptographic secret storage, granular RBAC, and audit tracking.",
      bullets: [
        "Built an administrative dashboard in React.js and Node.js/Express for end-to-end API key lifecycle management.",
        "Enforced Role-Based Access Control (RBAC), bcrypt cryptographic key hashing, and stateless JWT token authentication.",
        "Engineered real-time audit logging in MongoDB to track key generation, usage metrics, rotation, and revocation events."
      ],
      github: "https://github.com/bhavani-prasad",
      live: "https://portfolio-frontend-rzmx.onrender.com"
    },
    {
      id: "ai-voice-agent",
      title: "English AI Voice Call Agent",
      tagline: "Conversational Telephony & LLM Integration",
      duration: "2026",
      badge: "Voice AI & Telephony",
      featured: true,
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200&auto=format&fit=crop",
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "REST APIs",
        "GPT-4.1 Mini",
        "Retell AI"
      ],
      description:
        "An intelligent voice agent control platform pairing real-time telephony streaming with GPT-4.1 Mini reasoning for natural dialogue.",
      bullets: [
        "Designed a reactive management console in React.js to configure AI voice agents, initiate calls, and monitor live audio sessions.",
        "Integrated Retell AI telephony and bidirectional audio streaming with GPT-4.1 Mini for low-latency contextual conversations.",
        "Built robust Express/Node.js REST services to store conversation logs, latency analytics, and structured call histories."
      ],
      github: "https://github.com/bhavani-prasad",
      live: "https://portfolio-frontend-rzmx.onrender.com"
    },
    {
      id: "smart-drone-agri",
      title: "AI-Powered Smart Drone for Precision Agriculture",
      tagline: "Aerial Pest Detection & Precision Spraying Patent",
      duration: "2025",
      badge: "AgriTech & Patent",
      featured: true,
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1200&auto=format&fit=crop",
      techStack: [
        "Python",
        "Computer Vision",
        "MobileNetV2",
        "Embedded Systems",
        "IoT"
      ],
      description:
        "An autonomous aerial drone system trained on 50,000+ agricultural images to detect crop pests and apply micro-targeted pesticide spray.",
      bullets: [
        "Co-invented an autonomous aerial pest detection system utilizing edge computer vision and deep learning models.",
        "Trained edge detection algorithms on a curated dataset of 50,000+ insect images to identify crop infestations in real time.",
        "Designed targeted micro-spraying actuation logic to treat localized crop zones, substantially reducing pesticide wastage."
      ],
      github: "https://github.com/bhavani-prasad",
      live: "https://portfolio-frontend-rzmx.onrender.com"
    }
  ],

  // Honors & Awards
  honors: [
    {
      id: "hackathon-1st",
      title: "National-Level 48-Hour AI Hackathon",
      organization: "VR Siddhartha College of Engineering",
      role: "1st Prize Winner — National AI Hackathon",
      duration: "2025",
      badge: "1st Prize Winner",
      description: "Awarded 1st Prize among collegiate teams in an intensive 48-hour continuous national engineering hackathon.",
      bullets: [
        "Achieved 1st Prize competing against engineering teams nationwide in a 48-hour competitive innovation hackathon.",
        "Built and demonstrated a fully functional edge-AI drone prototype featuring real-time insect detection and micro-spraying.",
        "Pitched technical architecture, latency benchmarks, and commercial viability to an expert industry judging panel."
      ],
      techStack: ["Edge AI", "Computer Vision", "Drone Robotics", "Rapid Prototyping"]
    },
    {
      id: "icict-paper",
      title: "Research Paper Presentation at ICICT Conference",
      organization: "ICICT International Conference",
      role: "Research Paper Author & Presenter",
      duration: "2025",
      badge: "Published Research",
      description: "Peer-reviewed research paper accepted, presented, and published in the official proceedings of the ICICT Conference.",
      bullets: [
        "Authored and presented original research on deep learning-driven hand landmark tracking and gesture recognition.",
        "Published paper within the peer-reviewed conference proceedings, documenting landmark extraction and inference benchmarks.",
        "Validated model generalization across diverse lighting conditions and complex background variations."
      ],
      techStack: ["Deep Learning", "MediaPipe", "Computer Vision", "Research Methodology"]
    }
  ],

  // Patents
  patents: [
    {
      id: "drone-patent",
      title: "AI-Based Precision Pesticide-Spraying System",
      organization: "Indian Patent Office (Published / Registered)",
      role: "Co-Inventor — Precision Agricultural Drone System",
      duration: "2025",
      badge: "Published Patent",
      description: "Published patent for an AI-guided precision pesticide-spraying system engineered to prevent chemical over-spraying.",
      bullets: [
        "Co-invented an intelligent precision spraying system integrating aerial robotics with real-time pest classification.",
        "Formally filed and published the invention with the Patent Office as a novel agricultural automation methodology.",
        "Coupled high-speed edge inferencing on 50,000+ pest images with valve actuation to restrict spraying to infested zones."
      ],
      techStack: ["Autonomous Drones", "Deep Learning", "Edge Vision", "Precision Agriculture"]
    }
  ],

  // Certifications
  certifications: [
    {
      id: "cert-aws",
      title: "AWS Certified Cloud Practitioner (AWS-CCP)",
      issuer: "Amazon Web Services (AWS)",
      organization: "Amazon Web Services (AWS)",
      role: "Certified Cloud Practitioner",
      duration: "2025",
      code: "AWS-CCP",
      badge: "Cloud Computing",
      description: "Industry certification verifying expertise across core cloud infrastructure, security models, and architectural best practices.",
      bullets: [
        "Mastered AWS core services including EC2, S3, RDS, VPC networking, and IAM role security.",
        "Demonstrated proficiency in cloud architecture principles, shared responsibility security, and cost optimization."
      ],
      techStack: ["AWS Cloud", "IAM", "EC2", "S3", "Cloud Architecture"]
    },
    {
      id: "cert-salesforce",
      title: "Salesforce Developer Certification",
      issuer: "SmartBridge",
      organization: "SmartBridge",
      role: "Certified Salesforce Developer",
      duration: "2025",
      code: "Salesforce Dev",
      badge: "Enterprise Cloud",
      description: "Accredited certification in programmatic cloud development with Apex classes, triggers, and Lightning Web Components (LWC).",
      bullets: [
        "Developed custom backend logic using object-oriented Apex triggers, asynchronous batch jobs, and SOQL queries.",
        "Constructed modular Lightning Web Components (LWC) and automated business processes via Salesforce Flow."
      ],
      techStack: ["Salesforce", "Apex", "LWC", "SOQL", "Cloud Automation"]
    },
    {
      id: "cert-servicenow",
      title: "ServiceNow Certified System Administrator (CSA)",
      issuer: "ServiceNow",
      organization: "ServiceNow",
      role: "Certified System Administrator",
      duration: "2025",
      code: "ServiceNow CSA",
      badge: "ITSM Platform",
      description: "Professional certification validating system configuration, ITSM workflows, and enterprise platform governance.",
      bullets: [
        "Configured platform tables, UI policies, business rules, and Access Control Lists (ACLs) for role-based governance.",
        "Designed automated service catalog item workflows, incident management lifecycles, and SLA notification pipelines."
      ],
      techStack: ["ServiceNow", "ITSM", "CMDB", "ACL Security", "Workflow Automation"]
    },
    {
      id: "cert-dsa",
      title: "Smart Coder Certification",
      issuer: "Smart Interviews",
      organization: "Smart Interviews",
      role: "Smart Coder — Advanced DSA",
      duration: "2024",
      code: "DSA Problem Solving",
      badge: "Algorithms & DSA",
      description: "Advanced algorithmic problem-solving credential covering dynamic programming, graphs, trees, and complexity analysis.",
      bullets: [
        "Solved 300+ advanced algorithmic challenges spanning dynamic programming, graphs, trees, and backtracking.",
        "Optimized runtime and memory complexities to achieve production-grade, high-performance algorithm implementations."
      ],
      techStack: ["Data Structures", "Algorithms", "Dynamic Programming", "Graph Theory", "Java"]
    }
  ],

  // Backwards compatibility alias for achievements
  get achievements() {
    return [
      ...this.honors,
      ...this.patents
    ];
  },

  // Questionnaire / FAQs (Section 7)
  questionnaire: [
    {
      id: "q1",
      question: "What engineering roles and opportunities are you currently seeking?",
      answer: "I am actively seeking full-time roles as a Full Stack Developer, MERN Stack Engineer, or AI/ML Software Engineer. I am also open to high-impact technical collaborations, innovative engineering fellowships, and freelance projects where I can build production-ready systems."
    },
    {
      id: "q2",
      question: "What are your primary technical proficiencies and tech stacks?",
      answer: "My core expertise lies in the MERN stack (MongoDB, Express.js, React.js, Node.js), modern JavaScript/ES6+, and RESTful API architecture with JWT and RBAC security. On the AI/ML side, I specialize in Python, OpenCV, MediaPipe, TensorFlow, Keras, and edge-device computer vision models such as MobileNetV2."
    },
    {
      id: "q3",
      question: "Could you share more details about your patent and research publication?",
      answer: "I co-invented an AI-based precision pesticide-spraying system that detects insect infestations using edge computer vision trained on 50,000+ agricultural images to direct targeted micro-spraying and minimize chemical waste. This invention won 1st Prize at the National 48-Hour AI Hackathon. In addition, our research paper was accepted, presented, and published in the official proceedings of the ICICT International Conference."
    },
    {
      id: "q4",
      question: "What practical industry experience do your three internships cover?",
      answer: "1. Biztron Softech Ltd. (MERN Stack Intern): Developed reusable React components and connected RESTful APIs with Node.js/Express.\n2. SmartBridge / APSCHE (AI & ML Virtual Intern): Spearheaded end-to-end machine learning workflows including data preparation, model training, hyperparameter tuning, and deployment.\n3. SmartBridge (Salesforce Developer Intern): Created Lightning Web Components (LWC), Apex backend services, and automated enterprise flows."
    },
    {
      id: "q5",
      question: "What certifications and academic credentials do you hold?",
      answer: "I hold a B.Tech in Computer Science and Engineering from Lakireddy Bali Reddy College of Engineering with an 8.37/10 CGPA (79.52%). My verified credentials include AWS Certified Cloud Practitioner (AWS), Salesforce Developer Certification, ServiceNow Certified System Administrator (CSA), and Smart Coder Certification in advanced DSA and problem solving."
    },
    {
      id: "q6",
      question: "How can recruiters or engineering teams get in touch or schedule an interview?",
      answer: "You can submit a message through the 'Contact Us' form right above, email me directly at kolabhavaniprasad@gmail.com, or reach me by phone at +91 8309304558. You can also connect with me on LinkedIn (linkedin.com/in/kola-bhavani-prasad) and explore my code on GitHub (github.com/bhavani-prasad). I typically respond within 24 hours."
    }
  ]
};
