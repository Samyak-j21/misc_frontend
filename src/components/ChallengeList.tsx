import { useState, Fragment } from 'react';
import { ArrowLeft, Search, ChevronDown, RotateCcw, Check, Edit3, Star, CheckSquare, Square, Lock, Crown, X, Calendar, Trophy, Target, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CircularProgress } from './CircularProgress';
import type { Theme } from '../App';
import { challengeProblems, challengeInfo, type Problem } from './problemsData';

interface DayGroup {
  day: number;
  problems: Problem[];
  completed: boolean;
  isLocked: boolean;
}

interface ChallengeListProps {
  theme: Theme;
  challengeId: string;
  onBackToDashboard: () => void;
  onProblemSolve: (problem: Problem) => void;
  completedProblems: Set<string>;
  onProblemComplete: (problemId: string) => void;
  isSubscribed: boolean;
  onSubscribe: () => void;
}

export function ChallengeList({ 
  theme, 
  challengeId, 
  onBackToDashboard, 
  onProblemSolve,
  completedProblems,
  onProblemComplete,
  isSubscribed,
  onSubscribe
}: ChallengeListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [patternFilter, setPatternFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('C++');
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [starredProblems, setStarredProblems] = useState<Set<string>>(new Set());
  const [problemNotes, setProblemNotes] = useState<Record<string, string>>({});
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');

  const problems = challengeProblems[challengeId] || [];
  const info = challengeInfo[challengeId];
  const totalDays = info?.days || 0;
  const totalProblems = info?.totalProblems || 0;
  const daysCompleted = completedDays.size;

  // Update problem status based on completedProblems
  const problemsWithStatus = problems.map(p => ({
    ...p,
    status: completedProblems.has(p.id) ? 'solved' as const : p.status,
    starred: starredProblems.has(p.id)
  }));

  const solvedCount = problemsWithStatus.filter(p => p.status === 'solved').length;
  const easySolved = problemsWithStatus.filter(p => p.status === 'solved' && p.difficulty === 'Easy').length;
  const mediumSolved = problemsWithStatus.filter(p => p.status === 'solved' && p.difficulty === 'Medium').length;
  const hardSolved = problemsWithStatus.filter(p => p.status === 'solved' && p.difficulty === 'Hard').length;

  const easyTotal = problemsWithStatus.filter(p => p.difficulty === 'Easy').length;
  const mediumTotal = problemsWithStatus.filter(p => p.difficulty === 'Medium').length;
  const hardTotal = problemsWithStatus.filter(p => p.difficulty === 'Hard').length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 dark:text-green-500 bg-green-500/10';
      case 'Medium': return 'text-orange-600 dark:text-orange-500 bg-orange-500/10';
      case 'Hard': return 'text-red-600 dark:text-red-500 bg-red-500/10';
      default: return '';
    }
  };

  const toggleDayCompletion = (day: number) => {
    const newCompletedDays = new Set(completedDays);
    if (newCompletedDays.has(day)) {
      newCompletedDays.delete(day);
    } else {
      newCompletedDays.add(day);
    }
    setCompletedDays(newCompletedDays);
  };

  const toggleStar = (problemId: string) => {
    const newStarred = new Set(starredProblems);
    if (newStarred.has(problemId)) {
      newStarred.delete(problemId);
    } else {
      newStarred.add(problemId);
    }
    setStarredProblems(newStarred);
  };

  const handleProblemClick = (problem: Problem) => {
    // Mark as completed when clicked
    onProblemComplete(problem.id);
    onProblemSolve(problem);
  };

  // Group problems by day
  const dayGroups: DayGroup[] = [];
  const maxDay = Math.max(...problemsWithStatus.map(p => p.day));
  
  for (let day = 1; day <= maxDay; day++) {
    const dayProblems = problemsWithStatus.filter(p => p.day === day);
    if (dayProblems.length > 0) {
      // Day 1 is always unlocked, rest are locked unless subscribed
      const isLocked = day > 1 && !isSubscribed;
      
      dayGroups.push({
        day,
        problems: dayProblems,
        completed: completedDays.has(day),
        isLocked
      });
    }
  }

  // Filter by selected day
  let filteredDayGroups = dayGroups;
  if (selectedDay !== 'all') {
    filteredDayGroups = dayGroups.filter(dg => dg.day === selectedDay);
  }

  // Apply other filters
  filteredDayGroups = filteredDayGroups.map(dayGroup => ({
    ...dayGroup,
    problems: dayGroup.problems.filter(problem => {
      if (searchQuery && !problem.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (statusFilter !== 'all' && problem.status !== statusFilter) return false;
      if (difficultyFilter !== 'all' && problem.difficulty.toLowerCase() !== difficultyFilter) return false;
      if (patternFilter !== 'all' && problem.pattern.toLowerCase() !== patternFilter) return false;
      if (showStarredOnly && !problem.starred) return false;
      return true;
    })
  })).filter(dayGroup => dayGroup.problems.length > 0);

  return (
    <div className="min-h-full animate-in fade-in duration-500">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-white to-zinc-50 dark:from-zinc-900/80 dark:to-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 px-8 py-8">
        <div className="max-w-[1600px] mx-auto">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-[#3B82F6] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" strokeWidth={2} />
            Back to Challenges
          </button>
          
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-zinc-900 dark:text-white">
                  {info?.name || 'Challenge'} Questions
                </h1>
                {!isSubscribed && (
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-full text-sm flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" strokeWidth={2} />
                    Free Preview
                  </span>
                )}
              </div>
              
              {/* Stats Row */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#3B82F6]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Days</p>
                    <p className="text-zinc-900 dark:text-white">{totalDays}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600 dark:text-purple-500" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Problems</p>
                    <p className="text-zinc-900 dark:text-white">{totalProblems}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-green-600 dark:text-green-500" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Solved</p>
                    <p className="text-zinc-900 dark:text-white">{solvedCount}/{totalProblems}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-500" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Days Done</p>
                    <p className="text-zinc-900 dark:text-white">{daysCompleted}/{totalDays}</p>
                  </div>
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400">
                {!isSubscribed ? (
                  <>Day 1 is unlocked. <button onClick={onSubscribe} className="text-[#3B82F6] hover:underline">Subscribe</button> to unlock all {totalDays} days!</>
                ) : (
                  <>All {totalDays} days are unlocked. Keep going! 🚀</>
                )}
              </p>
            </div>
            
            {!isSubscribed && (
              <Button
                onClick={onSubscribe}
                className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white rounded-xl px-6 py-3 shadow-lg hover:shadow-xl hover:shadow-[#3B82F6]/30 transition-all duration-300 hover:scale-105 flex-shrink-0"
              >
                <Crown className="w-5 h-5 mr-2" strokeWidth={2} />
                Unlock All Days
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          
          {/* Progress Overview Card */}
          <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between gap-12">
                {/* Left: Description */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                        <Target className="w-4 h-4 text-[#3B82F6]" strokeWidth={2} />
                      </div>
                      Challenge Overview
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Master coding interviews with our carefully curated {totalDays}-day challenge program. 
                      Each day features 2 handpicked problems designed to strengthen your problem-solving skills 
                      and prepare you for technical interviews at top tech companies.
                    </p>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Overall Progress</span>
                        <span className="text-sm text-zinc-900 dark:text-white">{solvedCount}/{totalProblems}</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-full transition-all duration-500"
                          style={{ width: `${(solvedCount / totalProblems) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-green-600 dark:text-green-500">Easy</span>
                          <span className="text-xs text-zinc-900 dark:text-white">{easySolved}/{easyTotal}</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{ width: `${(easySolved / easyTotal) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-orange-600 dark:text-orange-500">Medium</span>
                          <span className="text-xs text-zinc-900 dark:text-white">{mediumSolved}/{mediumTotal}</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-orange-500 rounded-full transition-all duration-500"
                            style={{ width: `${(mediumSolved / mediumTotal) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-red-600 dark:text-red-500">Hard</span>
                          <span className="text-xs text-zinc-900 dark:text-white">{hardSolved}/{hardTotal}</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 rounded-full transition-all duration-500"
                            style={{ width: `${(hardSolved / hardTotal) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Circular Progress */}
                <div className="flex-shrink-0">
                  <CircularProgress
                    easySolved={easySolved}
                    easyTotal={easyTotal}
                    mediumSolved={mediumSolved}
                    mediumTotal={mediumTotal}
                    hardSolved={hardSolved}
                    hardTotal={hardTotal}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Day Selector & Filters */}
          <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg">
            <div className="p-6">
              {/* Day Selector Dropdown */}
              <div className="mb-6">
                <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 block">Select Day</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
                >
                  <option value="all">All Days ({totalDays} days)</option>
                  {dayGroups.map((dg) => (
                    <option key={dg.day} value={dg.day}>
                      Day {dg.day} {dg.isLocked ? '🔒' : ''} {dg.completed ? '✓' : ''} ({dg.problems.length} problems)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-900 dark:text-white">Filters</h3>
                <button
                  onClick={() => setFiltersExpanded(!filtersExpanded)}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-[#3B82F6] transition-all duration-200 hover:scale-110"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${filtersExpanded ? '' : 'rotate-180'}`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {filtersExpanded && (
                <div className="space-y-4 animate-in slide-in-from-top duration-300">
                  {/* First Row */}
                  <div className="grid grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="relative group">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#3B82F6] transition-colors" strokeWidth={2} />
                      <Input
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-[#3B82F6] transition-all duration-200"
                      />
                    </div>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="solved">Solved</option>
                      <option value="attempted">Attempted</option>
                      <option value="unsolved">Unsolved</option>
                    </select>

                    {/* Difficulty Filter */}
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
                    >
                      <option value="all">All Difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>

                    {/* Pattern Filter */}
                    <select
                      value={patternFilter}
                      onChange={(e) => setPatternFilter(e.target.value)}
                      className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
                    >
                      <option value="all">All Patterns</option>
                      <option value="array">Array</option>
                      <option value="string">String</option>
                      <option value="tree">Tree</option>
                      <option value="graph">Graph</option>
                      <option value="dynamic programming">Dynamic Programming</option>
                      <option value="linked list">Linked List</option>
                      <option value="stack">Stack</option>
                      <option value="heap">Heap</option>
                      <option value="backtracking">Backtracking</option>
                      <option value="binary search">Binary Search</option>
                      <option value="interval">Interval</option>
                      <option value="sliding window">Sliding Window</option>
                    </select>

                    {/* Language Filter */}
                    <select
                      value={languageFilter}
                      onChange={(e) => setLanguageFilter(e.target.value)}
                      className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
                    >
                      <option value="C++">C++</option>
                      <option value="Java">Java</option>
                      <option value="Python">Python</option>
                      <option value="JavaScript">JavaScript</option>
                    </select>
                  </div>

                  {/* Second Row */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowStarredOnly(!showStarredOnly)}
                      className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                        showStarredOnly
                          ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      <Star className={`w-4 h-4 inline mr-2 ${showStarredOnly ? 'fill-current' : ''}`} strokeWidth={2} />
                      Starred Only
                    </button>

                    <Button
                      variant="outline"
                      className="rounded-xl border-zinc-200 dark:border-zinc-700 hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all duration-200"
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                        setDifficultyFilter('all');
                        setPatternFilter('all');
                        setShowStarredOnly(false);
                        setSelectedDay('all');
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" strokeWidth={2} />
                      Reset All
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Problems Table */}
          <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-800/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" strokeWidth={2} />
                        Day
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" strokeWidth={2} />
                        Problem
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm text-zinc-600 dark:text-zinc-400">Pattern</th>
                    <th className="px-6 py-4 text-left text-sm text-zinc-600 dark:text-zinc-400">Note</th>
                    <th className="px-6 py-4 text-left text-sm text-zinc-600 dark:text-zinc-400">
                      <Star className="w-4 h-4" strokeWidth={2} />
                    </th>
                    <th className="px-6 py-4 text-left text-sm text-zinc-600 dark:text-zinc-400">Difficulty</th>
                    <th className="px-6 py-4 text-right text-sm text-zinc-600 dark:text-zinc-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                  {filteredDayGroups.map((dayGroup, dayIndex) => (
                    <Fragment key={`day-${dayGroup.day}`}>
                      {dayGroup.problems.map((problem, problemIndex) => (
                        <tr
                          key={problem.id}
                          className={`transition-all duration-200 ${
                            dayGroup.isLocked 
                              ? 'opacity-50 bg-zinc-50/50 dark:bg-zinc-800/10' 
                              : 'hover:bg-gradient-to-r hover:from-[#3B82F6]/5 hover:to-transparent dark:hover:from-[#3B82F6]/10'
                          } animate-in fade-in slide-in-from-bottom`}
                          style={{ animationDelay: `${(dayIndex * 2 + problemIndex) * 20}ms`, animationDuration: '400ms' }}
                        >
                          {/* Day Column */}
                          <td className="px-6 py-4">
                            {problemIndex === 0 ? (
                              <div className="flex items-center gap-2">
                                {dayGroup.isLocked ? (
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                    <Lock className="w-4 h-4 text-zinc-400" strokeWidth={2} />
                                    <span className="text-sm text-zinc-500 dark:text-zinc-500">
                                      Day {dayGroup.day}
                                    </span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => toggleDayCompletion(dayGroup.day)}
                                    className="group flex items-center gap-2 px-3 py-1.5 bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10 dark:bg-[#3B82F6]/10 dark:hover:bg-[#3B82F6]/20 rounded-lg transition-all duration-200"
                                  >
                                    {dayGroup.completed ? (
                                      <CheckSquare className="w-4 h-4 text-[#3B82F6] group-hover:scale-110 transition-transform" strokeWidth={2} />
                                    ) : (
                                      <Square className="w-4 h-4 text-zinc-400 group-hover:text-[#3B82F6] group-hover:scale-110 transition-all" strokeWidth={2} />
                                    )}
                                    <span className={`text-sm ${dayGroup.completed ? 'text-[#3B82F6]' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                      Day {dayGroup.day}
                                    </span>
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="pl-7"></div>
                            )}
                          </td>
                          
                          {/* Problem */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {problem.status === 'solved' && (
                                <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center animate-in zoom-in duration-300">
                                  <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-500" strokeWidth={3} />
                                </div>
                              )}
                              <button 
                                className={`text-zinc-900 dark:text-white transition-colors duration-200 text-left hover:text-[#3B82F6] dark:hover:text-[#3B82F6] ${
                                  dayGroup.isLocked ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                                onClick={() => !dayGroup.isLocked && handleProblemClick(problem)}
                                disabled={dayGroup.isLocked}
                              >
                                {problem.title}
                              </button>
                            </div>
                          </td>

                          {/* Pattern */}
                          <td className="px-6 py-4">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                              {problem.pattern}
                            </span>
                          </td>
                          
                          {/* Note */}
                          <td className="px-6 py-4">
                            <button 
                              className={`transition-all duration-200 ${
                                dayGroup.isLocked 
                                  ? 'cursor-not-allowed text-zinc-300' 
                                  : 'text-zinc-400 hover:text-[#3B82F6] hover:scale-110'
                              }`}
                              disabled={dayGroup.isLocked}
                            >
                              <Edit3 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </td>
                          
                          {/* Star */}
                          <td className="px-6 py-4">
                            <button
                              onClick={() => !dayGroup.isLocked && toggleStar(problem.id)}
                              disabled={dayGroup.isLocked}
                              className={`transition-all duration-200 ${
                                dayGroup.isLocked 
                                  ? 'cursor-not-allowed' 
                                  : 'hover:scale-110'
                              } ${
                                problem.starred
                                  ? 'text-yellow-500'
                                  : 'text-zinc-300 dark:text-zinc-600 hover:text-yellow-500'
                              }`}
                            >
                              <Star
                                className="w-4 h-4"
                                strokeWidth={1.5}
                                fill={problem.starred ? 'currentColor' : 'none'}
                              />
                            </button>
                          </td>
                          
                          {/* Difficulty */}
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1.5 rounded-lg text-sm ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </td>
                          
                          {/* Action */}
                          <td className="px-6 py-4 text-right">
                            {dayGroup.isLocked ? (
                              <Button
                                onClick={onSubscribe}
                                className="bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 rounded-lg px-6 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all duration-200"
                              >
                                <Lock className="w-4 h-4 mr-2" strokeWidth={2} />
                                Unlock
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleProblemClick(problem)}
                                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-6 shadow-md hover:shadow-lg hover:shadow-[#3B82F6]/30 hover:scale-105 transition-all duration-200"
                              >
                                {problem.status === 'solved' ? 'Review' : 'Solve'}
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
