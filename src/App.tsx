/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { 
  Terminal, 
  Database, 
  Cloud, 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  Code2,
  Users,
  BarChart3,
  ArrowRight
} from "lucide-react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = ["about", "experience", "education", "projects", "skills"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      let currentSection = null;
      
      // Find which section is currently centered
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // We only highlight if the center of the screen is within the section
          // AND we are not in a "transition zone" (e.g. within 150px of a boundary)
          // This ensures the highlight clears when between sections as requested
          const buffer = 150; 
          if (scrollPosition >= offsetTop + buffer && scrollPosition < offsetTop + offsetHeight - buffer) {
            currentSection = id;
            break;
          }
        }
      }

      // Special handling for top and bottom
      if (window.scrollY < 100) {
        setActiveSection("about");
      } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setActiveSection(null);
      } else {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-on-surface/5">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tighter text-on-surface">Shashwat Tiwari</span>
          <span className="font-label text-[9px] uppercase tracking-[0.3em] text-primary font-bold mt-1">portfolio</span>
        </div>
        <div className="hidden md:flex gap-12 items-center font-medium text-sm tracking-tight">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`}
              className={`relative py-2 transition-all duration-300 ${
                activeSection === link.id 
                  ? "text-primary font-bold" 
                  : "text-on-surface opacity-70 hover:opacity-100 hover:text-primary"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>
        <a 
          href="https://www.linkedin.com/in/shashwat-tiwari118/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-md font-label text-sm font-bold tracking-wide scale-95 active:scale-90 transition-transform inline-block"
        >
          Resume
        </a>
      </div>
    </nav>
  );
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const currentText = texts[index];
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setSpeed(50);
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, speed]);

  return (
    <span className="text-primary">
      {displayText}
      <span className="border-r-2 border-primary ml-1 animate-pulse"></span>
    </span>
  );
};

const Hero = () => (
  <section className="relative px-8 py-20 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center bg-bleeding-primary" id="about">
    <div className="absolute -top-20 -left-20 opacity-5 pointer-events-none">
      <h1 className="text-[25rem] font-black tracking-tighter select-none">ST</h1>
    </div>
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="relative z-10 max-w-6xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start md:items-center gap-12 md:gap-20">
        <motion.div variants={itemVariants} className="min-w-0">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-on-surface mb-4 md:whitespace-nowrap">
            I'm a <Typewriter texts={["data analyst.", "software developer.", "designer."]} />
          </h1>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface-variant tracking-tight">Architecting Intelligence.</h2>
            <p className="text-lg md:text-xl font-medium text-primary/80">MS CS @ Northeastern University</p>
          </div>
          <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed max-w-2xl">
            I bridge the gap between complex data ecosystems and high-impact digital experiences. Currently specializing in Computer Science with a focus on scalable systems and editorial precision.
          </p>
          <div className="mt-12 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="font-label text-xs uppercase tracking-widest text-outline">Location</span>
              <span className="font-bold text-on-surface">Boston, MA</span>
            </div>
            <div className="w-px h-10 bg-outline-variant/30"></div>
            <div className="flex flex-col">
              <span className="font-label text-xs uppercase tracking-widest text-outline">Status</span>
              <span className="font-bold text-on-surface">Available for full time roles from Summer 2026</span>
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="flex justify-center md:justify-end relative mt-12 md:mt-24">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl"></div>
            <img 
              src="/profile.png" 
              alt="Shashwat Tiwari" 
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl border-4 border-white relative z-10 bg-surface-low"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback if image is not found
                e.currentTarget.src = "https://picsum.photos/seed/shashwat/1000/1000";
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const Experience = () => (
  <section className="py-32 bg-surface-low relative overflow-hidden" id="experience">
    <div className="max-w-7xl mx-auto px-8 relative z-10">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="flex justify-between items-end mb-20"
      >
        <div>
          <h2 className="text-5xl font-black tracking-tighter mb-4">Experience</h2>
          <div className="h-1.5 w-24 bg-primary"></div>
        </div>
        <span className="font-mono text-sm opacity-40 hidden md:block">0x02 // PROFESSIONAL_LOG</span>
      </motion.div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Bain & Co */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="group bg-surface-lowest p-12 rounded-lg relative overflow-hidden transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(204,0,0,0.1)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#cc0000]/5 rounded-bl-full transition-all group-hover:scale-150"></div>
          <div className="relative z-10">
            <div className="h-12 mb-8 flex items-center">
              <img 
                src="https://storage.googleapis.com/mle-process-public/media_data/94089903-8d07-449e-8c85-23f208479e9a/input_file_0.png" 
                alt="Bain & Company" 
                className="h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black tracking-tight">Data Analyst Intern</h3>
                <p className="font-label font-bold tracking-wider text-sm mt-1" style={{ color: '#cc0000' }}>BAIN & COMPANY</p>
              </div>
              <span className="font-mono text-xs opacity-50">Jan 2024 — July 2024</span>
            </div>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Designed and deployed end-to-end ML pipelines for M&A deal screening across 20–75 datasets, combining K-Means and hierarchical clustering to segment acquisition targets, reducing manual analyst review time by 40%.
            </p>
            <ul className="text-sm text-on-surface-variant/80 space-y-3 mb-8 list-disc pl-4">
              <li>Built time-series forecasting models (ARIMA + XGBoost ensemble) to predict M&A activity signals, improving prospect prioritization accuracy by 18%.</li>
              <li>Engineered automated SQL + Python (Pandas, SQLAlchemy) ingestion pipelines with schema validation and anomaly-detection hooks.</li>
              <li>Developed NLP classification models (TF-IDF + Logistic Regression, spaCy NER) for automated document tagging and regulatory text anomaly detection.</li>
              <li>Applied data validation and testing frameworks (Pytest, Great Expectations) to ensure pipeline reliability and maintain &gt;95% data accuracy.</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              {["Python", "SQLAlchemy", "XGBoost", "NLP", "Pytest"].map(tag => (
                <span key={tag} className="px-3 py-1 border border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-on-surface hover:text-[#cc0000] transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Aftershoot */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="group bg-surface-lowest p-12 rounded-lg relative overflow-hidden transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(0,99,151,0.1)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#006397]/5 rounded-bl-full transition-all group-hover:scale-150"></div>
          <div className="relative z-10">
            <div className="h-12 mb-8 flex items-center">
               <img 
                src="https://storage.googleapis.com/mle-process-public/media_data/94089903-8d07-449e-8c85-23f208479e9a/input_file_1.png" 
                alt="Aftershoot" 
                className="h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black tracking-tight">Software Engineer Intern</h3>
                <p className="font-label font-bold tracking-wider text-sm mt-1 uppercase" style={{ color: '#006397' }}>Aftershoot Inc.</p>
              </div>
              <span className="font-mono text-xs opacity-50">May 2023 — July 2023</span>
            </div>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Architected high-throughput data ingestion pipelines in Python to ingest and normalize subscription telemetry from the Stripe API, enabling downstream analytics on customer retention.
            </p>
            <ul className="text-sm text-on-surface-variant/80 space-y-3 mb-8 list-disc pl-4">
              <li>Rewrote core ETL modules from Python to Rust, reducing processing time by 3x and peak memory usage by 45% without infrastructure scaling.</li>
              <li>Trained and evaluated CNN-based models for blur detection, sharpness scoring, and duplicate identification for photographer workflows.</li>
              <li>Enhanced image selection features using OpenCV and scikit-image, improving preprocessing accuracy and reducing manual curation effort.</li>
              <li>Automated CI/CD workflows with Docker and GitHub Actions, cutting deployment time by &gt;60% while standardizing builds.</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              {["Rust", "OpenCV", "Docker", "CNN", "Stripe API"].map(tag => (
                <span key={tag} className="px-3 py-1 border border-outline-variant/20 font-label text-[10px] uppercase tracking-widest text-on-surface hover:text-[#006397] transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Education = () => (
  <section className="py-32 bg-background" id="education">
    <div className="max-w-7xl mx-auto px-8">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-4">Education</h2>
            <div className="h-1.5 w-24 bg-secondary"></div>
          </div>
          <span className="font-mono text-sm opacity-40 hidden md:block">0x03 // ACADEMIC_LOG</span>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Northeastern */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-8 items-start p-8 rounded-xl bg-surface-low border border-on-surface/5"
          >
            <img 
              src="https://storage.googleapis.com/mle-process-public/media_data/94089903-8d07-449e-8c85-23f208479e9a/input_file_2.png" 
              alt="Northeastern University" 
              className="w-20 h-20 object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-2xl font-black tracking-tight">Northeastern University</h3>
              <p className="font-bold text-sm uppercase tracking-wider mb-2" style={{ color: '#d41c2c' }}>MS Computer Science</p>
              <p className="text-on-surface-variant text-sm mb-1">GPA: 4.0/4.0</p>
              <p className="font-mono text-xs opacity-50">Sept 2024 — Present</p>
            </div>
          </motion.div>

          {/* Shiv Nadar */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-8 items-start p-8 rounded-xl bg-surface-low border border-on-surface/5"
          >
            <img 
              src="https://storage.googleapis.com/mle-process-public/media_data/94089903-8d07-449e-8c85-23f208479e9a/input_file_3.png" 
              alt="Shiv Nadar University" 
              className="w-20 h-20 object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-2xl font-black tracking-tight">Shiv Nadar University</h3>
              <p className="font-bold text-sm uppercase tracking-wider mb-2" style={{ color: '#1270b7' }}>BS Computer Science</p>
              <p className="text-on-surface-variant text-sm mb-1">GPA: 3.5/4.0</p>
              <p className="font-mono text-xs opacity-50">Aug 2020 — May 2024</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Projects = () => (
  <section className="py-32 bg-surface-low" id="projects">
    <div className="max-w-7xl mx-auto px-8">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Impactful Projects</h2>
            <div className="h-1.5 w-12 bg-primary mt-2"></div>
          </div>
          <p className="hidden md:block font-label text-xs uppercase tracking-widest text-on-surface-variant">Selected Works (2023-2024)</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* RegTranslate */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-7 group relative overflow-hidden bg-surface-lowest rounded-xl transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(26,28,30,0.06)] border border-on-surface/5"
          >
            <div className="p-10 flex flex-col h-full min-h-[450px]">
              <div className="flex-grow">
                <div className="mb-8 flex justify-between items-start">
                  <Code2 className="text-primary w-10 h-10" />
                  <a 
                    className="text-on-surface-variant hover:text-primary transition-colors" 
                    href="https://regtranslate.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>
                <h3 className="text-4xl font-black tracking-tighter text-on-surface mb-4">RegTranslate</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  A RAG-based compliance platform that converts complex regulatory PDFs (HIPAA, GDPR) into actionable developer tasks (Jira tickets) using Llama 3 and LangChain. Features a semantic search pipeline using ChromaDB for high-accuracy context retrieval.
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">Core Technology</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Llama 3", color: "bg-primary" },
                    { name: "LangChain", color: "bg-secondary" },
                    { name: "ChromaDB", color: "bg-tertiary" },
                    { name: "FastAPI", color: "bg-primary" }
                  ].map(tech => (
                    <div key={tech.name} className={`px-3 py-1.5 rounded-md border border-outline-variant/20 flex items-center gap-2 transition-colors`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`}></span>
                      <span className="font-label text-xs text-on-surface-variant">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* MuseBot */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-5 group relative overflow-hidden bg-surface-low rounded-xl transition-all duration-500 hover:bg-surface-lowest hover:shadow-[0_24px_48px_-12px_rgba(26,28,30,0.06)] border border-on-surface/5"
          >
            <div className="p-10 flex flex-col h-full min-h-[450px]">
              <div className="flex-grow">
                <div className="mb-8 flex justify-between items-start">
                  <Users className="text-secondary w-10 h-10" />
                  <a 
                    className="text-on-surface-variant hover:text-secondary transition-colors" 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-on-surface mb-4">MuseBot</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Emotion-aware conversational AI chatbot using fine-tuned BERT-base-uncased on GoEmotions dataset. Integrated with WhatsApp API for personalized music recommendations.
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">Core Technology</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "BERT", color: "bg-secondary" },
                    { name: "PyTorch", color: "bg-primary" },
                    { name: "WhatsApp API", color: "bg-tertiary" }
                  ].map(tech => (
                    <div key={tech.name} className="px-3 py-1.5 rounded-md border border-outline-variant/20 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${tech.color}`}></span>
                      <span className="font-label text-xs text-on-surface-variant">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kambaz */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-6 group relative overflow-hidden bg-surface-low rounded-xl transition-all duration-500 hover:bg-surface-lowest hover:shadow-[0_24px_48px_-12px_rgba(26,28,30,0.06)] border border-on-surface/5"
          >
            <div className="p-10 flex flex-col h-full min-h-[350px]">
              <div className="flex-grow">
                <div className="mb-8 flex justify-between items-start">
                  <Code2 className="text-tertiary w-10 h-10" />
                  <a 
                    className="text-on-surface-variant hover:text-tertiary transition-colors" 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-on-surface mb-4">Kambaz</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  A scalable full-stack learning platform using MERN stack, replicating Canvas-style dashboards with optimized architecture for concurrent user access.
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">Core Technology</p>
                <div className="flex flex-wrap gap-2">
                  {["MongoDB", "Express.js", "React", "Node.js"].map(tech => (
                    <span key={tech} className="px-3 py-1.5 rounded-md border border-outline-variant/20 font-label text-xs text-on-surface-variant">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Publication */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-6 group relative overflow-hidden bg-surface-lowest rounded-xl transition-all duration-500 hover:shadow-[0_24px_48px_-12px_rgba(26,28,30,0.06)] border border-on-surface/5"
          >
            <div className="p-10 flex flex-col h-full min-h-[350px]">
              <div className="flex-grow">
                <div className="mb-8 flex justify-between items-start">
                  <BarChart3 className="text-primary w-10 h-10" />
                  <a 
                    className="text-on-surface-variant hover:text-primary transition-colors" 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>
                <h3 className="text-3xl font-black tracking-tighter text-on-surface mb-4">Publication: Epidemic Dynamics</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Co-authored research on predicting outbreaks using ML, published in the Asian Conference (ACIIDS). Benchmarked transformer models across heterogeneous datasets.
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">Research Stack</p>
                <div className="flex flex-wrap gap-2">
                  {["PyTorch", "BERT", "RoBERTa", "DistilBERT"].map(tech => (
                    <span key={tech} className="px-3 py-1.5 rounded-md border border-outline-variant/20 font-label text-xs text-on-surface-variant">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const TechnicalCore = () => (
  <section className="py-32 bg-background relative bg-bleeding-secondary" id="skills">
    <div className="max-w-7xl mx-auto px-8">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-20"
      >
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <h2 className="text-5xl font-black tracking-tighter mb-8 leading-[0.9]">Technical <br/>Core</h2>
          <p className="text-on-surface-variant leading-relaxed mb-10">
            A curated selection of tools and languages that form my primary engineering stack. Focused on scalability, performance, and data integrity.
          </p>
          <div className="flex gap-6">
            <Terminal className="text-primary w-8 h-8" />
            <Database className="text-secondary w-8 h-8" />
            <Cloud className="text-tertiary w-8 h-8" />
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
          {[
            { label: "LANGUAGE", title: "Python", desc: "Data Science / Backend", color: "border-primary hover:text-primary" },
            { label: "DATABASE", title: "SQL", desc: "PostgreSQL / BigQuery", color: "border-secondary hover:text-secondary" },
            { label: "LANGUAGE", title: "C / C++", desc: "Systems Engineering", color: "border-tertiary hover:text-tertiary" },
            { label: "BACKEND", title: "Node.js", desc: "Express / RESTful APIs", color: "border-primary hover:text-primary" },
            { label: "FRONTEND", title: "React", desc: "TypeScript / Tailwind", color: "border-secondary hover:text-secondary" },
            { label: "DEVOPS", title: "CI / CD", desc: "Docker / GitHub Actions", color: "border-tertiary hover:text-tertiary" },
            { label: "AI / ML", title: "PyTorch", desc: "NLP / Transformers", color: "border-primary hover:text-primary" },
            { label: "CLOUD", title: "AWS", desc: "Lambda / Bedrock / S3", color: "border-secondary hover:text-secondary" },
            { label: "DATABASE", title: "MongoDB", desc: "NoSQL / Atlas", color: "border-tertiary hover:text-tertiary" }
          ].map(skill => (
            <div key={skill.title} className={`group border-l-2 border-outline-variant/20 pl-6 py-2 transition-all ${skill.color}`}>
              <span className="font-mono text-[10px] opacity-40 mb-2 block">{skill.label}</span>
              <h4 className={`font-bold text-xl transition-colors`}>{skill.title}</h4>
              <p className="text-xs font-label uppercase tracking-widest opacity-60 mt-2">{skill.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-32 bg-on-surface text-white" id="cta">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-8 text-center relative overflow-hidden"
    >
      <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-12 relative z-10">Let's build the <br/>future of data.</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
        <a className="bg-primary text-white px-10 py-5 font-bold text-lg rounded-md hover:bg-primary-container transition-all text-center" href="mailto:tiwari.sha@northeastern.edu">Get in Touch</a>
        <a className="border border-white/20 px-10 py-5 font-bold text-lg rounded-md hover:bg-white/10 transition-all text-center" href="https://www.linkedin.com/in/shashwat-tiwari118/">View Project Deck</a>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="w-full border-t border-on-surface/10 bg-surface">
    <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-7xl mx-auto">
      <div className="mb-8 md:mb-0">
        <span className="text-lg font-bold text-on-surface">Shashwat Tiwari</span>
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/40 mt-2">© 2024 Shashwat Tiwari • Built with Editorial Chromodynamics</p>
      </div>
      <div className="flex gap-8 font-label text-xs uppercase tracking-widest">
        <a 
          className="text-on-surface/60 hover:text-primary transition-colors flex items-center gap-1" 
          href="https://www.linkedin.com/in/shashwat-tiwari118/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
        <a 
          className="text-on-surface/60 hover:text-primary transition-colors flex items-center gap-1" 
          href="mailto:tiwari.sha@northeastern.edu"
        >
          <Mail className="w-4 h-4" /> Email
        </a>
        <a 
          className="text-on-surface/60 hover:text-primary transition-colors flex items-center gap-1" 
          href="https://github.com/shashhwatiwari"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-4 h-4" /> GitHub
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary/10">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <TechnicalCore />
      </main>
      <Footer />
    </div>
  );
}