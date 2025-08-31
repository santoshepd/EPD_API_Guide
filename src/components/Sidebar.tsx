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
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
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
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-sm' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                }
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <IconComponent className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              {!isCollapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 border border-gray-200 dark:border-gray-700"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};