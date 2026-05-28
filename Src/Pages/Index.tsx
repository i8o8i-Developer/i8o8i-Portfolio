import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "@/Components/Navbar";
import Hero from "@/Components/Hero";
import About from "@/Components/About";
import FixedSocialLinks from "@/Components/FixedSocialLinks";
import CustomCursor from "@/Components/CustomCursor";
import LoadingScreen from "@/Components/LoadingScreen";
import BackToTop from "@/Components/BackToTop";
import SkipToContent from "@/Components/SkipToContent";
import ThreeBackground from "@/Components/ThreeBackground";
import SEO from "@/Components/SEO";
import { useKeyboardNavigation } from "@/Hooks/UseKeyboardNavigation";

const Experience = lazy(() => import("@/Components/Experience"));
const Projects = lazy(() => import("@/Components/Projects"));
const Skills = lazy(() => import("@/Components/Skills"));
const Certificates = lazy(() => import("@/Components/Certificates"));
const Testimonials = lazy(() => import("@/Components/Testimonials"));
const Contact = lazy(() => import("@/Components/Contact"));
const Footer = lazy(() => import("@/Components/Footer"));


const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Enable Keyboard Navigation (Arrow Up/Down, PageUp/PageDown, Home/End)
  useKeyboardNavigation();

  useEffect(() => {
    // Hide Default Cursor On Desktop
    if (window.innerWidth >= 768) {
      document.body.style.cursor = "none";
      document.querySelectorAll("a, button").forEach((el) => {
        (el as HTMLElement).style.cursor = "none";
      });
    }

    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* SEO Component For Dynamic Meta Tag Updates */}
      <SEO />
      
      <SkipToContent />
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <ThreeBackground />
      <div 
        id="main-content" 
        tabIndex={-1}
        className={`min-h-screen bg-transparent overflow-x-hidden transition-opacity duration-500 outline-none ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        
        <CustomCursor />
        <Navbar />
        <FixedSocialLinks />
        <main role="main">
          <Hero />
          <About />
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground font-mono text-sm">Loading...</div>}>
            <Experience />
          </Suspense>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground font-mono text-sm">Loading...</div>}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground font-mono text-sm">Loading...</div>}>
            <Skills />
          </Suspense>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground font-mono text-sm">Loading...</div>}>
            <Certificates />
          </Suspense>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground font-mono text-sm">Loading...</div>}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground font-mono text-sm">Loading...</div>}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <BackToTop />
      </div>
    </>
  );
};

export default Index;