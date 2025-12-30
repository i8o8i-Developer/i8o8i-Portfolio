import { ReactNode } from "react";
import { useInView } from "@/Hooks/UseInView";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 400,
  className = "",
  threshold = 0.1,
}: ScrollRevealProps) => {
  const { ref, isInView } = useInView({ threshold, triggerOnce: true });

  const getInitialStyles = () => {
    switch (direction) {
      case "up":
        return { transform: "translateY(40px)", opacity: 0 };
      case "down":
        return { transform: "translateY(-40px)", opacity: 0 };
      case "left":
        return { transform: "translateX(40px)", opacity: 0 };
      case "right":
        return { transform: "translateX(-40px)", opacity: 0 };
      case "scale":
        return { transform: "scale(0.9)", opacity: 0 };
      case "fade":
        return { opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  const getFinalStyles = () => ({
    transform: "translate(0) scale(1)",
    opacity: 1,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isInView ? getFinalStyles() : getInitialStyles()),
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;