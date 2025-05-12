
import React, { useState, useRef, useEffect } from 'react';
import { availableCommands } from '../data/portfolioData';

interface CommandLineProps {
  onSubmit: (command: string) => void;
}

const CommandLine: React.FC<CommandLineProps> = ({ onSubmit }) => {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTabCompletion = () => {
    const commandParts = command.trim().split(" ");
    const lastWord = commandParts[commandParts.length - 1].toLowerCase();
    
    // Available commands for tab completion
    const allCommands = [
      ...Object.keys(availableCommands),
      'resume'
    ];
    
    // Filter available commands that start with the current input
    const possibleCommands = allCommands
      .filter(cmd => cmd.toLowerCase().startsWith(lastWord));
    
    if (possibleCommands.length === 1) {
      // If only one suggestion, complete it
      if (commandParts.length === 1) {
        setCommand(possibleCommands[0]);
      } else {
        commandParts.pop();
        setCommand(`${commandParts.join(" ")} ${possibleCommands[0]}`);
      }
      setSuggestionsVisible(false);
    } else if (possibleCommands.length > 1) {
      // Show multiple suggestions
      setTabSuggestions(possibleCommands);
      setSuggestionsVisible(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle up and down arrows for command history
    if (e.key === "ArrowUp" && commandHistory.length > 0) {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setCommand(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown" && historyIndex >= 0) {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCommand(newIndex >= 0 ? commandHistory[newIndex] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset tab suggestions
    setSuggestionsVisible(false);
    
    if (command.trim() !== "") {
      // Add to command history (most recent first)
      setCommandHistory([command, ...commandHistory]);
    }
    
    // Process the command
    onSubmit(command);
    
    // Reset the input and history index
    setCommand("");
    setHistoryIndex(-1);

    // Refocus the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCommand(suggestion);
    setSuggestionsVisible(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-command-input">
      <form onSubmit={handleSubmit} className="flex items-center text-white group bg-transparent p-1 rounded">
        <span className="text-blue-400 flex ml-1">
          <span className="text-blue-400 font-bold">└─$</span>
          <span className="text-white ml-1 mr-1"></span>
        </span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => {
              setCommand(e.target.value);
              setCursorPosition(e.target.selectionStart || 0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none border-none text-white caret-blue-400 focus:border-none focus:outline-none focus:ring-0"
            autoFocus
            autoComplete="off"
            spellCheck="false"
            onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
          />
          
          {/* Tab suggestions */}
          {suggestionsVisible && tabSuggestions.length > 0 && (
            <div className="absolute left-0 bottom-8 bg-terminal-darkGray/95 border border-blue-500/30 rounded p-1 z-10">
              <p className="text-xs text-blue-400 mb-1">Tab completions:</p>
              <div className="flex flex-wrap gap-1 max-w-xs">
                {tabSuggestions.map((suggestion) => (
                  <span
                    key={suggestion}
                    className="px-2 py-0.5 text-sm bg-blue-900/20 text-blue-300 rounded cursor-pointer hover:bg-blue-900/40"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <span className="animate-blink text-blue-400 ml-0.5 group-focus-within:opacity-100 opacity-70">▊</span>
      </form>
    </div>
  );
};

export default CommandLine;
