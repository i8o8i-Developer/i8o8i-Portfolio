import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/UI/Dialog";
import { Github, ExternalLink, X, Calendar, Users, Zap } from "lucide-react";
import { Button } from "@/Components/UI/Button";

interface ProjectMetrics {
  [key: string]: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  technologies: string[];
  github?: string;
  demo?: string;
  metrics?: ProjectMetrics;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  ai: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  security: "bg-red-500/20 text-red-400 border-red-500/30",
  blockchain: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  fullstack: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const categoryLabels: Record<string, string> = {
  ai: "AI / Machine Learning",
  security: "Security & Cryptography",
  blockchain: "Blockchain & Web3",
  fullstack: "Full-Stack Development",
};

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border/50 backdrop-blur-xl overflow-hidden p-0 max-h-[90vh] overflow-y-auto">
        {/* Header Image/Preview */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary to-accent/20 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
          <span className="text-7xl font-bold text-primary/30 z-10">
            {project.title.slice(0, 2).toUpperCase()}
          </span>
          
          {/* Category Badge */}
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono border z-20 ${categoryColors[project.category] || "bg-primary/20 text-primary border-primary/30"}`}>
            {categoryLabels[project.category] || project.category}
          </span>
          
          {/* Featured Badge */}
          {project.featured && (
            <span className="absolute top-4 right-14 px-3 py-1 rounded-full text-xs font-mono bg-primary/20 text-primary border border-primary/30 flex items-center gap-1.5 z-20 backdrop-blur-sm">
              <Zap size={12} className="fill-primary" />
              Featured
            </span>
          )}
        </div>

        <div className="p-6 space-y-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground leading-relaxed">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          {/* Metrics */}
          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div 
                  key={key} 
                  className="bg-secondary/50 rounded-lg p-4 text-center border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <p className="text-xl font-bold text-primary">{value}</p>
                  <p className="text-muted-foreground text-xs font-mono mt-1">{key}</p>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 bg-secondary/50 text-muted-foreground text-sm font-mono rounded-lg border border-border/30 hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border/30">
            {project.github && (
              <Button
                variant="outline"
                className="flex-1 border-primary/50 text-primary hover:bg-primary/10 font-mono"
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2" size={18} />
                  View Source
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                asChild
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2" size={18} />
                  Live Demo
                </a>
              </Button>
            )}
            {!project.github && !project.demo && (
              <Button
                variant="outline"
                className="flex-1 border-border/50 text-muted-foreground font-mono"
                disabled
              >
                Coming Soon
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;