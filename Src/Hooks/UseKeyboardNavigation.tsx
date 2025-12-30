import { useEffect, useCallback } from "react";
import { useSmoothScroll } from "./UseSmoothScroll";

const sections = [
  "about",
  "experience", 
  "projects",
  "skills",
  "certificates",
  "testimonials",
  "contact",
];

export const useKeyboardNavigation = () => {
  const { scrollToElement, scrollToTop } = useSmoothScroll({ offset: 80, duration: 600 });

  const getCurrentSectionIndex = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        return i;
      }
    }
    return -1; // At Top/Hero
  }, []);

  const navigateToSection = useCallback((direction: "up" | "down") => {
    const currentIndex = getCurrentSectionIndex();
    
    if (direction === "down") {
      if (currentIndex < sections.length - 1) {
        scrollToElement(sections[currentIndex + 1]);
      }
    } else {
      if (currentIndex <= 0) {
        scrollToTop();
      } else {
        scrollToElement(sections[currentIndex - 1]);
      }
    }
  }, [getCurrentSectionIndex, scrollToElement, scrollToTop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't Trigger If User Is Typing In An Input
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          navigateToSection("down");
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          navigateToSection("up");
          break;
        case "Home":
          e.preventDefault();
          scrollToTop();
          break;
        case "End":
          e.preventDefault();
          scrollToElement(sections[sections.length - 1]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToSection, scrollToElement, scrollToTop]);

  return { navigateToSection, getCurrentSectionIndex };
};