import React from 'react';
import { ChevronLeft, ChevronRight, Zap, Home, Key, TrendingUp, Settings, Leaf, DollarSign, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'auth', label: 'Authentication/API Key', icon: Key },
  { id: 'energy-futures', label: 'Energy Futures', icon: TrendingUp },
  { id: 'ancillary', label: 'Ancillary', icon: Settings },
  { id: 'rec', label: 'REC', icon: Leaf },
  { id: 'utility-price', label: 'Utility Price', icon: DollarSign },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className={`
      relative bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 
      transition-all duration-300 ease-in-out h-screen flex flex-col
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              EnergyAPI
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 dark:bg-gray-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-gray-700' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                }
              `}
            >
              <IconComponent className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </div>
  );
};