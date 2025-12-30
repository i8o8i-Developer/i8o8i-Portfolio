import { useState, useRef, useEffect, useCallback } from "react";
import { Github, ExternalLink, Folder, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/Hooks/UseInView";
import ScrollReveal from "./ScrollReveal";

import ProjectModal from "./ProjectModal";

type Category = "all" | "ai" | "security" | "blockchain" | "fullstack" | "devops" | "automation";

interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  featured: boolean;
  technologies: string[];
  github?: string;
  demo?: string;
  metrics?: Record<string, string>;
}

const projects: Project[] = [
  {
    id: "agrisense",
    title: "AgriSense Guardian",
    description:
      "India's First Multi-Agent AI System Using Google ADK & A2A Protocol For Agricultural Climate Intelligence. Four Specialized Agents (Orchestrator, Forecast, Verify, Planner) Process 23TB+ Daily Satellite Data, 15+ Weather Models, 6-Layer Soil Profiles In Parallel. Reduced Processing Time By 87% (8.2s → 1.1s) While Serving 12,000+ Farmers Across 15 Indian States. Prevented ₹2.3 Crore In Agricultural Losses Through Real-Time Predictions With 97.3% Accuracy And Blockchain-Backed Data Integrity.",
    category: "ai",
    featured: true,
    technologies: ["Google ADK", "Gemini 2.5 Flash", "FastAPI", "Docker", "Cloud Run", "A2A Protocol", "NASA POWER", "ESA Copernicus"],
    github: "https://github.com/i8o8i-Developer/AGRI-SENSE_GUARDIAN",
    metrics: {
      Users: "12,000+",
      "Losses Prevented": "₹2.3Cr",
      "Response Time": "1.2s",
    },
  },
  {
    id: "enigma",
    title: "ENIGMA AI Assistant",
    description:
      "Sophisticated Personal AI Assistant With Advanced Memory Management (Vector Storage), Multi-Module Architecture (7 Specialized Modules), Enterprise-Grade Function Calling With Automatic Detection, Dynamic AI Parameter Optimization, Enhanced Code Extraction, Multi-Turn Clarification Flows, And AI-Powered Context Awareness With Unlimited Task Detection. Features Production-Grade Error Handling, PromptGuard Security (97.5% Threat Detection), State-Of-The-Art Memory Context Windows, Dynamic Voice Interaction With Pause/Resume, And Auto-Learning User Profiles Through Conversational Intelligence.",
    category: "ai",
    featured: true,
    technologies: ["Python", "Cerebras AI", "Groq LLM", "Google Gemini", "Selenium", "Edge-TTS", "Vector DB", "Redis"],
    github: "https://github.com/i8o8i-Developer/ENIGMA",
    metrics: {
      Modules: "7 AI",
      "Security": "97.5%",
      "Memory": "Advanced",
    },
  },
  {
    id: "synrix",
    title: "SYNRIX Version Control",
    description:
      "Revolutionary Git Alternative With Quantum-Resistant Cryptography, Intuitive Command Names, Safe-By-Default Operations, Automatic Reflog For Everything, Simple Undo/Redo Commands, And 70% Space Savings Through SHA-256 + GZIP Compression. Features Complete Operation History Logging, Zero Fear Of Data Loss, One-Command Recovery System, Enhanced Branch Management, And Clean Commit History Tools. Built With C# & .NET 8.0 For Enterprise-Grade Performance And Security.",
    category: "security",
    featured: true,
    technologies: ["C#", ".NET 8.0", "SHA-256", "GZIP", "Custom Diff Algorithm", "Quantum-Safe Crypto"],
    github: "https://github.com/i8o8i-Developer/SYNRIX",
    metrics: {
      "Space Savings": "70%",
      "Recovery": "100%",
      "Commands": "Simple",
    },
  },
  {
    id: "pranjal-portfolio",
    title: "Pranjal Portfolio",
    description:
      "Stunning Full-Stack Portfolio Showcasing Visual Storytelling With Immersive 3D Visualizations Using Three.js, Seamless Framer Motion Animations, And Comprehensive CMS. Features JWT-Based Admin Panel With Drag-And-Drop Upload, Content Management, Message Center, Dashboard Analytics, RESTful FastAPI Backend With MongoDB Integration, SMTP Email Services, And CORS-Enabled API. Specialized Galleries For Photography, Videography, And Video Editing With Real-Time Performance Insights.",
    category: "fullstack",
    featured: true,
    technologies: ["React 18", "Three.js", "Framer Motion", "FastAPI", "MongoDB", "Vite", "Axios", "JWT"],
    github: "https://github.com/i8o8i-Developer/Pranjal-Portfolio",
    metrics: {
      "3D Graphics": "Three.js",
      "Admin": "Full CMS",
      "Auth": "JWT",
    },
  },
  {
    id: "dst-torrent",
    title: "DST Torrent",
    description:
      "Decentralized File Sharing System With Military-Grade AES-256-GCM And RSA-4096 Encryption, Blockchain Verification For File Integrity, Quantum-Resistant Cryptographic Protocols, P2P Architecture For Distributed Storage, And Secure Key Exchange Mechanisms. Features End-To-End Encryption, Perfect Forward Secrecy, Metadata Protection, And Tamper-Proof Audit Trails For Enterprise-Level Security.",
    category: "blockchain",
    featured: false,
    technologies: ["Python", "Flask", "AES-256-GCM", "RSA-4096", "Blockchain", "P2P", "Cryptography"],
    github: "https://github.com/i8o8i-Developer/DST-Torrent",
  },
  {
    id: "hospital-mgmt",
    title: "Hospital Management System",
    description:
      "Full-Featured Healthcare Platform With Google Calendar Integration For Appointment Scheduling, Automated Email Notifications For Patients And Staff, Role-Based Access Control For Security, Patient Management Dashboard, Doctor Scheduling System, Medical Records Management, And Prescription Tracking. Built With Django 4.2.7, PostgreSQL Database, Node.js Services, And Serverless Architecture For Scalability.",
    category: "fullstack",
    featured: false,
    technologies: ["Django 4.2.7", "PostgreSQL", "Node.js", "Serverless", "Google Calendar API", "SMTP"],
    github: "https://github.com/i8o8i-Developer/Hospital-Management",
  },
  {
    id: "quantumchat",
    title: "QuantumChat",
    description:
      "Quantum-Resistant P2P Messaging Platform With Military-Grade End-To-End Encryption, Perfect Forward Secrecy For Message History Protection, Metadata Protection Against Surveillance, Decentralized Architecture For Privacy, Post-Quantum Cryptographic Algorithms, Secure Key Exchange, And Ephemeral Messaging. Features WebSocket-Based Real-Time Communication, Zero-Knowledge Authentication, And Tamper-Proof Message Integrity.",
    category: "security",
    featured: false,
    technologies: ["Python", "Cryptography", "P2P", "WebSockets", "Post-Quantum Crypto", "Zero-Knowledge"],
    github: "https://github.com/i8o8i-Developer/QuantumChat",
  },
  {
    id: "i8o8icoin",
    title: "I8o8iCoin Blockchain",
    description:
      "Complete Blockchain Implementation From Scratch With Custom Proof-Of-Work Consensus Mechanism, Transaction Validation And Mining System, Digital Wallet Management, SHA-256 Cryptographic Hashing, Block Chain Verification, Merkle Tree Implementation, And RESTful API With Flask. Features Double-Spending Prevention, Block Difficulty Adjustment, Transaction Pool Management, And Network Node Communication.",
    category: "blockchain",
    featured: false,
    technologies: ["Python", "Blockchain", "SHA-256", "Flask", "Proof-Of-Work", "Merkle Trees", "Cryptography"],
    github: "https://github.com/i8o8i-Developer/I8o8iCoin",
  },
  {
    id: "gittracker-bot",
    title: "GitTracker Bot",
    description:
      "Intelligent Telegram Bot For Real-Time GitHub Repository Monitoring With Webhook Integration For Instant Notifications, Commit Tracking And Analysis, Pull Request Updates, Issue Tracking, Branch Management Alerts, Code Review Notifications, And Release Announcements. Features Multi-Repository Support, Custom Alert Filtering, Team Collaboration Tools, And Comprehensive Activity Dashboard.",
    category: "automation",
    featured: false,
    technologies: ["Python", "Telegram Bot API", "GitHub Webhooks", "GitHub API", "Async IO", "SQLite"],
    github: "https://github.com/i8o8i-Developer/GitTracker-Bot",
  },
  {
    id: "telegram-identity-bot",
    title: "Telegram Identity Bot",
    description:
      "Lightweight Telegram Bot For Fetching IDs, Chat Info, User Info, And Admin Management. Features Include User/Chat ID Retrieval, Topic ID Detection In Threaded Groups, Member Count Statistics, Admin List Generation, Chat Snapshot Export As JSON, Detailed User Profiles, Bot Latency Testing, And Media File ID Extraction. Built With FastAPI + Python-Telegram-Bot V21, Deployable To Coolify With Webhook Mode, Health Endpoints, Docker Support, And Production-Ready Uvicorn/Gunicorn Integration.",
    category: "automation",
    featured: false,
    technologies: ["Python", "FastAPI", "python-telegram-bot v21", "Uvicorn", "Docker", "Coolify", "Webhooks"],
    github: "https://github.com/i8o8i-Developer/Telegram-Identity-Bot",
    demo: "https://t.me/TeleIdentity_Bot",
  },
  {
    id: "django-python-courses",
    title: "Django & Python Programming Courses",
    description:
      "Comprehensive Educational Repository With 2000+ Lines Of Django Tutorial Content Across 28 Detailed Chapters Plus Complete Python Programming Course. Covers Django Models, Views, Templates, Forms, Authentication, REST APIs, Database Design, ORM, Testing, Deployment, Python Fundamentals, OOP, Data Structures, Algorithms, File I/O, Exception Handling, And Best Practices. Features 500+ Code Examples, Interactive Exercises, And Real-World Project Implementations For Complete Full-Stack Learning.",
    category: "fullstack",
    featured: false,
    technologies: ["Django", "Python", "PostgreSQL", "REST APIs", "OOP", "Data Structures", "Algorithms"],
    github: "https://github.com/i8o8i-Developer/Learning",
  },
  {
    id: "safe-windows-repair",
    title: "Safe Windows Repair",
    description:
      "Professional Windows System Repair Toolkit With PowerShell Scripts For Comprehensive System Maintenance. Features Service Management (Windows Update, BITS, DoSvc), Automatic Timestamped Backups, System Cleanup (SoftwareDistribution Cache, Temp Folders), DISM RestoreHealth, SFC Scannow, Network Stack Reset (Winsock, TCP/IP, DNS Flush), Detailed Logging, And Administrator Privilege Checks. Includes FIX_UPDATE.BAT For Aggressive Update Reset And Cleanup Utility For Backup Management.",
    category: "devops",
    featured: false,
    technologies: ["PowerShell", "Batch", "Windows API", "DISM", "SFC", "Network Admin", "System Services"],
    github: "https://github.com/i8o8i-Developer/Safe-Windows-Repair",
  },
  {
    id: "wakatime-stats",
    title: "I8o8i WakaTime Stats",
    description:
      "Customizable GitHub Action For Displaying Real-Time WakaTime Coding Statistics In Profile README. Tracks Programming Languages, Code Time, Operating Systems, Editors, Projects, Timezone, Daily/Weekly Activity Patterns, And Lines Of Code Written. Features Multi-Language Support, Customizable Progress Bars, Profile Views Counter, Commit Metrics, Repository Language Distribution, And Automated Updates Via Cron. Built With Python For Seamless Integration With GitHub Workflows.",
    category: "automation",
    featured: false,
    technologies: ["Python", "GitHub Actions", "WakaTime API", "GitHub API", "YAML", "Markdown", "Automation"],
    github: "https://github.com/i8o8i-Developer/i8o8i-WakaTime-Stats",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "AI/ML", value: "ai" },
  { label: "Security", value: "security" },
  { label: "Blockchain", value: "blockchain" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "DevOps", value: "devops" },
  { label: "Automation", value: "automation" },
];

const Projects = () => {
  const [filter, setFilter] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const goToSlide = useCallback((index: number) => {
    const newIndex = Math.max(0, Math.min(index, featuredProjects.length - 1));
    setMobileIndex(newIndex);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * newIndex,
        behavior: 'smooth'
      });
    }
  }, [featuredProjects.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(mobileIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(mobileIndex + 1);
    }
  }, [goToSlide, mobileIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const slideWidth = carousel.offsetWidth;
      const newIndex = Math.round(carousel.scrollLeft / slideWidth);
      setMobileIndex(newIndex);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 2xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Section Title */}
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 2xl:mb-12 max-w-5xl mx-auto">
                <h2 className="text-lg sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
                  <span className="section-number text-sm sm:text-base">03.</span>
                  <span className="hidden xs:inline">Some Things I Have Built</span>
                  <span className="xs:hidden">Projects</span>
                </h2>
                <div className="flex-1 h-[2px] bg-primary max-w-[80px] sm:max-w-xs" />
              </div>
            </ScrollReveal>

            {/* Filter Buttons */}
            <ScrollReveal direction="up" delay={100}>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 2xl:mb-16">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`px-3 sm:px-5 py-1.5 sm:py-2 font-mono text-xs sm:text-sm 2xl:text-base rounded-lg transition-all duration-300 border-2 font-bold ${
                      filter === f.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border hover:text-primary hover:border-primary"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Featured Projects - Mobile Carousel */}
            {featuredProjects.length > 0 && (
              <>
                {/* Mobile Carousel */}
                <div className="md:hidden mb-12">
                  <div 
                    ref={carouselRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="region"
                    aria-label="Featured projects carousel"
                  >
                    {featuredProjects.map((project, index) => (
                      <div 
                        key={project.id}
                        className="flex-shrink-0 w-full snap-center"
                        style={{
                          transform: `translateY(${(index - mobileIndex) * 5}px)`,
                          transition: 'transform 0.3s ease-out',
                        }}
                      >
                        <MobileProjectCard
                          project={project}
                          onViewDetails={() => openProjectModal(project)}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Carousel Navigation */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      onClick={() => goToSlide(mobileIndex - 1)}
                      disabled={mobileIndex === 0}
                      className="p-2 rounded-full border border-primary/50 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors"
                      aria-label="Previous project"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex gap-2">
                      {featuredProjects.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === mobileIndex 
                              ? 'bg-primary w-6 shadow-[0_0_10px_hsl(var(--primary)/0.5)]' 
                              : 'bg-primary/30 hover:bg-primary/50'
                          }`}
                          aria-label={`Go to project ${index + 1}`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={() => goToSlide(mobileIndex + 1)}
                      disabled={mobileIndex === featuredProjects.length - 1}
                      className="p-2 rounded-full border border-primary/50 text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors"
                      aria-label="Next project"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block space-y-12 mb-12 sm:mb-16 md:mb-24 2xl:mb-28">
                  {featuredProjects.map((project, index) => (
                    <ScrollReveal key={project.id} direction={index % 2 === 0 ? "left" : "right"} delay={index * 100}>
                      <FeaturedProjectCard
                        project={project}
                        onViewDetails={() => openProjectModal(project)}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </>
            )}

            {/* Other Projects Grid */}
            {otherProjects.length > 0 && (
              <>
                <ScrollReveal direction="up">
                  <h3 className="text-base sm:text-lg md:text-xl 2xl:text-2xl font-semibold text-foreground text-center mb-6 sm:mb-8 2xl:mb-10">
                    Other Noteworthy Projects
                  </h3>
                </ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 2xl:gap-6">
                  {otherProjects.map((project, index) => (
                    <ScrollReveal key={project.id} direction="up" delay={index * 100}>
                      <ProjectCard
                        project={project}
                        onViewDetails={() => openProjectModal(project)}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={closeProjectModal} 
        />
    </section>
  );
};

const FeaturedProjectCard = ({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={cardRef}
      className="group cursor-pointer"
      onClick={onViewDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative p-6 sm:p-8 rounded-xl border-2 border-border bg-card transition-all duration-300"
        style={{
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: isHovered 
            ? "0 20px 40px -10px hsl(var(--primary) / 0.3)" 
            : "none",
          borderColor: isHovered ? "hsl(var(--primary))" : undefined,
        }}
      >
        {/* Featured Badge */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <span className="font-mono text-primary text-xs sm:text-sm px-3 py-1 rounded-full border-2 border-primary bg-primary/10 font-bold flex-shrink-0">
            Featured Project
          </span>
          <div className="flex gap-2 flex-shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg"
                aria-label="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm sm:text-base 2xl:text-lg leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className="flex flex-wrap gap-6 sm:gap-8 mb-6 pb-6 border-b-2 border-border">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="text-primary font-bold text-xl sm:text-2xl 2xl:text-3xl">{value}</p>
                <p className="text-muted-foreground text-xs sm:text-sm 2xl:text-base">{key}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1.5 font-mono text-xs 2xl:text-sm bg-secondary text-muted-foreground rounded-lg border-2 border-border hover:border-primary hover:text-primary transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Details Indicator */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-primary text-sm font-mono">
            <span>View Details</span>
            <Eye size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileProjectCard = ({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: () => void;
}) => {
  return (
    <div 
      className="rounded-lg overflow-hidden cursor-pointer p-5 border-2 border-border bg-card hover:border-primary transition-colors"
      onClick={onViewDetails}
    >
      {/* Featured Badge */}
      <span className="inline-block font-mono text-primary text-xs px-2 py-0.5 rounded-full border-2 border-primary bg-primary/10 mb-3 font-bold">
        Featured Project
      </span>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
      
      {/* Description */}
      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-4">
        {project.description}
      </p>
      
      {/* Metrics */}
      {project.metrics && (
        <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b-2 border-border">
          {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-primary font-bold text-base">{value}</p>
              <p className="text-muted-foreground text-[10px]">{key}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="px-2 py-0.5 text-[10px] font-mono bg-secondary text-muted-foreground rounded border border-border">
            {tech}
          </span>
        ))}
      </div>
      
      {/* Actions */}
      <div className="flex gap-3">
        <button
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="View Details"
        >
          <Eye size={16} />
        </button>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const offset = (centerY - windowCenter) * 0.03;
      setParallaxY(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      className="cyber-card p-4 sm:p-6 rounded-lg hover-lift transition-all duration-300 flex flex-col h-full group cursor-pointer"
      onClick={onViewDetails}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translateY(${parallaxY}px) ${isHovered ? "translateY(-8px) scale(1.02)" : ""}`,
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
        boxShadow: isHovered ? "0 20px 40px -10px hsl(var(--primary) / 0.2)" : undefined,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <Folder className="text-primary group-hover:drop-shadow-[0_0_10px_hsl(var(--primary))] transition-all w-8 h-8 sm:w-10 sm:h-10" />
        <div className="flex gap-2 sm:gap-3">
          <button
            className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary))] transition-all"
            aria-label="View Details"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            <Eye size={16} className="sm:w-5 sm:h-5" />
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary))] transition-all"
              aria-label="GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} className="sm:w-5 sm:h-5" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary))] transition-all"
              aria-label="Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} className="sm:w-5 sm:h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1 mb-3 sm:mb-4">
        {project.description}
      </p>

      {/* Tech Stack */}
      <ul className="flex flex-wrap gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs text-muted-foreground">
        {project.technologies.slice(0, 4).map((tech) => (
          <li key={tech} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-secondary/50 rounded hover:bg-primary/20 hover:text-primary transition-colors">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;