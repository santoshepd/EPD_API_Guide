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
  
  const section = apiContent.find(s => s.id === activeSection);

  // Scroll to active section when it changes
  useEffect(() => {
    const sectionElement = sectionRefs.current[activeSection];
    if (sectionElement && contentRef.current) {
      sectionElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeSection]);

  // Set up intersection observer for scroll sync
  useEffect(() => {
    if (!onSectionInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.getAttribute('data-section-id');
            if (sectionId) {
              onSectionInView(sectionId);
            }
          }
        });
      },
      {
        threshold: [0.1, 0.5, 0.9],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    Object.values(sectionRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [onSectionInView]);

  if (!section) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400">Section not found</p>
      </div>
    );
  }

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

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 mb-6 text-gray-700 dark:text-gray-300">
            {currentList.map((item, index) => (
              <li key={index} className="ml-4">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold mb-3 mt-6 text-gray-900 dark:text-white">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        const item = line.substring(2);
        if (item.startsWith('**') && item.includes('**:')) {
          const [bold, rest] = item.split('**:');
          currentList.push(`${bold.substring(2)}: ${rest}`);
        } else {
          currentList.push(item);
        }
      } else if (line.startsWith('```')) {
        flushList();
        const nextLine = lines[index + 1];
        if (nextLine && !nextLine.startsWith('```')) {
          elements.push(
            <div key={index} className="mb-6">
              <CodeBlock
                code={nextLine}
                language="text"
                editable={false}
              />
            </div>
          );
        }
      } else if (line.trim() && !line.startsWith('```') && currentList.length === 0) {
        flushList();
        // Handle inline code
        const processedLine = line.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
        elements.push(
          <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: processedLine }} />
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <div ref={contentRef} className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div 
          className="prose prose-lg max-w-none"
          data-section-id={section.id}
          ref={(el) => {
            if (el) sectionRefs.current[section.id] = el;
          }}
        >
          {renderMarkdown(section.content)}
        </div>

        {section.codeExamples && section.codeExamples.length > 0 && (
          <div className="space-y-6 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Examples
            </h3>
            {section.codeExamples.map((example, index) => {
              const key = `${section.id}-${index}`;
              const selectedLanguage = selectedLanguages[key] || 'python';
              const availableLanguages = Object.keys(example.languages);
              const currentCode = example.languages[selectedLanguage] || example.languages[availableLanguages[0]];
              
              return (
                <CodeBlock
                  key={index}
                  code={currentCode}
                  language={selectedLanguage}
                  availableLanguages={availableLanguages}
                  onLanguageChange={(language) => handleLanguageChange(section.id, index, language)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};