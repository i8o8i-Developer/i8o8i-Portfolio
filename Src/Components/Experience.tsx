import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useInView } from "@/Hooks/UseInView";
import { ChevronDown, Calendar, Briefcase } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/UI/Collapsible";

interface Experience {
  title: string;
  company: string;
  date: string;
  bullets: string[];
  highlights?: string[];
}

const experiences: Experience[] = [
  {
    title: "Python Developer Intern",
    company: "Banao Technologies (ATGWorld Networks Pvt Ltd)",
    date: "December 2025 - Present",
    highlights: ["Remote", "Python", "Git"],
    bullets: [
      "Working On Python-Based Features, Bug Fixes, And Task-Based Deliverables With Daily Code Submissions To GitHub",
      "Participating In Code Reviews, Internal Training, And Performance Assessments",
      "Gaining Experience In Software Debugging, Version Control, And Remote Team Collaboration",
      "Adhering To Secure Development Practices And Professional Compliance Standards",
    ],
  },
  {
    title: "AI Systems Developer",
    company: "ENIGMA Project",
    date: "June 2024 - Present",
    highlights: ["7 Modules", "Multi-Model", "Memory System"],
    bullets: [
      "Designed A Personal AI Assistant With 7 Specialized Modules (Knowledge, Mathematics, Programming, Reasoning, Personality, Action, Search) Using Cerebras AI, Groq LLM, And Google Gemini",
      "Implemented Function Calling With Automatic Detection, Memory Integration, And Confidence Scoring For Optimal Response Generation",
      "Built A Memory System With Vector Storage, Context Windows, And Auto-Promotion To Long-Term Storage",
      "Developed Security Filtering With Multi-Layer Threat Detection And Encoding Attack Prevention",
      "Created Multi-Turn Clarification Flows, Code Extraction, Voice Interaction, And User Profile Learning",
    ],
  },
  {
    title: "Software Developer",
    company: "SYNRIX Version Control",
    date: "October 2025 - Present",
    highlights: ["70% Space Savings", "Quantum-Safe", "C#/.NET"],
    bullets: [
      "Developing A Version Control Tool With Quantum-Resistant Cryptography, Intuitive Commands, And Safe-By-Default Operations Using C# & .NET 8.0",
      "Implemented SHA-256 Hashing With GZIP Compression Achieving 70% Space Savings While Maintaining Performance And Security",
      "Built Operation History Logging With Undo/Redo Commands And A One-Command Recovery System",
      "Created File Tracking, Custom Diff Algorithm, Branch Management, And Commit History Tools",
    ],
  },
  {
    title: "Security Engineer",
    company: "Cybersecurity Projects",
    date: "2022 - Present",
    highlights: ["End-to-end", "Encryption", "Post-Quantum"],
    bullets: [
      "Built QuantumChat - A P2P Messaging Platform With End-To-End Encryption, Perfect Forward Secrecy, Metadata Protection, And Post-Quantum Cryptographic Algorithms",
      "Developed DST Torrent - A Decentralized File Sharing System With AES-256-GCM And RSA-4096 Encryption, Blockchain Verification, And P2P Architecture",
      "Implemented I8o8iCoin - A Complete Blockchain From Scratch With Custom Proof-Of-Work Consensus, Transaction Validation, Digital Wallet Management, And SHA-256 Hashing",
      "Created Secure Communication Systems With TLS/SRTP Encryption, Zero-Knowledge Authentication, And Ephemeral Messaging",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "Web Development Projects",
    date: "2023 - Present",
    highlights: ["React + FastAPI", "Three.js 3D", "CMS Admin"],
    bullets: [
      "Built A Portfolio Site With Three.js 3D Visualizations, Framer Motion Animations, JWT-Based Admin Panel, FastAPI Backend, And MongoDB",
      "Developed A Hospital Management System With Django, Google Calendar Integration, Email Notifications, And Role-Based Access Control",
      "Created A Django And Python Educational Platform With 28 Chapters And 500+ Code Examples Covering Full-Stack Development",
      "Built A Telegram Bot For GitHub Monitoring With Webhook Integration, Commit Tracking, And Pull Request Updates",
    ],
  },
];

const Experience = () => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (index < experiences.length - 1) {
          timelineRefs.current[index + 1]?.querySelector("button")?.focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (index > 0) {
          timelineRefs.current[index - 1]?.querySelector("button")?.focus();
        }
        break;
      case "Home":
        e.preventDefault();
        timelineRefs.current[0]?.querySelector("button")?.focus();
        break;
      case "End":
        e.preventDefault();
        timelineRefs.current[experiences.length - 1]?.querySelector("button")?.focus();
        break;
    }
  };

  return (
    <section 
      id="experience" 
      className="py-12 sm:py-16 md:py-20 2xl:py-24 relative"
      aria-label="Work Experience"
    >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20">
          <div
            ref={ref}
            className={`max-w-5xl mx-auto transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Section Title */}
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 2xl:mb-16">
                  <h2 className="text-lg sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
                    <span className="section-number text-sm sm:text-base">02.</span>
                    <span className="hidden xs:inline">Where I've Worked</span>
                    <span className="xs:hidden">Experience</span>
                  </h2>
                <div className="flex-1 h-[2px] bg-primary max-w-[80px] sm:max-w-xs" />
              </div>
            </ScrollReveal>

            {/* Interactive Timeline */}
            <div 
              className="relative"
              role="list"
              aria-label="Career Timeline"
            >
              {/* Timeline Line */}
              <div className="absolute left-2 sm:left-4 md:left-8 top-0 bottom-0 w-[2px] bg-primary" />

              {experiences.map((exp, index) => (
                <ScrollReveal key={exp.company} direction="left" delay={index * 100}>
                  <div
                    ref={(el) => (timelineRefs.current[index] = el)}
                    className="relative pl-8 sm:pl-12 md:pl-20"
                    role="listitem"
                  >
                    {/* Timeline Node */}
                    <div 
                      className={`absolute left-0 sm:left-2 md:left-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-300 ${
                        expandedItems.has(index)
                          ? "bg-primary border-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                          : "bg-background border-primary/50 hover:border-primary"
                      }`}
                      style={{ top: "0.5rem" }}
                    />

                    {/* Content Card */}
                    <Collapsible
                      open={expandedItems.has(index)}
                      onOpenChange={() => toggleItem(index)}
                      className="mb-4 sm:mb-6 md:mb-8 2xl:mb-12"
                    >
                      <CollapsibleTrigger asChild>
                        <button
                          className={`w-full text-left p-3 sm:p-5 md:p-6 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background group border-2 bg-card ${
                            expandedItems.has(index)
                              ? "border-primary"
                              : "border-border hover:border-primary"
                          }`}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          aria-expanded={expandedItems.has(index)}
                          aria-controls={`experience-content-${index}`}
                        >
                          <div className="flex flex-col gap-2 md:gap-4">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm sm:text-lg md:text-xl 2xl:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors flex flex-wrap items-center gap-1 sm:gap-2">
                                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-primary hidden sm:block flex-shrink-0" />
                                  <span className="truncate">{exp.title}</span>
                                  <span className="text-primary text-xs sm:text-base">@ {exp.company}</span>
                                </h3>
                                <p className="font-mono text-[10px] sm:text-xs md:text-sm 2xl:text-base text-muted-foreground mt-1 flex items-center gap-1 sm:gap-2">
                                  <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                  <span className="truncate">{exp.date}</span>
                                </p>
                              </div>

                              {/* Expand Icon */}
                              <ChevronDown
                                className={`w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                                  expandedItems.has(index) ? "rotate-180" : ""
                                }`}
                              />
                            </div>

                            {/* Highlights Badges */}
                            {exp.highlights && (
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {exp.highlights.map((highlight) => (
                                  <span
                                    key={highlight}
                                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs 2xl:text-sm font-mono bg-primary/10 text-primary rounded border-2 border-primary font-bold"
                                  >
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </button>
                      </CollapsibleTrigger>

                      <CollapsibleContent 
                        id={`experience-content-${index}`}
                        className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
                      >
                        <div className="pt-3 sm:pt-4 pl-1 sm:pl-2">
                          <ul className="space-y-2 sm:space-y-3 2xl:space-y-4" role="list">
                            {exp.bullets.map((bullet, bulletIndex) => (
                              <li
                                key={bulletIndex}
                                className="flex gap-2 sm:gap-3 text-muted-foreground text-xs sm:text-sm md:text-base 2xl:text-lg leading-relaxed group"
                                style={{
                                  animationDelay: `${bulletIndex * 50}ms`,
                                }}
                              >
                                <span 
                                  className="text-primary mt-0.5 sm:mt-1 group-hover:drop-shadow-[0_0_5px_hsl(var(--primary))] transition-all flex-shrink-0"
                                  aria-hidden="true"
                                >
                                  ▹
                                </span>
                                <span className="group-hover:text-foreground transition-colors">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

export default Experience;