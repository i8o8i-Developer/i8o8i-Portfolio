import { useState, useEffect, useCallback } from "react";

interface ParallaxValues {
  scrollY: number;
  scrollProgress: number;
  translateY: (speed?: number) => number;
  opacity: (fadeStart?: number, fadeEnd?: number) => number;
  scale: (minScale?: number, maxScale?: number) => number;
}

export const useParallax = (): ParallaxValues => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      setScrollY(currentScrollY);
      setScrollProgress(maxScroll > 0 ? currentScrollY / maxScroll : 0);
    };

    // Use requestAnimationFrame For Smooth Updates
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
    handleScroll(); // Initial Call

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const translateY = useCallback(
    (speed: number = 0.5) => scrollY * speed,
    [scrollY]
  );

  const opacity = useCallback(
    (fadeStart: number = 0, fadeEnd: number = 300) => {
      if (scrollY <= fadeStart) return 1;
      if (scrollY >= fadeEnd) return 0;
      return 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
    },
    [scrollY]
  );

  const scale = useCallback(
    (minScale: number = 0.8, maxScale: number = 1) => {
      const range = maxScale - minScale;
      return maxScale - scrollProgress * range * 0.5;
    },
    [scrollProgress]
  );

  return { scrollY, scrollProgress, translateY, opacity, scale };
};

interface ElementParallax {
  ref: React.RefObject<HTMLDivElement>;
  style: React.CSSProperties;
}

export const useElementParallax = (speed: number = 0.1): ElementParallax => {
  const [offset, setOffset] = useState(0);
  const ref = { current: null as HTMLDivElement | null };

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const distance = elementCenter - windowCenter;
      
      setOffset(distance * speed);
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

  return {
    ref: ref as React.RefObject<HTMLDivElement>,
    style: {
      transform: `translateY(${offset}px)`,
      transition: "transform 0.1s ease-out",
    },
  };
};