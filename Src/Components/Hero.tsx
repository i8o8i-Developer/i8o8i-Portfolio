import { ArrowDown } from "lucide-react";
import { Button } from "@/Components/UI/Button";
import { useParallax } from "@/Hooks/UseParallax";
import { useSmoothScroll } from "@/Hooks/UseSmoothScroll";
import AnimatedCounter from "./AnimatedCounter";
import TypingEffect from "./TypingEffect";

const Hero = () => {
  const { scrollY, opacity, translateY } = useParallax();
  const { scrollToElement } = useSmoothScroll({ offset: 80, duration: 200 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent" aria-label="Hero section">

      {/* Content With Fade Effect */}
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20 relative z-10 pt-12 sm:pt-16 2xl:pt-20"
        style={{
          opacity: opacity(0, 400),
          transform: `translateY(${translateY(-0.15)}px)`,
          willChange: "transform, opacity",
        }}
      >
        <div className="max-w-5xl">
          {/* Intro */}
          <p
            className="font-mono text-primary text-xs sm:text-sm md:text-base 2xl:text-lg mb-2 sm:mb-3 2xl:mb-4 opacity-0 animate-fade-in-up tracking-wider"
            style={{ animationDelay: "500ms" }}
          >
            <span className="inline-block w-6 sm:w-8 h-px bg-primary mr-2 sm:mr-3 align-middle" aria-hidden="true" />
            Hi, My Name Is
          </p>

          {/* Name */}
          <h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-foreground mb-1 sm:mb-2 2xl:mb-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "700ms" }}
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
              Anubhav Chaurasia.
            </span>
          </h1>

          {/* Tagline */}
          <h2
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-muted-foreground mb-2 sm:mb-4 2xl:mb-6 opacity-0 animate-fade-in-up min-h-[1.2em]"
            style={{ animationDelay: "900ms" }}
          >
            <TypingEffect 
              text="I Build Secure, Scalable Systems."
              speed={120}
              delay={1200}
              gradient={true}
            />
          </h2>

          {/* Description */}
          <p
            className="text-muted-foreground text-sm sm:text-base md:text-base lg:text-base 2xl:text-xl max-w-2xl mb-4 sm:mb-6 2xl:mb-10 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1100ms" }}
          >
            <span className="text-primary font-bold">Aspiring Machine Learning Engineer</span> And Current{" "}
            <span className="text-primary font-medium">Backend Developer</span> Specializing In{" "}
            <span className="text-primary font-medium">AI-Powered Distributed Systems</span>,{" "}
            <span className="text-primary font-medium">Quantum-Resistant Cryptography</span>, And{" "}
            <span className="text-primary font-medium">Production-Scale Applications</span>.
            Passionate About Building Secure, Scalable Systems That Solve Real-World Problems Through Innovation And Performance-Driven Development.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-3 2xl:gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1300ms" }}
          >
            <Button
              size="lg"
              className="cyber-button font-mono px-5 sm:px-7 2xl:px-8 py-3 sm:py-5 2xl:py-6 text-sm sm:text-base 2xl:text-lg w-full xs:w-auto"
              asChild
            >
              <a href="mailto:dev.anubhavchaurasia@gmail.com">
                <span className="relative z-10">Get In Touch</span>
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="border-2 border-border text-foreground hover:text-primary hover:border-primary hover:bg-primary/5 font-mono px-5 sm:px-7 2xl:px-8 py-3 sm:py-5 2xl:py-6 text-sm sm:text-base 2xl:text-lg group w-full xs:w-auto transition-all duration-300"
              asChild
            >
              <a 
                href="#projects" 
                className="flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement("projects");
                }}
              >
                View Projects
                <span className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
              </a>
            </Button>
          </div>

          {/* Stats Bar With Animated Counters */}
          <div
            className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-5 md:gap-8 2xl:gap-10 mt-6 sm:mt-10 2xl:mt-16 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1500ms" }}
            role="list"
            aria-label="Key statistics"
          >
            <StatCard 
              value={<><AnimatedCounter end={4} duration={2000} suffix="+" /></>} 
              label="Years Of Experience" 
            />
            <StatCard 
              value={<><AnimatedCounter end={40} duration={2500} suffix="+" /></>} 
              label="Technologies Mastered" 
            />
            <StatCard 
              value={<><AnimatedCounter end={15} duration={1800} suffix="+" /></>} 
              label="Projects Completed" 
            />
            <StatCard 
              value={<><AnimatedCounter end={10} duration={2000} suffix=" Certs" /></>} 
              label="Professional Certifications" 
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToElement("about")}
        className="absolute bottom-10 right-14 text-muted-foreground hover:text-primary transition-all duration-300 animate-float group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full z-50 cursor-pointer"
        aria-label="Scroll To About Section"
        style={{ opacity: Math.max(0, 1 - scrollY / 500) }}
      >
        <div className="p-2 border-2 border-border rounded-full group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300">
          <ArrowDown size={20} className="group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
        </div>
      </button>
    </section>
  );
};

interface StatCardProps {
  value: React.ReactNode;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => (
  <div className="group cursor-default" role="listitem">
    <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary group-hover:drop-shadow-[0_0_15px_hsl(var(--primary))] group-hover:scale-105 transition-all duration-300">
      {value}
    </p>
    <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm font-mono tracking-wide group-hover:text-foreground transition-colors duration-300">
      {label}
    </p>
  </div>
);

export default Hero;