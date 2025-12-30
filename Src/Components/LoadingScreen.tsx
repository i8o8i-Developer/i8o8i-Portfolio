import { useState, useEffect } from "react";

const bootSequence = [
  { text: "> Initializing System...", delay: 0 },
  { text: "> Loading Core Modules...", delay: 400 },
  { text: "> Establishing Secure Connection...", delay: 800 },
  { text: "> Decrypting Portfolio Data...", delay: 1200 },
  { text: "> Compiling Experience Matrix...", delay: 1600 },
  { text: "> Rendering UI Components...", delay: 2000 },
  { text: "> System Ready.", delay: 2400 },
  { text: "", delay: 2800 },
];

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    bootSequence.forEach((item, index) => {
      setTimeout(() => {
        if (item.text) {
          setVisibleLines((prev) => [...prev, item.text]);
        }
        setProgress(((index + 1) / bootSequence.length) * 100);

        if (index === bootSequence.length - 1) {
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadingComplete, 500);
          }, 400);
        }
      }, item.delay);
    });
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Terminal Window */}
      <div className="w-full max-w-2xl mx-4 px-2 sm:px-0">
        {/* Terminal Header */}
        <div className="bg-secondary/80 rounded-t-lg px-2 sm:px-4 py-2 flex items-center gap-1.5 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          <span className="ml-2 sm:ml-4 font-mono text-xs sm:text-sm text-muted-foreground truncate">
            anubhav@portfolio ~ boot
          </span>
        </div>

        {/* Terminal Body */}
        <div className="bg-secondary/40 border border-border/50 rounded-b-lg p-3 sm:p-6 font-mono text-xs sm:text-sm min-h-[200px] sm:min-h-[300px]">
          {/* ASCII Art Logo */}
          <pre className="text-primary text-[8px] sm:text-xs mb-4 sm:mb-6 leading-tight overflow-x-auto">
{`  _     ____              ____     _   
 (_)  .' __ '.          .' __ '.  (_)  
 __   | (__) |   .--.   | (__) |  __   
[  |  .\`____'. / .'\`\\ \\ .\`____'. [  |  
 | | | (____) || \\__. || (____) | | |  
[___].\`______.' '.__.' .\`______.'[___] 
                                       `}
          </pre>

          {/* Boot Lines */}
          <div className="space-y-0.5 sm:space-y-1">
            {visibleLines.map((line, index) => (
              <div
                key={index}
                className={`flex items-center text-[10px] sm:text-sm ${
                  line.includes("Ready") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="animate-fade-in truncate">{line}</span>
                {index === visibleLines.length - 1 && !line.includes("Ready") && (
                  <span className="ml-1 w-1.5 h-3 sm:w-2 sm:h-4 bg-primary animate-pulse flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Cursor */}
          {visibleLines.length > 0 && visibleLines[visibleLines.length - 1]?.includes("Ready") && (
            <div className="mt-3 sm:mt-4 flex items-center text-primary text-[10px] sm:text-sm">
              <span>{">"}</span>
              <span className="ml-2 w-1.5 h-3 sm:w-2 sm:h-4 bg-primary animate-pulse" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 sm:mt-6">
          <div className="flex justify-between text-[10px] sm:text-xs font-mono text-muted-foreground mb-2">
            <span>Loading Portfolio</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-emerald-400 to-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-12 h-12 sm:w-24 sm:h-24 border-t border-l border-primary/20" />
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-24 sm:h-24 border-b border-r border-primary/20" />
    </div>
  );
};

export default LoadingScreen;