import { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  gradient?: boolean;
  onComplete?: () => void;
}

const TypingEffect = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "",
  gradient = false,
  onComplete 
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
      onComplete?.();
    }
  }, [displayedText, isTyping, text, speed, onComplete]);

  // Cursor Blink Effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, []);

  // Hide Cursor After Typing Complete
  useEffect(() => {
    if (typingComplete) {
      const hideTimeout = setTimeout(() => {
        setCursorVisible(false);
      }, 2500);
      return () => clearTimeout(hideTimeout);
    }
  }, [typingComplete]);

  return (
    <span className={className}>
      {gradient && typingComplete ? (
        <span className="animate-gradient-text bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
          {displayedText}
        </span>
      ) : (
        displayedText
      )}
      {!typingComplete && (
        <span 
          className={`inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle transition-opacity ${
            cursorVisible && isTyping ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export default TypingEffect;