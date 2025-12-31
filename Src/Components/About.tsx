import { useInView } from "@/Hooks/UseInView";
import ScrollReveal from "./ScrollReveal";


const About = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 2xl:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20">
          <div
            ref={ref}
            className={`max-w-6xl mx-auto transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Section Title */}
            <ScrollReveal direction="up" delay={0}>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 2xl:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
                  <span className="section-number text-sm sm:text-base">01.</span>
                  About Me
                </h2>
                <div className="flex-1 h-[2px] bg-primary max-w-[100px] sm:max-w-xs" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-12 2xl:gap-16">
              {/* Text Content */}
              <div className="md:col-span-2 space-y-5 2xl:space-y-6">
                <ScrollReveal direction="up" delay={100}>
                  <p className="text-muted-foreground leading-relaxed text-lg 2xl:text-xl">
                    Hello! I Am <span className="text-primary font-bold">Anubhav Chaurasia</span> (AKA <span className="text-primary">i8o8i Developer</span>), A Multi-Disciplinary Software Engineer Specializing In{" "}
                    <span className="text-primary font-medium">Multi-Agent AI Systems</span>,{" "}
                    <span className="text-primary font-medium">Enterprise Security</span>, And{" "}
                    <span className="text-primary font-medium">Blockchain Technology</span>. My Journey Started With A Fascination For Building Intelligent Systems That Solve Complex Real-World Problems At Scale.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal direction="up" delay={200}>
                  <p className="text-muted-foreground leading-relaxed text-lg 2xl:text-xl">
                    Fast-Forward To Today, I Have Architected{" "}
                    <span className="text-primary font-medium">AgriSense Guardian</span>, India's First Multi-Agent AI System Using Google ADK & A2A Protocol, Serving{" "}
                    <span className="text-primary font-bold">12,000+ Farmers</span> Across 15 States And Preventing{" "}
                    <span className="text-primary font-bold">₹2.3 Crore</span> In Agricultural Losses. My System Processes{" "}
                    <span className="text-primary font-bold">23TB+ Daily</span> From 12+ APIs With{" "}
                    <span className="text-primary font-bold">87% Faster</span> Performance (8.2s → 1.1s).
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={300}>
                  <p className="text-muted-foreground leading-relaxed text-lg 2xl:text-xl">
                    I Have Built <span className="text-primary font-medium">ENIGMA</span>, A Sophisticated AI Assistant With 7 Specialized Modules, Advanced Memory Management, And{" "}
                    <span className="text-primary font-bold">97.5% Security</span> Through PromptGuard. I Also Developed{" "}
                    <span className="text-primary font-medium">SYNRIX</span>, A Revolutionary Git Alternative With Quantum-Resistant Cryptography And{" "}
                    <span className="text-primary font-bold">70% Space Savings</span>, Plus Multiple Blockchain Projects With Military-Grade Encryption.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={400}>
                  <p className="text-muted-foreground leading-relaxed text-lg 2xl:text-xl">
                    My Expertise Spans <span className="text-primary font-medium">Full-Stack Development</span> With React, Three.js, FastAPI, And Django; <span className="text-primary font-medium">Cybersecurity</span> With Post-Quantum Cryptography, AES-256-GCM, RSA-4096; And <span className="text-primary font-medium">Cloud Architecture</span> With Docker, Serverless, And Redis.
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="right" delay={300}>
                <div className="relative group">
                  <div className="relative z-10">
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-border bg-card">
                      <img 
                        src="/Images/My-Image.png" 
                        alt="Anubhav Chaurasia - Backend Developer" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {/* Border Effect */}
                  <div className="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
    </section>
  );
};

export default About;