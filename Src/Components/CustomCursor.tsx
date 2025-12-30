import { useEffect, useState, useRef, useCallback } from "react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const trailIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Check For Mobile On Mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addTrailPoint = useCallback((x: number, y: number) => {
    const dx = x - lastPositionRef.current.x;
    const dy = y - lastPositionRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only Add Trail Points If Mouse Moved Enough
    if (distance > 25) {
      trailIdRef.current += 1;
      const newPoint = { x, y, id: Date.now() + trailIdRef.current, opacity: 1 };
      setTrail((prev) => {
        const newTrail = [...prev, newPoint];
        return newTrail.slice(-5); // Keep last 5 Points
      });
      lastPositionRef.current = { x, y };
    }
  }, []);

  // Fade Out Trail Points
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((point) => ({ ...point, opacity: point.opacity - 0.2 }))
          .filter((point) => point.opacity > 0)
      );
    }, 70);

    return () => clearInterval(fadeInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
        addTrailPoint(e.clientX, e.clientY);
        
        const target = e.target as HTMLElement;
        const isClickable = 
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          !!target.closest("a") ||
          !!target.closest("button") ||
          window.getComputedStyle(target).cursor === "pointer";
        
        setIsPointer(isClickable);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [addTrailPoint]);

  // Only Show On Desktop
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Mouse Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9996]"
          style={{
            left: point.x,
            top: point.y,
            transform: "translate(-50%, -50%)",
            opacity: point.opacity * 0.6,
          }}
        >
          {/* Trail Particle With Gradient */}
          <div
            className="rounded-full bg-gradient-to-r from-primary via-accent to-primary"
            style={{
              width: `${Math.max(2, 8 - index * 0.3)}px`,
              height: `${Math.max(2, 8 - index * 0.3)}px`,
              boxShadow: `0 0 ${10 + index}px hsl(var(--primary) / ${point.opacity * 0.5})`,
              filter: `blur(${index * 0.1}px)`,
            }}
          />
        </div>
      ))}

      {/* Connecting Lines Between Trail Points */}
      <svg
        className="fixed inset-0 pointer-events-none z-[9995]"
        style={{ width: "100vw", height: "100vh" }}
      >
        {trail.length > 1 &&
          trail.slice(0, -1).map((point, index) => {
            const nextPoint = trail[index + 1];
            if (!nextPoint) return null;
            return (
              <line
                key={`line-${point.id}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke="hsl(var(--primary))"
                strokeWidth={Math.max(0.5, 2 - index * 0.1)}
                strokeOpacity={point.opacity * 0.3}
                strokeLinecap="round"
              />
            );
          })}
      </svg>

      {/* Glowing Orb That Follows Cursor With Delay */}
      <div
        className={`fixed pointer-events-none z-[9997] transition-all duration-300 ease-out ${
          isVisible ? "opacity-40" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* Main Cursor Dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
        }}
      >
        <div
          className={`rounded-full bg-primary transition-all duration-200 ${
            isPointer ? "w-4 h-4" : "w-2 h-2"
          }`}
          style={{
            boxShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary) / 0.5)",
          }}
        />
      </div>

      {/* Outer Ring */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-200 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1}) ${isClicking ? "scale(0.9)" : ""}`,
        }}
      >
        <div
          className={`w-8 h-8 rounded-full border transition-all duration-200 ${
            isPointer ? "border-primary" : "border-primary/50"
          }`}
          style={{
            boxShadow: isPointer ? "0 0 15px hsl(var(--primary) / 0.3)" : "none",
          }}
        />
      </div>

      {/* Crosshair Lines For Futuristic Effect */}
      <div
        className={`fixed pointer-events-none z-[9997] transition-all duration-150 ${
          isVisible && isPointer ? "opacity-60" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-primary" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-primary" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-primary" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-px bg-primary" />
        </div>
      </div>

      {/* Particle Burst On Click */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary animate-ping"
              style={{
                transform: `rotate(${i * 45}deg) translateX(15px)`,
                animationDuration: "0.4s",
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CustomCursor;