import { useState, useEffect } from "react";
import { Terminal, Play, Square } from "lucide-react";
import { useInView } from "@/Hooks/UseInView";

const commands = [
  {
    command: "Portfolio --version",
    output: "Anubhav Chaurasia v2.5.8",
    delay: 100,
  },
  {
    command: "Portfolio --skills",
    output: `
├── Backend Development
│   ├── Python (Django, Flask, FastAPI)
│   ├── Node.js & TypeScript
│   └── RESTful APIs & GraphQL
├── AI & Machine Learning
│   ├── Google ADK & Gemini
│   ├── Multi-Agent Systems
│   └── LangChain
├── Security & Cryptography
│   ├── AES-256 & RSA-4096
│   ├── Quantum-Resistant Protocols
│   └── End-to-End Encryption
└── DevOps & Cloud
    ├── Docker & Kubernetes
    ├── AWS & GCP
    └── CI/CD Pipelines`,
    delay: 150,
  },
  {
    command: "Portfolio --mission",
    output: `
Mission: Building Secure, Scalable Systems That Solve Real-World Problems.

Current Focus:
  → Revolutionizing Agriculture With AI (12,000+ Farmers Served)
  → Advancing Quantum-Resistant Cryptography
  → Creating Production-Scale Distributed Systems

Philosophy:
  "Code Is Poetry Written For Machines To Execute And Humans To Understand."`,
    delay: 200,
  },
  {
    command: "Portfolio --contact",
    output: `
📧 dev.anubhavchaurasia@gmail.com
🐙 github.com/i8o8i-Developer
💼 linkedin.com/in/anubhav16o8
📊 kaggle.com/anubhav16o8

Status: Open To New Opportunities And Collaborations!`,
    delay: 150,
  },
];

const TerminalShowcase = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);

  const runSequence = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentCommandIndex(0);
    setHistory([]);
    setDisplayedCommand("");
    setDisplayedOutput("");
  };

  const stopSequence = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning || currentCommandIndex >= commands.length) {
      if (currentCommandIndex >= commands.length) {
        setIsRunning(false);
      }
      return;
    }

    const currentCmd = commands[currentCommandIndex];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedCommand("");
    setDisplayedOutput("");

    // Type Command
    const typeCommand = setInterval(() => {
      if (charIndex < currentCmd.command.length) {
        setDisplayedCommand(currentCmd.command.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeCommand);
        setIsTyping(false);

        // Show Output After A Delay
        setTimeout(() => {
          setDisplayedOutput(currentCmd.output);

          // Move to History and Next Command
          setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              { command: currentCmd.command, output: currentCmd.output },
            ]);
            setDisplayedCommand("");
            setDisplayedOutput("");
            setCurrentCommandIndex((prev) => prev + 1);
          }, 1500);
        }, 300);
      }
    }, 50);

    return () => clearInterval(typeCommand);
  }, [isRunning, currentCommandIndex]);

  // Auto-Start When In View
  useEffect(() => {
    if (isInView && !isRunning && history.length === 0) {
      setTimeout(runSequence, 500);
    }
  }, [isInView]);

  return (
    <section className="py-8 sm:py-12 md:py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-20">
        <div
          ref={ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Terminal Window */}
          <div className="cyber-card rounded-lg overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-secondary/80 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-mono text-xs sm:text-sm hidden xs:inline">anubhav@portfolio</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={runSequence}
                  disabled={isRunning}
                  className="p-1 sm:p-1.5 rounded hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                  title="Run"
                >
                  <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={stopSequence}
                  disabled={!isRunning}
                  className="p-1 sm:p-1.5 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                  title="Stop"
                >
                  <Square className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="bg-background/50 p-3 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm min-h-[300px] sm:min-h-[400px] max-h-[400px] sm:max-h-[500px] overflow-y-auto overflow-x-hidden">
              {/* History */}
              {history.map((item, index) => (
                <div key={index} className="mb-3 sm:mb-4">
                  <div className="flex items-start text-muted-foreground">
                    <span className="text-primary mr-1.5 sm:mr-2 flex-shrink-0">$</span>
                    <span className="break-all">{item.command}</span>
                  </div>
                  <pre className="text-foreground/80 whitespace-pre-wrap mt-1 ml-3 sm:ml-4 break-words text-[9px] sm:text-xs md:text-sm">
                    {item.output}
                  </pre>
                </div>
              ))}

              {/* Current Command */}
              {(displayedCommand || isTyping) && (
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-start text-muted-foreground">
                    <span className="text-primary mr-1.5 sm:mr-2 flex-shrink-0">$</span>
                    <span className="break-all">{displayedCommand}</span>
                    {isTyping && (
                      <span className="ml-0.5 w-1.5 sm:w-2 h-3 sm:h-4 bg-primary animate-pulse flex-shrink-0" />
                    )}
                  </div>
                  {displayedOutput && (
                    <pre className="text-foreground/80 whitespace-pre-wrap mt-1 ml-3 sm:ml-4 animate-fade-in break-words text-[9px] sm:text-xs md:text-sm">
                      {displayedOutput}
                    </pre>
                  )}
                </div>
              )}

              {/* Idle Prompt */}
              {!isRunning && !displayedCommand && history.length > 0 && (
                <div className="flex items-center text-muted-foreground">
                  <span className="text-primary mr-1.5 sm:mr-2">$</span>
                  <span className="w-1.5 sm:w-2 h-3 sm:h-4 bg-primary animate-pulse" />
                </div>
              )}

              {/* Initial State */}
              {!isRunning && history.length === 0 && !displayedCommand && (
                <div className="text-muted-foreground">
                  <p className="mb-2 text-xs sm:text-sm">Welcome to Anubhav&apos;s Terminal</p>
                  <p className="text-[10px] sm:text-xs md:text-sm">Click play or scroll to start...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalShowcase;
