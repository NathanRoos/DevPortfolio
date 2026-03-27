"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "success" | "error" | "info";
  delay?: number;
}

interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  className?: string;
  typingSpeed?: number;
  onComplete?: () => void;
}

export function Terminal({
  lines,
  title = "terminal",
  className,
  typingSpeed = 30,
  onComplete,
}: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; type: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      onComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];
    const delay = currentLine.delay || 0;

    if (currentLine.type !== "command") {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [
          ...prev,
          { text: currentLine.text, type: currentLine.type },
        ]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, delay || 100);
      return () => clearTimeout(timeout);
    }

    if (currentCharIndex === 0 && delay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentCharIndex(1);
      }, delay);
      return () => clearTimeout(delayTimeout);
    }

    if (currentCharIndex <= currentLine.text.length) {
      const timeout = setTimeout(() => {
        if (currentCharIndex === 0) {
          setDisplayedLines((prev) => [
            ...prev,
            { text: "", type: "command" },
          ]);
          setCurrentCharIndex(1);
        } else {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            newLines[newLines.length - 1] = {
              text: currentLine.text.slice(0, currentCharIndex),
              type: "command",
            };
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, onComplete]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "command": return "text-green-400";
      case "success": return "text-emerald-400";
      case "error": return "text-red-400";
      case "info": return "text-primary-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className={cn("w-full rounded-xl border border-white/10 bg-dark-950 shadow-2xl overflow-hidden", className)}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-dark-900/80 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-500 font-mono ml-2">{title}</span>
      </div>
      {/* Terminal content */}
      <div ref={terminalRef} className="p-4 font-mono text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
        {displayedLines.map((line, i) => (
          <div key={i} className={cn("leading-relaxed", getLineColor(line.type))}>
            {line.type === "command" ? (
              <span>
                <span className="text-primary-500">$</span>{" "}
                {line.text}
                {i === displayedLines.length - 1 && isTyping && currentLineIndex < lines.length && lines[currentLineIndex]?.type === "command" ? (
                  <span className="inline-block w-2 h-4 bg-primary-500 ml-0.5 animate-pulse" />
                ) : null}
              </span>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}
        {isTyping && displayedLines.length > 0 && displayedLines[displayedLines.length - 1]?.type !== "command" && (
          <div className="text-green-400">
            <span className="text-primary-500">$</span>{" "}
            <span className="inline-block w-2 h-4 bg-primary-500 ml-0.5 animate-pulse" />
          </div>
        )}
        {!isTyping && (
          <div className="text-green-400">
            <span className="text-primary-500">$</span>{" "}
            <span className="inline-block w-2 h-4 bg-primary-500 ml-0.5 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
