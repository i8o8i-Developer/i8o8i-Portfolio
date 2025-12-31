import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/Components/UI/Button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User Attempted To Access Non-Existent Route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid-flow" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 404 Number with Glitch Effect */}
        <div className="relative mb-6 sm:mb-8 animate-fade-in-up">
          <h1 
            className="text-[6rem] xs:text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[15rem] xl:text-[18rem] font-bold leading-none tracking-tighter"
            style={{ 
              fontFamily: "'Silkscreen', sans-serif",
              background: "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 60px rgba(16, 185, 129, 0.4)",
            }}
          >
            404
          </h1>
          <div 
            className="absolute inset-0 text-[6rem] xs:text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[15rem] xl:text-[18rem] font-bold leading-none tracking-tighter opacity-50 blur-sm"
            style={{ 
              fontFamily: "'Silkscreen', sans-serif",
              background: "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {/* Simple Decorative Line */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-[2px] w-full max-w-md bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
          </div>
          
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 px-2" style={{ fontFamily: "'Silkscreen', sans-serif" }}>
            Oops! Page Not Found
          </h2>
          
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2" style={{ fontFamily: "'Iceberg', sans-serif" }}>
            The Page You're Looking For Seems To Have Vanished Into The Digital Void. Let's Get You Back On Track.
          </p>

          {/* Path Display */}
          <div className="inline-block mt-4 sm:mt-6 px-3 sm:px-6 py-2 sm:py-3 bg-card border-2 border-primary/20 rounded-lg mx-2 max-w-full overflow-hidden">
            <code className="text-xs sm:text-sm text-primary/80 font-mono break-all">
              Attempted Path: <span className="text-primary font-bold">{location.pathname}</span>
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up px-2"
          style={{ animationDelay: "400ms" }}
        >
          <Button
            size="lg"
            className="cyber-button font-mono px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg group w-full sm:w-auto min-w-[200px]"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="relative z-10">Return To Home</span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary/50 text-foreground hover:text-primary hover:border-primary hover:bg-primary/5 font-mono px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg group w-full sm:w-auto min-w-[200px] transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-2 opacity-50">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;