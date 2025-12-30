import { useEffect } from "react";

const SkipToContent = () => {
  useEffect(() => {
    // Handle Skip Link Click
    const handleSkip = (e: Event) => {
      e.preventDefault();
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: "smooth" });
      }
    };

    const skipLink = document.getElementById("skip-to-content");
    skipLink?.addEventListener("click", handleSkip);

    return () => {
      skipLink?.removeEventListener("click", handleSkip);
    };
  }, []);

  return (
    <a
      id="skip-to-content"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-mono focus:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Skip To Main Content
    </a>
  );
};

export default SkipToContent;