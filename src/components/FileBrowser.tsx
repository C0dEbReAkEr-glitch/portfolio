
import React, { useState } from 'react';
import { useCommandProcessor } from '../hooks/useCommandProcessor';

type FileSystemItem = {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileSystemItem[];
};

// Sample file system structure
const fileSystem: FileSystemItem[] = [
  {
    name: 'home',
    type: 'directory',
    children: [
      {
        name: 'projects',
        type: 'directory',
        children: [
          { name: 'project1.md', type: 'file', content: '# Project 1\n\nThis is a sample project file.' },
          { name: 'project2.md', type: 'file', content: '# Project 2\n\nAnother sample project.' },
        ]
      },
      {
        name: 'resume',
        type: 'directory',
        children: [
          { name: 'resume.md', type: 'file', content: '# Resume\n\nSkills: Cybersecurity, Networking, Pentesting' },
          { name: 'certifications.md', type: 'file', content: '# Certifications\n\n- CISSP\n- CEH\n- OSCP' },
        ]
      },
      { name: 'README.md', type: 'file', content: '# Welcome\n\nThis is my portfolio terminal.' },
    ]
  }
];

const FileBrowser: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string[]>(['home']);
  const [selectedFile, setSelectedFile] = useState<FileSystemItem | null>(null);
  const { addSystemResponse } = useCommandProcessor();

  // Get the current directory based on path
  const getCurrentDirectory = (): FileSystemItem | null => {
    let current: FileSystemItem | undefined = fileSystem.find(item => item.name === currentPath[0]);
    
    for (let i = 1; i < currentPath.length; i++) {
      if (!current || !current.children) return null;
      current = current.children.find(item => item.name === currentPath[i]);
    }
    
    return current || null;
  };

  const handleItemClick = (item: FileSystemItem) => {
    if (item.type === 'directory') {
      setCurrentPath([...currentPath, item.name]);
      setSelectedFile(null);
    } else {
      setSelectedFile(item);
      
      // Output file content to terminal
      if (item.content) {
        addSystemResponse('response', (
          <div className="bg-black/60 p-3 rounded">
            <p className="text-blue-400 font-bold mb-2">File: {item.name}</p>
            <pre className="text-terminal-white whitespace-pre-wrap bg-terminal-darkGray/70 p-3 rounded">
              {item.content}
            </pre>
          </div>
        ));
      }
    }
  };

  const goBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const currentDir = getCurrentDirectory();

  return (
    <div className="bg-black/60 p-3 rounded">
      <div className="flex items-center mb-2">
        <button 
          onClick={goBack} 
          disabled={currentPath.length <= 1}
          className="text-blue-400 mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <p className="text-blue-400 font-mono">/{currentPath.join('/')}</p>
      </div>
      
      {currentDir && currentDir.children && (
        <div className="grid grid-cols-2 gap-1">
          {currentDir.children.map((item) => (
            <div 
              key={item.name}
              onClick={() => handleItemClick(item)}
              className="flex items-center p-2 hover:bg-terminal-darkGray rounded cursor-pointer"
            >
              <span className={`mr-2 ${item.type === 'directory' ? 'text-blue-400' : 'text-white'}`}>
                {item.type === 'directory' ? '📁' : '📄'}
              </span>
              <span className={`${item.type === 'directory' ? 'text-blue-400' : 'text-white'}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileBrowser;
