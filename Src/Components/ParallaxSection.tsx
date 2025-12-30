import { ReactNode, useEffect, useState, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  backgroundElement?: ReactNode;
}

const ParallaxSection = ({
  children,
  speed = 0.3,
  className = "",
  backgroundElement,
}: ParallaxSectionProps) => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate How Far Through The Viewport This Element Is
      const elementProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      // Only Apply Parallax When Element Is In Viewport
      if (elementProgress >= 0 && elementProgress <= 1) {
        setOffset((elementProgress - 0.5) * speed * 100);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {backgroundElement && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${offset}px)`,
            willChange: "transform",
          }}
        >
          {backgroundElement}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxSection;