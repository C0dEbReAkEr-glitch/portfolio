
import { useState } from "react";
import { availableCommands, portfolioData } from "../data/portfolioData";

type OutputType = {
  id: number;
  type: "command" | "response" | "error" | "ascii";
  content: React.ReactNode;
};

// Easter eggs
const EASTER_EGGS = {
  'matrix': () => `Wake up`,
  'coffee': () => `☕ Coffee, the programmer's fuel!`,
  'konami': () => `↑↑↓↓←→←→BA - You've unlocked 30 lives!`,
  'sudo': () => `This incident will be reported.`,
  'hack': () => `ACCESS DENIED: Security protocols activated.`,
  'hello': () => `Hello, Sir! How predictable.`,
  '42': () => `Yes, that is the answer to life, the universe, and everything.`,
  'secret': () => `Shh... there are no secrets here... or are there?`
};

export const useCommandProcessor = () => {
  const [commandHistory, setCommandHistory] = useState<OutputType[]>([
    {
      id: 0,
      type: "ascii",
      content: <pre className="text-terminal-blue">{portfolioData.ascii}</pre>
    },
    {
      id: 1,
      type: "response",
      content: (
        <div className="mb-2">
          <p className="text-blue-400">
            {portfolioData.name}
          </p>
          <p className="text-terminal-white">
            Type <span className="text-terminal-blue font-bold">help</span> to see available commands.
          </p>
        </div>
      ),
    },
  ]);
  const [commandId, setCommandId] = useState(2);

  const processCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    const commandParts = trimmedCommand.split(" ");
    const mainCommand = commandParts[0];
    
    // Add the command to history
    addToHistory("command", `$ ${command}`);

    // Check for easter eggs first
    const easterEgg = checkEasterEggs(trimmedCommand);
    if (easterEgg) {
      addToHistory("response", easterEgg);
      return;
    }

    // Process the command
    switch (mainCommand) {
      case "help":
        showHelp();
        break;
      case "about":
        showAbout();
        break;
      case "skills":
        showSkills();
        break;
      case "experience":
        showExperience();
        break;
      case "projects":
        showProjects();
        break;
      case "contact":
        showContact();
        break;
      case "clear":
        clearTerminal();
        break;
      case "resume":
        downloadResume();
        break;
      case "":
        // Just add a blank line for empty command
        break;
      default:
        showError(mainCommand);
    }
  };

  const checkEasterEggs = (command: string): string | null => {
    // Check if command matches any easter egg
    const eggKey = Object.keys(EASTER_EGGS).find(key => command.includes(key));
    if (eggKey) {
      return EASTER_EGGS[eggKey as keyof typeof EASTER_EGGS]();
    }
    
    // Konami code easter egg
    if (command === 'up up down down left right left right b a') {
      return EASTER_EGGS.konami();
    }
    
    return null;
  };

  // New resume download function
  const downloadResume = () => {
    // Create a simulated download delay
    addToHistory("response", (
      <div className="flex items-center my-2">
        <div className="loading-dots flex space-x-1 mr-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-100"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-200"></div>
        </div>
        <span className="text-blue-400 text-sm font-mono">Preparing resume download...</span>
      </div>
    ));
    
    // Use timeout to simulate download preparation
    setTimeout(() => {
      // Create a blob with resume content
      const resumeContent = `${portfolioData.name} - Cybersecurity Professional Resume\n\n` +
        `Contact: ${portfolioData.contact.email}\n\n` +
        `SKILLS\n${portfolioData.skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}\n\n` +
        `EXPERIENCE\n${portfolioData.experience.map(e => `${e.title} at ${e.company} (${e.period})\n${e.description}`).join('\n\n')}\n\n` +
        `PROJECTS\n${portfolioData.projects.map(p => `${p.name}: ${p.description}`).join('\n\n')}`;
      
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a link element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${portfolioData.name.replace(/\s/g, '_')}_Resume.txt`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      // Add confirmation to terminal
      addToHistory("response", (
        <div className="bg-green-950/30 border border-green-500/30 p-3 rounded text-green-400">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Resume download initiated: {portfolioData.name.replace(/\s/g, '_')}_Resume.txt
          </p>
        </div>
      ));
    }, 1500);
  };

  const addToHistory = (type: OutputType["type"], content: React.ReactNode) => {
    setCommandHistory((prev) => [
      ...prev,
      { id: commandId, type, content },
    ]);
    setCommandId((prevId) => prevId + 1);
  };

  const clearTerminal = () => {
    setCommandHistory([]);
  };

  const showHelp = () => {
    addToHistory("response", (
      <div className="mb-2 bg-black/60 p-3 rounded">
        <p className="text-terminal-blue font-bold mb-2 flex items-center">
          <span className="mr-1">▶</span> Available commands:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4">
          {Object.entries(availableCommands).map(([cmd, info]) => (
            <div key={cmd} className="flex items-center hover:bg-terminal-darkGray px-2 py-1 rounded transition-colors">
              <span className="text-blue-400 font-bold w-24">{cmd}</span>
              <span className="text-terminal-white">{info.description}</span>
            </div>
          ))}
          <div className="flex items-center hover:bg-terminal-darkGray px-2 py-1 rounded transition-colors">
            <span className="text-blue-400 font-bold w-24">resume</span>
            <span className="text-terminal-white">Download my resume</span>
          </div>
        </div>
        <p className="mt-2 text-blue-300 text-sm">
          <span className="text-blue-400 font-bold">Tip:</span> Try using tab completion and arrow keys for history.
          There might also be some easter eggs hidden in the terminal...
        </p>
      </div>
    ));
  };

  const showAbout = () => {
    addToHistory("response", (
      <div className="mb-2 bg-black/60 p-3 rounded">
        <p className="text-terminal-blue font-bold mb-2 flex items-center">
          <span className="mr-1">▶</span> ABOUT
        </p>
        <p className="text-blue-500 font-bold text-xl mb-2">{portfolioData.name} | {portfolioData.title}</p>
        <div className="text-terminal-white whitespace-pre-line bg-terminal-darkGray/70 p-3 rounded">
          {portfolioData.about}
        </div>
      </div>
    ));
  };

  const showSkills = () => {
    addToHistory("response", (
      <div className="mb-2 bg-black/60 p-3 rounded">
        <p className="text-terminal-blue font-bold mb-2 flex items-center">
          <span className="mr-1">▶</span> SKILLS
        </p>
        {portfolioData.skills.map((skillGroup, index) => (
          <div key={index} className="mb-3 bg-terminal-darkGray/70 p-3 rounded">
            <p className="text-blue-400 font-bold mb-2">{skillGroup.category}</p>
            <div className="flex flex-wrap gap-1">
              {skillGroup.items.map((skill, i) => (
                <span key={i} className="text-terminal-white bg-terminal-darkGray px-3 py-1 rounded-full mb-1 mr-1 border border-terminal-blue/30 hover:border-terminal-blue transition-colors duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  const showExperience = () => {
    addToHistory("response", (
      <div className="mb-2 bg-black/60 p-3 rounded">
        <p className="text-terminal-blue font-bold mb-2 flex items-center">
          <span className="mr-1">▶</span> EXPERIENCE
        </p>
        {portfolioData.experience.map((exp, index) => (
          <div key={index} className="mb-3 bg-terminal-darkGray/70 p-3 rounded hover:border-terminal-blue/40 transition-colors">
            <p className="text-blue-400 font-bold">{exp.title} | {exp.company}</p>
            <p className="text-terminal-blue text-sm mb-2">{exp.period}</p>
            <p className="text-terminal-white">{exp.description}</p>
          </div>
        ))}
      </div>
    ));
  };

  const showProjects = () => {
    addToHistory("response", (
      <div className="mb-2 bg-black/60 p-3 rounded">
        <p className="text-terminal-blue font-bold mb-2 flex items-center">
          <span className="mr-1">▶</span> PROJECTS
        </p>
        {portfolioData.projects.map((project, index) => (
          <div 
            key={index} 
            className={`mb-3 ${index === 0 ? 'bg-gradient-to-r from-blue-900/30 to-terminal-darkGray/70 border-blue-500' : 'bg-terminal-darkGray/70'} p-3 rounded hover:border-terminal-blue/40 transition-colors`}
          >
            <div className="flex justify-between items-start mb-1">
              <p className={`font-bold ${index === 0 ? 'text-blue-400 text-lg' : 'text-blue-400'}`}>
                {index === 0 && <span className="inline-block animate-pulse mr-2">★</span>}
                {project.name}
              </p>
              {project.github && (
                <a 
                  href={project.github.startsWith('http') ? project.github : `https://${project.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-terminal-blue text-sm bg-terminal-darkGray px-2 py-0.5 rounded hover:bg-black flex items-center border border-terminal-blue/40"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mr-1"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  View Code
                </a>
              )}
            </div>
            <p className="text-terminal-white mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs text-terminal-bg bg-terminal-blue px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  const showContact = () => {
    addToHistory("response", (
      <div className="mb-2 bg-black/60 p-3 rounded">
        <p className="text-terminal-blue font-bold mb-2 flex items-center">
          <span className="mr-1">▶</span> CONTACT
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center bg-terminal-darkGray/70 p-3 rounded hover:border-terminal-blue/40 transition-colors">
            <span className="text-blue-400 mr-2">Email:</span>
            <a href={`mailto:${portfolioData.contact.email}`} className="text-terminal-blue underline hover:text-terminal-white">
              {portfolioData.contact.email}
            </a>
          </div>
          <div className="flex items-center bg-terminal-darkGray/70 p-3 rounded hover:border-terminal-blue/40 transition-colors">
            <span className="text-blue-400 mr-2">LinkedIn:</span>
            <a href={`https://${portfolioData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" 
               className="text-terminal-blue underline hover:text-terminal-white">
              {portfolioData.contact.linkedin}
            </a>
          </div>
          <div className="flex items-center bg-terminal-darkGray/70 p-3 rounded hover:border-terminal-blue/40 transition-colors">
            <span className="text-blue-400 mr-2">GitHub:</span>
            <a href={`https://${portfolioData.contact.github}`} target="_blank" rel="noopener noreferrer" 
               className="text-terminal-blue underline hover:text-terminal-white">
              {portfolioData.contact.github}
            </a>
          </div>
          <div className="flex items-center bg-terminal-darkGray/70 p-3 rounded hover:border-terminal-blue/40 transition-colors">
            <span className="text-blue-400 mr-2">Twitter:</span>
            <a href={`https://twitter.com/${portfolioData.contact.twitter.substring(1)}`} target="_blank" rel="noopener noreferrer" 
               className="text-terminal-blue underline hover:text-terminal-white">
              {portfolioData.contact.twitter}
            </a>
          </div>
        </div>
      </div>
    ));
  };

  const showError = (cmd: string) => {
    addToHistory("error", (
      <div className="text-blue-300 p-2 mb-2 bg-terminal-darkGray/50 rounded">
        Command not found: <span className="font-bold">{cmd}</span>
        <br />
        Type <span className="text-terminal-blue font-bold">'help'</span> to see available commands.
      </div>
    ));
  };

  return {
    commandHistory,
    processCommand,
    addSystemResponse: addToHistory
  };
};
