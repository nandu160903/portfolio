import {
  Brain,
  Code2,
  Cloud,
  Database,
  Cpu,
  Wrench,
  Layers,
  ServerCog,
  Mail,
  Award,
  GraduationCap,
  BookOpen,
  Rocket,
  Sparkles,
  Eye,
  FileText,
  Bot,
  Server,
  Search,
  Palette,
  Briefcase,
  Globe
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import neuralImg from "@/assets/project-neural.jpg";
import dataImg from "@/assets/project-data.jpg";


export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/nandu160903", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nandan-s-92b60a285/", icon: FaLinkedin },
  { label: "Email", href: "mailto:nandannagarathna16@gmail.com", icon: Mail },
];

export const STATS = [
  { label: "Projects shipped", value: 20, suffix: "+" },
  { label: "Models trained", value: 5, suffix: "+" },
];

export const ROLES = [
  "AI Engineer",
  "Generative AI Engineer",
  "Full-Stack Developer",
  "Machine Learning Engineer",
  "Backend Developer",
];

export const SKILL_CATEGORIES = [
  {
    key: "ai",
    label: "AI / ML",
    icon: Brain,
    color: "var(--accent-2)",
    items: [
      { name: "TensorFlow", level: 80 },
      { name: "Transformers / LLMs", level: 90 },
      { name: "Computer Vision", level: 87 },
      { name: "NLP & OCR", level: 85 },
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    icon: Code2,
    color: "var(--accent)",
    items: [
      { name: "HTML", level: 88 },
      { name: "React", level: 78 },
      { name: "TypeScript", level: 70 },
      { name: "Tailwind CSS", level: 72 },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    icon: ServerCog,
    color: "var(--accent-4)",
    items: [
      { name: "Python", level: 91 },
      { name: "FastAPI", level: 83 },
      { name: "Flask", level: 84 },
      { name: "Django", level: 80 },
    ],
  },
  {
    key: "db",
    label: "Databases",
    icon: Database,
    color: "var(--accent-3)",
    items: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 85 },
      { name: "SQLite", level: 92 },
    ],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    icon: Cloud,
    color: "var(--accent-5)",
    items: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 82 },
      { name: "CI/CD", level: 86 },
      { name: "GCP", level: 80 },
    ],
  },
  {
    key: "lang",
    label: "Languages",
    icon: Cpu,
    color: "var(--accent-2)",
    items: [
      { name: "Python", level: 95 },
      { name: "C", level: 82 },
      { name: "Java", level: 80 },
      { name: "HTML", level: 82 },
    ],
  },
  {
    key: "tools",
    label: "Tools",
    icon: Wrench,
    color: "var(--accent)",
    items: [
      { name: "Git / GitHub", level: 90 },
      { name: "Linux", level: 92 },
      { name: "Figma", level: 87 },
      { name: "Vercel", level: 80 },
    ],
  },
  {
    key: "frameworks",
    label: "Frameworks",
    icon: Layers,
    color: "var(--accent-4)",
    items: [
      { name: "Hugging Face", level: 90 },
      { name: "Streamlit and Chainlit", level: 88 },
      { name: "Ollama", level: 84 },
      { name: "Google ADK", level: 80 },
    ],
  },
];

export const TECH_STACK = [
  "Python", "TypeScript", "React", "TensorFlow",
  "FastAPI", "Node.js", "PostgreSQL", "SQLite", "Docker", "Git / GitHub",
  "AWS", "GCP", "Hugging Face", "Tailwind", "C", "Linux", "Java"
];

export const EXPERIENCE = [
  {
    role: "Consultant (Data Science)",
    company: "High Peak Software Ltd, Bangalore",
    period: "May 2025 — Present",
    color: "var(--accent)",
    bullets: [
      "Developed a Finance AI Agent using the Google A2A SDK, Gemini 2.5 Pro, and Chainlit, integrated with the Intuit backend to automate financial workflows and deployed on a client server.",
      "Engineered an AI-powered Smart Audit System with OpenAI LLM integration to automate audit workflows, improve data accuracy, and accelerate audit processing through intelligent document analysis.",
      "Built an Intelligent Heuristics Web Scraper using Python, Playwright, and HTTP GET/POST requests to automate data discovery and extraction from dynamic websites, enabling efficient large-scale data collection and processing."
    ],
  },
  {
    role: "Designer & Content Creator",
    company: "Vidyavahini First Grade College, Tumkur",
    period: "March 2024 — September 2024",
    color: "var(--accent-2)",
    bullets: [
      "Designed engaging static and motion posters for college admission campaigns, enhancing promotional outreach across digital and print platforms.",
      "Created visually appealing event backdrops and branding materials for college fests, seminars, and institutional events.",
      "Designed responsive webpage wireframes and UI prototypes using Figma for college placement training initiatives, focusing on modern UI/UX principles and user-centric design."
    ]
  },
];

export const EDUCATION = [
  {
    school: "MCA, Master Of Computer Applications",
    place: "Computer Applications",
    period: "2024 — 2026",
    detail: "Coursework: C, Java, HTML, CSS, Python, DBMS,AI/ML, Deep Learning, Computer Vision.",
  },
];

export const CERTIFICATIONS = [
  { title: "Python Programming (Basics)", issuer: "HackerRank ", year: "Oct 2024" },
  { title: "Problem Solving (Basics)", issuer: "HackerRank", year: "Oct 2024" },
  { title: "Python Prog. (Intermediate)", issuer: "HackerRank", year: "Oct 2024" },
  { title: "Problem Solving (Intermediate)", issuer: "HackerRank", year: "Oct 2024" },
];

export const ACHIEVEMENTS = [
  { title: "Enigma- 24Hrs Hackethon", detail: "Got placed in top 10 teams, built an Online Tutoring Website  with on spot requiremnts" },
  { title: "Agentic AI meets data", detail: "Got placed in top 10 individuals to set an mcp with firebolt" },
  { title: "Google Cloud AI Labs", detail: "Explored MCP, AI agent architectures, agentic workflows, and built a library management system using the Gemini CLI." },
];

export const PROJECTS = [
  {
    title: "Morph Detect",
    tag: "Deep Learning & Computer Vision",
    image: neuralImg,
    description:
      "An AI-powered facial image forensics system that detects GAN-generated and morphed face images using a lightweight CNN, enabling reliable image authenticity verification through deep learning.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Scikit-learn"],
    features: ["GAN & Morph Image Detection", "Custom CNN Model Training", "Image Preprocessing Pipeline", "Binary Image Classification", "Performance Evaluation"],
    github: "https://github.com/",
    icon: Brain,
  },
  {
    title: "AI Chatbot",
    tag: "Generative AI & Agentic Systems",
    image: dataImg,
    description:
      "Developed an intelligent chat assistant using Ollama, and Chainlit, integrated with Endpoint APIs to automate workflows, analyze the prompt & data given, and deliver real-time conversational insights.",
    tech: ["Python", "Ollama", "Chainlit", "FastAPI", "PostgreSQL"],
    features: ["LLM", "Natural Language Processing", "Real-time AI Chat Interface", "Secure Chainlit Authentication"],
    github: "https://github.com/nandu160903/chatbot",
    demo: "",
    icon: Database,
  }
];

export const PUBLICATIONS = [
  {
    title: "Efficient Sparse Attention for Long-Context Language Models",
    venue: "arXiv preprint",
    year: "2024",
    href: "#",
  },
  {
    title: "Layout-Aware OCR: A Practical Survey",
    venue: "IEEE Student Workshop",
    year: "2023",
    href: "#",
  },
];

export const OSS = [
  { title: "llm-eval", detail: "Lightweight evaluation harness for LLM outputs. 420★", href: "#" },
  { title: "tanstack-recipes", detail: "Community patterns for TanStack Start. 260★", href: "#" },
  { title: "cv-augment", detail: "Fast image augmentation for PyTorch pipelines. 180★", href: "#" },
];

export const SERVICES = [
  {
    title: "AI & Generative AI",
    icon: Brain,
    detail: "Building AI agents, LLM-powered applications, RAG systems, intelligent chatbots, document processing solutions, and workflow automation.",
    color: "var(--accent)",
  },
  {
    title: "Full-Stack Development",
    icon: Globe,
    detail: "Crafting AI-enabled full-stack applications with React, Express, FastAPI, Spring Boot, LLM integrations, and scalable backend architectures.",
    color: "var(--accent)",
  },
  {
    title: "Backend Engineering",
    icon: Server,
    detail: "Scalable backend services, REST APIs, microservices, secure authentication, and high-performance server-side applications.",
    color: "var(--accent)",
  },
  {
    title: "Machine Learning",
    icon: Cpu,
    detail: "Designing machine learning and computer vision solutions for image analysis, predictive modeling, deep learning, and intelligent automation.",
    color: "var(--accent)",
  },
];

export const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    role: "CTO, Vector Labs",
    quote:
      "Nandan turned a fuzzy AI idea into a shipping product in weeks. Rare combination of research depth and shipping velocity.",
  },
  {
    name: "Priya Iyer",
    role: "Product Lead, Nova AI",
    quote:
      "The polish and performance of his frontends is on par with the best design-led teams I've worked with.",
  },
  {
    name: "Daniel Ross",
    role: "Founder, EdgeStack",
    quote:
      "Deep, pragmatic, and painfully productive. He owned our entire ML pipeline end-to-end.",
  },
];

export const ICONS = { Award, GraduationCap, BookOpen, Rocket, Sparkles };
