import React, { useState } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  availableLanguages?: string[];
  onLanguageChange?: (language: string) => void;
}

const languageExamples: Record<string, Record<string, string>> = {
  'home': {
    'curl': `curl -X GET "https://api.energy-platform.com/v1/status" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    'python': `import requests

headers = {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.energy-platform.com/v1/status', headers=headers)
data = response.json()`,
    'javascript': `const response = await fetch('https://api.energy-platform.com/v1/status', {
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`,
    'ruby': `require 'net/http'
require 'json'

uri = URI('https://api.energy-platform.com/v1/status')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'
request['Content-Type'] = 'application/json'

response = http.request(request)
data = JSON.parse(response.body)`
  }
};
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  availableLanguages = ['python', 'javascript', 'ruby', 'curl'],
  onLanguageChange,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCopy = async () => {
    const currentCode = getCurrentCode();
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    onLanguageChange?.(lang);
    setIsDropdownOpen(false);
  };

  const getCurrentCode = () => {
    // For now, return the original code. In a real app, this would fetch language-specific examples
    return code;
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between mb-2">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {selectedLanguage}
            <ChevronDown className="w-3 h-3" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 min-w-24">
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className="block w-full text-left px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md transition-colors"
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-gray-800 dark:text-gray-100">
          {getCurrentCode()}
        </code>
      </pre>
    </div>
  );
};