import React, { useState, useEffect, useRef } from 'react';
import { apiContent } from '../data/content';
import { CodeBlock } from './CodeBlock';

interface ContentProps {
  activeSection: string;
  onSectionInView?: (sectionId: string) => void;
}

export const Content: React.FC<ContentProps> = ({ activeSection, onSectionInView }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<Record<string, string>>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Set up intersection observer for scroll sync
  useEffect(() => {
    if (!onSectionInView) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let activeEntry = null;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeEntry = entry;
          }
        });

        if (activeEntry && activeEntry.intersectionRatio > 0.3) {
          const sectionId = activeEntry.target.getAttribute('data-section-id');
          if (sectionId) {
            onSectionInView(sectionId);
          }
        }
      },
      {
        root: contentRef.current,
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
        rootMargin: '-10% 0px -60% 0px'
      }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach((element) => {
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onSectionInView]);

  // Scroll to active section when it changes (from sidebar click)
  useEffect(() => {
    const sectionElement = sectionRefs.current[activeSection];
    if (sectionElement && contentRef.current) {
      sectionElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeSection]);

  const handleLanguageChange = (sectionId: string, exampleIndex: number, language: string) => {
    const key = `${sectionId}-${exampleIndex}`;
    setSelectedLanguages(prev => ({
      ...prev,
      [key]: language
    }));
  };

  const renderMarkdown = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-gray-700 dark:text-gray-300">
            {currentList.map((item, index) => (
              <li key={index} className="ml-4 leading-relaxed">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (inCodeBlock && codeContent) {
        elements.push(
          <div key={`code-${elements.length}`} className="mb-6">
            <CodeBlock
              code={codeContent.trim()}
              language={codeLanguage || 'text'}
              editable={false}
            />
          </div>
        );
        codeContent = '';
        codeLanguage = '';
        inCodeBlock = false;
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
        } else {
          flushList();
          inCodeBlock = true;
          codeLanguage = line.substring(3).trim();
        }
      } else if (inCodeBlock) {
        codeContent += line + '\n';
      } else if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-4xl font-bold mb-8 text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mb-6 mt-10 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        const item = line.substring(2);
        if (item.startsWith('**') && item.includes('**:')) {
          const [bold, rest] = item.split('**:');
          currentList.push(
            `<span class="font-semibold text-gray-900 dark:text-white">${bold.substring(2)}</span>: ${rest}`
          );
        } else {
          currentList.push(item);
        }
      } else if (line.trim() && currentList.length === 0) {
        flushList();
        // Handle inline code and links
        let processedLine = line
          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">$1</code>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
        
        elements.push(
          <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg" 
             dangerouslySetInnerHTML={{ __html: processedLine }} />
        );
      }
    });

    flushList();
    flushCodeBlock();
    return elements;
  };

  return (
    <div ref={contentRef} className="h-full overflow-y-auto scroll-smooth">
      <div className="max-w-5xl mx-auto">
        {apiContent.map((section) => (
          <div
            key={section.id}
            className="min-h-screen p-8"
            data-section-id={section.id}
            ref={(el) => {
              if (el) sectionRefs.current[section.id] = el;
            }}
          >
            <div className="prose prose-lg max-w-none">
              {renderMarkdown(section.content)}
            </div>

            {section.codeExamples && section.codeExamples.length > 0 && (
              <div className="space-y-8 mt-12">
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{ }</span>
                    </div>
                    Code Examples
                  </h3>
                  {section.codeExamples.map((example, index) => {
                    const key = `${section.id}-${index}`;
                    const selectedLanguage = selectedLanguages[key] || 'python';
                    const availableLanguages = Object.keys(example.languages);
                    const currentCode = example.languages[selectedLanguage] || example.languages[availableLanguages[0]];
                    
                    return (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg">
                        <CodeBlock
                          code={currentCode}
                          language={selectedLanguage}
                          availableLanguages={availableLanguages}
                          onLanguageChange={(language) => handleLanguageChange(section.id, index, language)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};