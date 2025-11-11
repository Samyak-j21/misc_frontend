import { Brain, Zap, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import type { Theme, Page } from '../App';

interface SidebarProps {
  theme: Theme;
  toggleTheme: () => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export function Sidebar({ theme, toggleTheme, currentPage, setCurrentPage }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 dark:bg-[#0F0F0F] border-r border-gray-200 dark:border-zinc-800 flex flex-col transition-colors duration-300">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-lg flex items-center justify-center shadow-lg shadow-[#3B82F6]/20">
            <span className="text-white">A</span>
          </div>
          <span className="text-zinc-900 dark:text-white">AceInt.ai</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            onClick={() => setCurrentPage('ai-interviewer')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentPage === 'ai-interviewer'
                ? 'bg-[#3B82F6]/10 text-[#3B82F6] shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800/50 hover:shadow-sm'
            }`}
          >
            <Brain className="w-5 h-5" strokeWidth={1.5} />
            <span>AI Interviewer</span>
          </button>

          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentPage === 'dashboard' || currentPage === 'challenge-list' || currentPage === 'solve'
                ? 'bg-[#3B82F6]/10 text-[#3B82F6] shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800/50 hover:shadow-sm'
            }`}
          >
            <Zap className="w-5 h-5" strokeWidth={1.5} />
            <span>Practice Challenges</span>
          </button>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800 space-y-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800/50 transition-all duration-200 hover:shadow-sm"
        >
          <span>Theme</span>
          <div className="relative">
            {theme === 'light' ? (
              <Moon className="w-5 h-5 animate-in fade-in spin-in-12 duration-300" strokeWidth={1.5} />
            ) : (
              <Sun className="w-5 h-5 animate-in fade-in spin-in-12 duration-300" strokeWidth={1.5} />
            )}
          </div>
        </button>

        {/* Sign In Button */}
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl py-6 shadow-lg shadow-[#3B82F6]/20 hover:shadow-xl hover:shadow-[#3B82F6]/30 hover:scale-[1.02] transition-all duration-200">
          Sign In
        </Button>
      </div>
    </div>
  );
}