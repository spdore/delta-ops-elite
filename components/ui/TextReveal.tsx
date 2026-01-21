import React, { useState, useEffect } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const [display, setDisplay] = useState("");
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let iteration = 0;
    
    // Initial delay
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2; // Speed of decoding
      }, 30);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={`font-mono ${className}`}>{display}</span>;
};

export default TextReveal;