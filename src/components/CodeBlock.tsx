import React, { useState } from 'react';
import { Copy, Check, ChevronDown, Code2 } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  availableLanguages?: string[];
  onLanguageChange?: (language: string) => void;
  editable?: boolean;
}

const languageLabels: Record<string, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  ruby: 'Ruby',
  curl: 'cURL'
};

const languageColors: Record<string, string> = {
  python: 'from-blue-500 to-yellow-500',
  javascript: 'from-yellow-400 to-orange-500',
  ruby: 'from-red-500 to-pink-500',
  curl: 'from-green-500 to-teal-500'
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  availableLanguages = ['python', 'javascript', 'ruby', 'curl'],
  onLanguageChange,
  editable = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLanguageSelect = (lang: string) => {
    onLanguageChange?.(lang);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 bg-gradient-to-r ${languageColors[language] || 'from-gray-500 to-gray-600'} rounded-md flex items-center justify-center`}>
            <Code2 className="w-3 h-3 text-white" />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
            >
              {languageLabels[language] || language.toUpperCase()}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-20 min-w-32 overflow-hidden">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`
                      block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200
                      ${lang === language 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 bg-gradient-to-r ${languageColors[lang] || 'from-gray-500 to-gray-600'} rounded-sm`} />
                      {languageLabels[lang] || lang.toUpperCase()}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <pre className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-950 dark:to-black border border-gray-300 dark:border-gray-700 rounded-xl p-6 overflow-x-auto shadow-lg">
          <code className="text-sm font-mono text-gray-100 leading-relaxed">
            {code}
          </code>
        </pre>
        
        {/* Decorative gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 rounded-xl -z-10 blur-sm opacity-50" />
      </div>
    </div>
  );
};