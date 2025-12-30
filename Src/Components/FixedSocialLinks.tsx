import { Github, Linkedin, Mail, BarChart3 } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/i8o8i-Developer",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/anubhav16o8",
    label: "LinkedIn",
  },
  {
    icon: BarChart3,
    href: "https://kaggle.com/anubhav16o8",
    label: "Kaggle",
  },
  {
    icon: Mail,
    href: "mailto:dev.anubhavchaurasia@gmail.com",
    label: "Email",
  },
];

const FixedSocialLinks = () => {
  return (
    <>
      {/* Social Links - Left Side Fixed (Desktop) */}
      <div className="hidden xl:flex fixed left-8 bottom-0 flex-col items-center gap-6 z-50">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:-translate-y-1 hover:scale-110 transition-all duration-300 p-2 hover:drop-shadow-[0_0_12px_hsl(var(--primary))]"
            aria-label={link.label}
          >
            <link.icon size={20} />
          </a>
        ))}
        <div className="w-[2px] h-24 bg-primary" />
      </div>

      {/* Email - Right Side Fixed (Desktop) */}
      <div className="hidden xl:flex fixed right-8 bottom-0 flex-col items-center gap-6 z-50">
        <a
          href="mailto:dev.anubhavchaurasia@gmail.com"
          className="font-mono text-xs text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300 tracking-widest hover:drop-shadow-[0_0_12px_hsl(var(--primary))]"
          style={{ writingMode: "vertical-rl" }}
        >
          dev.anubhavchaurasia@gmail.com
        </a>
        <div className="w-[2px] h-24 bg-primary" />
      </div>
    </>
  );
};

export default FixedSocialLinks;
