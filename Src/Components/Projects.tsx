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
    id: "enigma",
    title: "ENIGMA AI Assistant",
    description:
      "A Personal AI Assistant With 7 Specialized Modules (Knowledge, Mathematics, Programming, Reasoning, Personality, Action, Search) Using Cerebras AI, Groq LLM, And Google Gemini. Features Vector Storage Memory, Multi-Turn Conversation Flows, Code Extraction, Voice Interaction, And Security Filtering.",
    category: "ai",
    featured: true,
    technologies: ["Python", "Cerebras AI", "Groq LLM", "Google Gemini", "Selenium", "Edge-TTS", "Vector DB", "Redis"],
    github: "https://github.com/i8o8i-Developer/ENIGMA",
  },
  {
    id: "synrix",
    title: "SYNRIX Version Control",
    description:
      "A Version Control Tool With Quantum-Resistant Cryptography, Intuitive Commands, Safe-By-Default Operations, And Automatic Operation Logging. Features SHA-256 Hashing With GZIP Compression, Undo/Redo Commands, Custom Diff Algorithm, And A One-Command Recovery System. Built With C# & .NET 8.0.",
    category: "security",
    featured: true,
    technologies: ["C#", ".NET 8.0", "SHA-256", "GZIP", "Custom Diff Algorithm", "Quantum-Safe Crypto"],
    github: "https://github.com/i8o8i-Developer/SYNRIX",
  },
  {
    id: "pranjal-portfolio",
    title: "Pranjal Portfolio",
    description:
      "A Full-Stack Portfolio Site With Three.js 3D Visualizations, Framer Motion Animations, And A CMS Admin Panel. Features JWT Authentication, Drag-And-Drop Upload, Content Management, FastAPI Backend With MongoDB, And Specialized Galleries For Photography And Videography.",
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
      "A Decentralized File Sharing System With AES-256-GCM And RSA-4096 Encryption, Blockchain Verification For File Integrity, And P2P Architecture. Features End-To-End Encryption, Perfect Forward Secrecy, Metadata Protection, And Tamper-Proof Audit Trails.",
    category: "blockchain",
    featured: false,
    technologies: ["Python", "Flask", "AES-256-GCM", "RSA-4096", "Blockchain", "P2P", "Cryptography"],
    github: "https://github.com/i8o8i-Developer/DST-Torrent",
  },
  {
    id: "hospital-mgmt",
    title: "Hospital Management System",
    description:
      "A Healthcare Management Platform With Google Calendar Integration For Appointment Scheduling, Automated Email Notifications, Role-Based Access Control, Patient Management Dashboard, Medical Records, And Prescription Tracking. Built With Django And PostgreSQL.",
    category: "fullstack",
    featured: false,
    technologies: ["Django 4.2.7", "PostgreSQL", "Node.js", "Serverless", "Google Calendar API", "SMTP"],
    github: "https://github.com/i8o8i-Developer/Hospital-Management",
  },
  {
    id: "quantumchat",
    title: "QuantumChat",
    description:
      "A P2P Messaging Platform With End-To-End Encryption, Perfect Forward Secrecy, Metadata Protection, And Post-Quantum Cryptographic Algorithms. Features WebSocket-Based Real-Time Communication, Zero-Knowledge Authentication, And Decentralized Architecture.",
    category: "security",
    featured: false,
    technologies: ["Python", "Cryptography", "P2P", "WebSockets", "Post-Quantum Crypto", "Zero-Knowledge"],
    github: "https://github.com/i8o8i-Developer/QuantumChat",
  },
  {
    id: "i8o8icoin",
    title: "I8o8iCoin Blockchain",
    description:
      "A Complete Blockchain Implementation From Scratch With Custom Proof-Of-Work Consensus, Transaction Validation, Digital Wallet Management, And SHA-256 Hashing. Features Merkle Tree Implementation, RESTful API With Flask, Double-Spending Prevention, And Difficulty Adjustment.",
    category: "blockchain",
    featured: false,
    technologies: ["Python", "Blockchain", "SHA-256", "Flask", "Proof-Of-Work", "Merkle Trees", "Cryptography"],
    github: "https://github.com/i8o8i-Developer/I8o8iCoin",
  },
  {
    id: "gittracker-bot",
    title: "GitTracker Bot",
    description:
      "A Telegram Bot For Real-Time GitHub Repository Monitoring With Webhook Integration, Commit Tracking, Pull Request Updates, Issue Tracking, And Branch Management Alerts. Supports Multiple Repositories, Custom Filtering, And Team Collaboration.",
    category: "automation",
    featured: false,
    technologies: ["Python", "Telegram Bot API", "GitHub Webhooks", "GitHub API", "Async IO", "SQLite"],
    github: "https://github.com/i8o8i-Developer/GitTracker-Bot",
  },
  {
    id: "telegram-identity-bot",
    title: "Telegram Identity Bot",
    description:
      "A Lightweight Telegram Bot For Fetching User And Chat Info, Admin Management, Member Statistics, And Chat Snapshots. Built With FastAPI And Python-Telegram-Bot, Deployable With Docker And Webhook Mode.",
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
      "An Educational Repository With Django Tutorial Content Across 28 Chapters Covering Models, Views, Templates, Authentication, REST APIs, And Deployment, Plus A Python Programming Course With Fundamentals, OOP, Data Structures, And Algorithms.",
    category: "fullstack",
    featured: false,
    technologies: ["Django", "Python", "PostgreSQL", "REST APIs", "OOP", "Data Structures", "Algorithms"],
    github: "https://github.com/i8o8i-Developer/Learning",
  },
  {
    id: "safe-windows-repair",
    title: "Safe Windows Repair",
    description:
      "A Windows System Repair Toolkit With PowerShell Scripts For System Maintenance, Including Service Management, Automatic Backups, System Cleanup, DISM Restore Operations, SFC Scans, Network Stack Reset, And Detailed Logging.",
    category: "devops",
    featured: false,
    technologies: ["PowerShell", "Batch", "Windows API", "DISM", "SFC", "Network Admin", "System Services"],
    github: "https://github.com/i8o8i-Developer/Safe-Windows-Repair",
  },
  {
    id: "wakatime-stats",
    title: "I8o8i WakaTime Stats",
    description:
      "A Customizable GitHub Action That Displays WakaTime Coding Statistics In A Profile README. Tracks Programming Languages, Coding Time, Operating Systems, Editors, And Activity Patterns With Automated Updates Via Cron.",
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
                    <span className="hidden xs:inline">Some Things I've Built</span>
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
                    More projects
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