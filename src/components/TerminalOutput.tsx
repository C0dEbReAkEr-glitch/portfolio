
import React, { useState, useEffect } from 'react';

type OutputProps = {
  type: "command" | "response" | "error" | "ascii";
  content: React.ReactNode;
};

const TerminalOutput: React.FC<OutputProps> = ({ type, content }) => {
  const [displayedContent, setDisplayedContent] = useState<React.ReactNode>(null);
  const [isTyping, setIsTyping] = useState(type === 'response');
  const typingSpeed = 10; // milliseconds per character

  // Different styling based on output type
  const getOutputClass = () => {
    switch (type) {
      case "command":
        return "text-white font-bold";
      case "response":
        return "text-white"; // Normal responses in white
      case "error":
        return "text-blue-300";
      case "ascii":
        return "text-blue-400 font-bold terminal-glitch"; // ASCII art with glitch effect
      default:
        return "text-white";
    }
  };

  useEffect(() => {
    // For command outputs (user input), immediately show content
    if (type === 'command' || type === 'ascii' || type === 'error') {
      setDisplayedContent(content);
      return;
    }
    
    // For response type, simulate typing effect if it's text
    if (type === 'response' && typeof content === 'string') {
      setIsTyping(true);
      let i = 0;
      const text = content as string;
      const typeCharacter = () => {
        if (i < text.length) {
          setDisplayedContent(text.substring(0, i + 1));
          i++;
          setTimeout(typeCharacter, typingSpeed);
        } else {
          setIsTyping(false);
        }
      };
      
      typeCharacter();
    } else {
      // For complex JSX content, wait a bit and then show
      const timer = setTimeout(() => {
        setDisplayedContent(content);
        setIsTyping(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [content, type]);

  return (
    <div className={`mb-1 ${isTyping ? '' : 'animate-text-fade-in'} ${getOutputClass()}`}>
      {displayedContent}
    </div>
  );
};

export default TerminalOutput;
