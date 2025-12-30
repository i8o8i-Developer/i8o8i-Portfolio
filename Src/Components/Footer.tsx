import { Github, Linkedin, Mail, BarChart3 } from "lucide-react";
import { useEffect, useRef } from "react";

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

const Footer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set Canvas Size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Circuit Nodes
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
    }

    const nodes: Node[] = [];
    const nodeCount = 20;
    const connectionDistance = 180;

    // Create Random Nodes With Velocity
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
      });
    }

    // Animation State
    let pulseOffset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pulseOffset += 0.015;

      // Update Node Positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce Off Edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }
      });

      // Recalculate Connections Dynamically
      nodes.forEach((node) => {
        node.connections = [];
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance && nodes[i].connections.length < 4) {
            nodes[i].connections.push(j);
          }
        }
      }

      // Draw Connections
      nodes.forEach((node, i) => {
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex];
          
          const pulse = Math.sin(pulseOffset + i * 0.3) * 0.5 + 0.5;

          ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 + pulse * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw Nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(pulseOffset + i * 0.2) * 0.5 + 0.5;

        // Outer Glow
        ctx.fillStyle = `rgba(16, 185, 129, ${0.1 + pulse * 0.1})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Node Center
        ctx.fillStyle = `rgba(16, 185, 129, ${0.5 + pulse * 0.3})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <footer className="py-8 sm:py-12 2xl:py-16 border-t border-primary/20 relative overflow-hidden bg-black">
      {/* Circuit Animation Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "#000000", opacity: 0.35 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Footer Content */}
        <div className="text-center">
          {/* Mobile Social Links */}
          <div className="flex justify-center gap-5 sm:gap-6 mb-4 sm:mb-6 lg:hidden">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon size={18} className="sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>

          {/* Credit */}
          <div className="space-y-1 sm:space-y-2">
            <p className="font-mono text-xs sm:text-sm 2xl:text-base text-muted-foreground">
              Designed & Built By Anubhav Chaurasia aka i8o8i Developer
            </p>
            <p className="font-mono text-[10px] sm:text-xs 2xl:text-sm text-muted-foreground/70">
              Built With Love & React, TypeScript & Tailwind CSS
            </p>
            <p className="font-mono text-[10px] sm:text-xs 2xl:text-sm text-muted-foreground/60">
              © {new Date().getFullYear()} Anubhav Chaurasia. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;