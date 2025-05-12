
import React, { useRef, useEffect, useState } from 'react';
import CommandLine from './CommandLine';
import TerminalOutput from './TerminalOutput';
import { useCommandProcessor } from '../hooks/useCommandProcessor';
import { ScrollArea } from './ui/scroll-area';

const Terminal: React.FC = () => {
  const { commandHistory, processCommand } = useCommandProcessor();
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Scroll to the bottom when command history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Simulate loading for some commands
  const handleCommand = (command: string) => {
    const complexCommands = ['projects', 'experience', 'skills'];
    const commandName = command.trim().split(' ')[0].toLowerCase();
    
    if (complexCommands.includes(commandName)) {
      setIsLoading(true);
      // Simulate loading time
      setTimeout(() => {
        processCommand(command);
        setIsLoading(false);
      }, 600);
    } else {
      processCommand(command);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-terminal-bg/60 backdrop-blur-sm">
      {/* Terminal header with title bar */}
      <div className="bg-gradient-to-r from-black/70 to-terminal-bg/70 px-4 py-2 flex items-center border-b border-blue-500/30">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-terminal-red hover:opacity-80 transition-opacity cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow hover:opacity-80 transition-opacity cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-terminal-green hover:opacity-80 transition-opacity cursor-pointer" />
        </div>
        <div className="text-center flex-1 text-terminal-text text-sm font-bold flex items-center justify-center">
          <span className="text-green-400 mr-1.5">[</span>
          <span className="text-white">root</span>
          <span className="text-blue-400">@</span>
          <span className="text-white">WhoAmI</span>
          <span className="text-green-400 ml-1.5">]-[</span>
          <span className="text-blue-400">/home/portfolio</span>
          <span className="text-green-400">]</span>
        </div>
      </div>
      
      {/* Terminal content area with improved background and 40% transparency */}
      <div 
        ref={terminalRef}
        className="p-4 overflow-y-auto h-[calc(100%-40px)] scrollbar-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 20, 0.4), rgba(0, 0, 20, 0.4))",
          backgroundSize: "100% 100%"
        }}
        onClick={() => {
          // Hack to maintain focus on input when clicking in the terminal area
          const cmdInput = document.querySelector('input');
          if (cmdInput) cmdInput.focus();
        }}
      >
        {/* Render command history */}
        {commandHistory.map((output) => (
          <TerminalOutput 
            key={output.id}
            type={output.type}
            content={output.content}
          />
        ))}
        
        {/* Loading animation */}
        {isLoading && (
          <div className="flex items-center my-2">
            <div className="loading-dots flex space-x-1 mr-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-200"></div>
            </div>
            <span className="text-blue-400 text-sm font-mono">Processing command...</span>
          </div>
        )}
        
        {/* Command line input */}
        <CommandLine onSubmit={handleCommand} />
      </div>
    </div>
  );
};

export default Terminal;
