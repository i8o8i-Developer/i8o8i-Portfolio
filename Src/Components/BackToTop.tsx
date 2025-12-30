import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useSmoothScroll } from "@/Hooks/UseSmoothScroll";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll({ duration: 300 });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    let ticking = false;
    let timeoutId: number;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          handleScroll();
          ticking = false;
        }, 100);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 xl:bottom-24 xl:right-24 z-50 p-3 rounded-full bg-primary/20 border border-primary/50 text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary/30 hover:border-primary hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] group ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp 
        size={20} 
        className="group-hover:animate-bounce group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" 
      />
    </button>
  );
};

export default BackToTop;