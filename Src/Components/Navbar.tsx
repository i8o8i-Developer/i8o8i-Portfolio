import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Menu, X } from "lucide-react";
import { useSmoothScroll } from "@/Hooks/UseSmoothScroll";

const navLinks = [
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Certificates", href: "#certificates", id: "certificates" },
  { name: "Testimonials", href: "#testimonials", id: "testimonials" },
  { name: "Contact", href: "#contact", id: "contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLUListElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const { scrollToElement, scrollToTop } = useSmoothScroll({ offset: 80, duration: 200 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update Active Section Based On Scroll Position
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape Key To Close Mobile Menu
  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Lock Body Scroll When Mobile Menu Is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save Current Scroll Position (Use Fallbacks For Reliability)
      const scrollPos = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
      scrollPositionRef.current = scrollPos;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollPos}px`;
      // Mark Page As Menu-Open To Allow Other Components (Cursor, Animations) To Hide
      document.body.classList.add('menu-open');
      // For Accessibility: Mark Main Content As Inert/Hidden To Assist Screen Readers (Does NOT Change Visual Opacity)
      const main = document.getElementById('main-content');
      if (main) main.setAttribute('aria-hidden', 'true');
    } else {
      // Restore Scroll Position From Ref
      const scrollY = scrollPositionRef.current;
      // Remove The Fixed Lock Styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      // Restore To The Exact Position We Saved
      window.scrollTo(0, scrollY);
      // Remove Aria-Hidden From Main Content
      const main = document.getElementById('main-content');
      if (main) main.removeAttribute('aria-hidden');
      // Restore Focus To The Menu Toggle To Prevent Focus Landing On An Interactive Element That Can Cause Navigation
      setTimeout(() => {
        menuToggleRef.current?.focus();
      }, 0);
      // Remove Menu-Open Class
      document.body.classList.remove('menu-open');
    }
  }, [isMobileMenuOpen]);

  // Trap Focus In Mobile Menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button, a, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: globalThis.KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleTab);
    }
  }, [isMobileMenuOpen]);

  // Wait Until Body Style Is No Longer 'Position: Fixed' (Menu Unlocked)
  const waitForBodyRestore = (timeout = 1000) => {
    return new Promise<void>((resolve) => {
      const start = performance.now();
      const check = () => {
        const isFixed = window.getComputedStyle(document.body).position === 'fixed';
        if (!isFixed) return resolve();
        if (performance.now() - start > timeout) return resolve();
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
  };

  const handleNavClick = async (id: string) => {
    if (isMobileMenuOpen) {
      // Close Menu First So Body Becomes Scrollable
      setIsMobileMenuOpen(false);
      await waitForBodyRestore();
      // Now Scroll To Target Reliably
      scrollToElement(id);
    } else {
      // Desktop: Scroll Immediately
      scrollToElement(id);
    }
  }; 

  const handleNavKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const links = navRef.current?.querySelectorAll("a");
    if (!links) return;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        (links[(index + 1) % links.length] as HTMLAnchorElement)?.focus();
        break;
      case "ArrowLeft":
        e.preventDefault();
        (links[(index - 1 + links.length) % links.length] as HTMLAnchorElement)?.focus();
        break;
      case "Home":
        e.preventDefault();
        (links[0] as HTMLAnchorElement)?.focus();
        break;
      case "End":
        e.preventDefault();
        (links[links.length - 1] as HTMLAnchorElement)?.focus();
        break;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg py-4"
          : "bg-transparent py-6"
      } ${isMobileMenuOpen ? "z-[90]" : "z-50"}`}
      role="banner"
    >
      <nav 
        className="container mx-auto px-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className="text-primary font-mono text-base sm:text-xl font-semibold hover:text-primary/80 hover:drop-shadow-[0_0_8px_hsl(var(--primary))] transition-all duration-300 animate-fade-in-down focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Go to top of page"
        >
          {"<i8o8i>"}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden nav:flex items-center gap-8">
          <ul 
            ref={navRef}
            className="flex items-center gap-6"
            role="menubar"
            aria-label="Site sections"
          >
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                className="opacity-0 animate-fade-in-down"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
                role="none"
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  onKeyDown={(e) => handleNavKeyDown(e, index)}
                  className={`font-mono text-sm link-underline transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-1 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]"
                      : "text-foreground hover:text-primary hover:drop-shadow-[0_0_8px_hsl(var(--primary))]"
                  }`}
                  role="menuitem"
                  aria-current={activeSection === link.href.replace("#", "") ? "page" : undefined}
                >
                  <span className="text-primary mr-1" aria-hidden="true">0{index + 1}.</span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuToggleRef}
          className="nav:hidden text-primary p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          onClick={() => {
            // Toggle Mobile Menu State (body.menu-open Is Managed In The Effect)
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`fixed inset-0 top-0 z-[10000] bg-background nav:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          {...(!isMobileMenuOpen && { inert: '' as unknown as undefined })}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transition: 'transform 300ms ease-in-out',
          }}
>
          {/* Solid Overlay To Prevent Page Bleed-Through While Menu Is Animating */}
          <div className="absolute inset-0 bg-background z-10" aria-hidden="true" />

          <div className="relative z-20 flex flex-col items-center justify-center h-full gap-8">
            <button
              className="absolute top-6 right-6 text-primary p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className="font-mono text-lg text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <span className="text-primary block text-center text-sm mb-1" aria-hidden="true">
                  0{index + 1}.
                </span>
                {link.name}</a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;