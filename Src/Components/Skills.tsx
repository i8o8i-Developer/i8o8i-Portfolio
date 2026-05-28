import { useInView } from "@/Hooks/UseInView";
import { 
  Wrench, 
  Brain, 
  Shield, 
  Link, 
  Cloud, 
  Database,
  Users,
  Target
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import TerminalShowcase from "./TerminalShowcase";

interface SkillCategory {
  name: string;
  icon: LucideIcon;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "Python/ML Libraries", level: 85 },
      { name: "LLM Integration", level: 80 },
      { name: "Multi-Agent Systems", level: 75 },
      { name: "Vector Embeddings", level: 75 },
      { name: "LangChain", level: 70 },
      { name: "Prompt Engineering", level: 80 },
    ],
  },
  {
    name: "Backend Development",
    icon: Wrench,
    skills: [
      { name: "Python", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "Django", level: 80 },
      { name: "Flask", level: 80 },
      { name: "Node.js", level: 65 },
      { name: "C#/.NET", level: 70 },
    ],
  },
  {
    name: "Frontend & 3D",
    icon: Wrench,
    skills: [
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Three.js", level: 75 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Framer Motion", level: 70 },
      { name: "Vite", level: 80 },
    ],
  },
  {
    name: "Security & Cryptography",
    icon: Shield,
    skills: [
      { name: "AES/RSA Encryption", level: 80 },
      { name: "Post-Quantum Crypto", level: 70 },
      { name: "SHA Hashing", level: 85 },
      { name: "TLS/SSL", level: 75 },
      { name: "Zero-Knowledge Auth", level: 65 },
      { name: "Secure Coding", level: 80 },
    ],
  },
  {
    name: "Blockchain & Web3",
    icon: Link,
    skills: [
      { name: "Custom Blockchain", level: 75 },
      { name: "Proof-Of-Work", level: 75 },
      { name: "P2P Protocols", level: 75 },
      { name: "Merkle Trees", level: 75 },
      { name: "Smart Contracts", level: 60 },
      { name: "Cryptographic Hashing", level: 80 },
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: Cloud,
    skills: [
      { name: "Docker", level: 80 },
      { name: "Cloud Services", level: 75 },
      { name: "Serverless", level: 70 },
      { name: "Redis", level: 75 },
      { name: "CI/CD", level: 70 },
      { name: "Linux Administration", level: 75 },
    ],
  },
  {
    name: "Databases & APIs",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQLite", level: 85 },
      { name: "RESTful APIs", level: 90 },
      { name: "API Design", level: 85 },
    ],
  },
  {
    name: "Tools & Platforms",
    icon: Target,
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 90 },
      { name: "Postman", level: 85 },
      { name: "Linux/Ubuntu", level: 80 },
      { name: "Nginx", level: 70 },
      { name: "Vercel", level: 75 },
    ],
  },
];

const Skills = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 2xl:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20 relative z-10">
          <div
            ref={ref}
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Section Title */}
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 2xl:mb-16 max-w-5xl mx-auto">
                  <h2 className="text-lg sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
                    <span className="section-number text-sm sm:text-base">04.</span>
                    Skills
                  </h2>
                <div className="flex-1 h-[2px] bg-primary max-w-[80px] sm:max-w-xs" />
              </div>
            </ScrollReveal>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8 max-w-7xl mx-auto">
              {skillCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <ScrollReveal 
                    key={category.name} 
                    direction="up" 
                    delay={categoryIndex * 100}
                  >
                    <div
                      className="p-4 sm:p-6 2xl:p-8 rounded-lg h-full border-2 border-border bg-card hover:border-primary transition-colors group"
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 2xl:mb-8">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))] transition-all" />
                        </div>
                        <h3 className="text-sm sm:text-lg 2xl:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                      </div>

                      {/* Skills List */}
                      <div className="space-y-3 sm:space-y-4 2xl:space-y-5">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skill.name} className="group/skill">
                            <div className="flex justify-between text-xs sm:text-sm 2xl:text-base mb-1 sm:mb-1.5">
                              <span className="text-muted-foreground font-mono group-hover/skill:text-foreground transition-colors truncate mr-2">
                                {skill.name}
                              </span>
                              <span className="text-primary font-mono text-[10px] sm:text-xs flex-shrink-0">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-1 sm:h-1.5 bg-muted/50 rounded-full overflow-hidden relative">
                              <div
                                className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-1000 ease-out relative"
                                style={{
                                  width: isInView ? `${skill.level}%` : "0%",
                                  transitionDelay: `${
                                    categoryIndex * 100 + skillIndex * 100
                                  }ms`,
                                }}
                              >
                                {/* Glow effect */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary rounded-full blur-sm" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Terminal Showcase */}
            <ScrollReveal direction="up" delay={200}>
              <div className="mt-16 2xl:mt-20">
                <TerminalShowcase />
              </div>
            </ScrollReveal>
          </div>
        </div>
    </section>
  );
};

export default Skills;