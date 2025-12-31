import { Award, ExternalLink, Calendar } from "lucide-react";
import { useInView } from "@/Hooks/UseInView";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

const certificates: Certificate[] = [
  {
    id: "google-ai-agents",
    title: "5-Day AI Agents Intensive Course with Google",
    issuer: "Google & Kaggle",
    date: "December 18, 2025",
    credentialId: "Badge Earned",
    link: "https://www.kaggle.com",
  },
  {
    id: "forage-developer",
    title: "Developer and Technology Job Simulation",
    issuer: "Forage",
    date: "October 29, 2025",
    credentialId: "2ubPbLbpQWZtDPvHq",
  },
  {
    id: "anthropic-mcp",
    title: "Model Context Protocol: Introduction & Advanced Topics",
    issuer: "Anthropic",
    date: "October 25, 2025",
    credentialId: "ka6gwccskcd3 & 5ypb93sk5b59",
    link: "https://verify.skilljar.com/c/ka6gwccskcd3",
  },
  {
    id: "anthropic-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "2025",
    credentialId: "Completion Certificate",
  },
  {
    id: "deloitte-cyber",
    title: "Cyber Job Simulation",
    issuer: "Deloitte (Forage)",
    date: "October 30, 2025",
    credentialId: "A3ZNQmx8wk333Yjna",
  },
  {
    id: "deloitte-data",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (Forage)",
    date: "October 30, 2025",
    credentialId: "kNqjr7gRw4G7WeS85",
  },
  {
    id: "deloitte-tech",
    title: "Technology Job Simulation",
    issuer: "Deloitte (Forage)",
    date: "October 30, 2025",
    credentialId: "b8vYRBJ5TYdrgW9JR",
  },
  {
    id: "forage-software-eng",
    title: "Software Engineering Job Simulation",
    issuer: "Forage",
    date: "October 29, 2025",
    credentialId: "fobg8qpP2BJnLjswE",
  },
  {
    id: "forage-cybersecurity",
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Forage",
    date: "October 29, 2025",
    credentialId: "mT4gnKqSQYQyyWqs7",
  },
];

const Certificates = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="certificates" className="py-12 sm:py-16 md:py-20 2xl:py-24 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20 relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Title */}
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 2xl:mb-16 max-w-5xl mx-auto">
            <h2 className="text-lg sm:text-2xl md:text-3xl 2xl:text-4xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
              <span className="section-number text-sm sm:text-base">05.</span>
              Certifications
            </h2>
            <div className="flex-1 h-[2px] bg-primary max-w-[80px] sm:max-w-xs" />
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8 max-w-7xl mx-auto">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className="p-4 sm:p-6 2xl:p-8 rounded-lg group border-2 border-border bg-card hover:border-primary transition-colors min-h-[200px] sm:min-h-[220px] flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))] transition-all" />
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-sm sm:text-lg 2xl:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1 sm:mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm 2xl:text-base mb-3 sm:mb-4">
                    {cert.issuer}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-2 text-[10px] sm:text-xs 2xl:text-sm font-mono">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{cert.date}</span>
                  </div>
                  {cert.credentialId && (
                    <div className="flex items-start gap-1">
                      <span className="text-primary/50 shrink-0">ID:</span>
                      <span className="text-primary/90 break-all leading-tight">
                        {cert.credentialId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;