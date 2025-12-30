import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import Hero from "@/Components/Hero";
import About from "@/Components/About";
import Experience from "@/Components/Experience";
import Projects from "@/Components/Projects";
import Skills from "@/Components/Skills";
import Certificates from "@/Components/Certificates";
import Testimonials from "@/Components/Testimonials";
import Contact from "@/Components/Contact";
import Footer from "@/Components/Footer";
import FixedSocialLinks from "@/Components/FixedSocialLinks";
import CustomCursor from "@/Components/CustomCursor";
import LoadingScreen from "@/Components/LoadingScreen";
import BackToTop from "@/Components/BackToTop";
import SkipToContent from "@/Components/SkipToContent";
import ThreeBackground from "@/Components/ThreeBackground";
import { useKeyboardNavigation } from "@/Hooks/UseKeyboardNavigation";


const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Enable Keyboard Navigation (Arrow Up/Down, PageUp/PageDown, Home/End)
  useKeyboardNavigation();

  useEffect(() => {
    document.title = "Anubhav Chaurasia | Backend Developer";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Anubhav Chaurasia - Backend Developer Specializing In AI-Powered Distributed Systems, Quantum-Resistant Cryptography, And Production-Scale Applications."
      );
    }

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
          <Experience />
          <Projects />
          <Skills />
          <Certificates />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Index;