
import React, { useState, useEffect, useRef } from 'react';

interface NanoEditorProps {
  filename: string;
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

const NanoEditor: React.FC<NanoEditorProps> = ({ filename, initialContent, onSave, onCancel }) => {
  const [content, setContent] = useState(initialContent);
  const [isModified, setIsModified] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });

  useEffect(() => {
    // Focus editor when mounted
    if (editorRef.current) {
      editorRef.current.focus();
    }

    // Set up keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+X (exit)
      if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        handleExit();
      }
      // Ctrl+O (save)
      else if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        handleSave();
      }
      // Ctrl+G (help)
      else if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        setHelpVisible(!helpVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, helpVisible]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsModified(true);
    
    // Update cursor position
    const textarea = e.target;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    
    setCursorPosition({ line, col });
  };

  const handleSave = () => {
    onSave(content);
    setIsModified(false);
    setStatusMessage("File saved");
    setTimeout(() => setStatusMessage(null), 2000);
  };

  const handleExit = () => {
    if (isModified) {
      if (window.confirm("Save modified buffer?")) {
        onSave(content);
      }
    }
    onCancel();
  };

  const updateCursorPosition = () => {
    if (!editorRef.current) return;
    
    const textarea = editorRef.current;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    
    setCursorPosition({ line, col });
  };

  return (
    <div className="bg-black/80 rounded overflow-hidden w-full flex flex-col h-[400px] font-mono">
      {/* Nano header */}
      <div className="bg-blue-900 text-white p-1 text-center text-sm">
        GNU nano {filename} {isModified ? "(modified)" : ""}
      </div>
      
      {/* Editor area */}
      <div className="flex-grow relative">
        <textarea
          ref={editorRef}
          value={content}
          onChange={handleContentChange}
          onKeyUp={updateCursorPosition}
          onClick={updateCursorPosition}
          className="w-full h-full bg-black text-white p-2 outline-none resize-none font-mono text-sm"
          spellCheck="false"
          autoComplete="off"
        />
      </div>

      {/* Help overlay */}
      {helpVisible && (
        <div className="absolute inset-0 bg-black/90 z-10 p-4 text-white text-sm">
          <div className="bg-blue-900 p-1 text-center mb-4">
            GNU nano help
          </div>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="text-blue-400">^G</span>
              <span>Get Help</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-400">^O</span>
              <span>WriteOut (Save)</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-400">^X</span>
              <span>Exit</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-400">^K</span>
              <span>Cut Text</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-400">^U</span>
              <span>UnCut Text</span>
            </p>
            <p className="flex justify-between">
              <span className="text-blue-400">^C</span>
              <span>Cur Pos</span>
            </p>
          </div>
          <div className="absolute bottom-4 w-full text-center left-0">
            <button 
              onClick={() => setHelpVisible(false)}
              className="bg-blue-900 px-4 py-1 rounded"
            >
              Close Help
            </button>
          </div>
        </div>
      )}
      
      {/* Status message */}
      {statusMessage && (
        <div className="bg-blue-900 p-1 text-center text-white text-sm">
          {statusMessage}
        </div>
      )}
      
      {/* Nano footer with shortcuts */}
      <div className="bg-blue-900 text-white p-1 flex flex-wrap text-xs space-x-2">
        <div><span className="text-blue-300">^G</span> Help</div>
        <div><span className="text-blue-300">^O</span> Write Out</div>
        <div><span className="text-blue-300">^X</span> Exit</div>
      </div>
      
      {/* Line and column indicator */}
      <div className="bg-blue-900/70 text-white p-1 text-xs text-right">
        line {cursorPosition.line}, col {cursorPosition.col}
      </div>
    </div>
  );
};

export default NanoEditor;
