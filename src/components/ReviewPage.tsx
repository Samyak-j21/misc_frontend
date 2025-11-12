import { useState } from 'react';
import { ArrowLeft, Trophy, Clock, TrendingUp, Users, Target, CheckCircle2, Play, Code2, Lightbulb, Zap, BarChart3, Award, Star, ThumbsUp, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { Theme } from '../App';
import type { Problem } from './problemsData';

interface ReviewPageProps {
  theme: Theme;
  problem: Problem;
  onBack: () => void;
}

// Mock data for analytics
const generateAnalytics = (problemId: string) => {
  const seed = problemId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (min: number, max: number) => Math.floor((seed % (max - min + 1)) + min);
  
  return {
    yourTime: random(15, 45),
    averageTime: random(25, 50),
    fastestTime: random(8, 15),
    yourPercentile: random(55, 95),
    totalSubmissions: random(15000, 50000),
    behindYou: random(10000, 30000),
    aheadOfYou: random(5000, 15000),
    acceptanceRate: random(35, 75),
    likes: random(1200, 8500),
    dislikes: random(100, 800),
  };
};

export function ReviewPage({ theme, problem, onBack }: ReviewPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const analytics = generateAnalytics(problem.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 dark:text-green-500 bg-green-500/10';
      case 'Medium': return 'text-orange-600 dark:text-orange-500 bg-orange-500/10';
      case 'Hard': return 'text-red-600 dark:text-red-500 bg-red-500/10';
      default: return '';
    }
  };

  // Mock time distribution data
  const timeDistribution = [
    { range: '0-15 min', percentage: 12, count: Math.floor(analytics.totalSubmissions * 0.12) },
    { range: '15-30 min', percentage: 35, count: Math.floor(analytics.totalSubmissions * 0.35) },
    { range: '30-45 min', percentage: 28, count: Math.floor(analytics.totalSubmissions * 0.28) },
    { range: '45-60 min', percentage: 18, count: Math.floor(analytics.totalSubmissions * 0.18) },
    { range: '60+ min', percentage: 7, count: Math.floor(analytics.totalSubmissions * 0.07) },
  ];

  // Code solutions
  const solutions = {
    brute: {
      cpp: `// Brute Force Approach - O(n²) Time, O(1) Space
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        // Check every pair of elements
        for(int i = 0; i < n; i++) {
            for(int j = i + 1; j < n; j++) {
                if(nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {}; // No solution found
    }
};`,
      explanation: "The brute force approach checks every possible pair of numbers. For each element, we iterate through all remaining elements to find a pair that sums to the target. This is simple but inefficient for large arrays."
    },
    better: {
      cpp: `// Better Approach - O(n) Time, O(n) Space using sorting
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        vector<pair<int, int>> arr;
        
        // Store value and original index
        for(int i = 0; i < n; i++) {
            arr.push_back({nums[i], i});
        }
        
        // Sort by value
        sort(arr.begin(), arr.end());
        
        // Two pointer approach
        int left = 0, right = n - 1;
        while(left < right) {
            int sum = arr[left].first + arr[right].first;
            if(sum == target) {
                return {arr[left].second, arr[right].second};
            }
            else if(sum < target) left++;
            else right--;
        }
        return {};
    }
};`,
      explanation: "This approach uses sorting and two pointers. We sort the array while keeping track of original indices, then use two pointers from both ends. If sum is less than target, move left pointer right; if greater, move right pointer left. This reduces time complexity but requires extra space."
    },
    optimal: {
      cpp: `// Optimal Approach - O(n) Time, O(n) Space using Hash Map
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;
        int n = nums.size();
        
        // Single pass with hash map
        for(int i = 0; i < n; i++) {
            int complement = target - nums[i];
            
            // Check if complement exists in map
            if(numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }
            
            // Store current number and its index
            numMap[nums[i]] = i;
        }
        return {};
    }
};`,
      explanation: "The optimal solution uses a hash map for O(1) lookups. For each element, we calculate its complement (target - current) and check if it exists in the map. If found, we return both indices. Otherwise, we store the current element. This achieves O(n) time with a single pass."
    }
  };

  return (
    <div className="min-h-full bg-[#F4F4F5] dark:bg-gradient-to-br dark:from-[#0F0F0F] dark:to-[#1A1A1A] animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 px-8 py-6 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-[#3B82F6] transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" strokeWidth={2} />
            Back to Problem
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-zinc-900 dark:text-white">
                  {problem.title}
                </h1>
                <span className={`px-3 py-1 rounded-lg text-sm ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <span className="px-3 py-1 rounded-lg text-sm bg-[#3B82F6]/10 text-[#3B82F6]">
                  {problem.pattern}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4" strokeWidth={2} />
                  <span>{analytics.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" strokeWidth={2} />
                  <span>{analytics.totalSubmissions.toLocaleString()} submissions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500" strokeWidth={2} />
                  <span>{analytics.acceptanceRate}% acceptance rate</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-zinc-200 dark:border-zinc-700"
              >
                <Star className="w-4 h-4 mr-2" strokeWidth={2} />
                Add to Favorites
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          
          {/* Performance Analytics */}
          <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-[#3B82F6]/10 to-transparent dark:from-[#3B82F6]/20 p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30">
                  <Trophy className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-zinc-900 dark:text-white">Your Performance Analytics</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">AI-powered insights on your submission</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Key Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Your Time */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10 rounded-xl p-6 border border-blue-200 dark:border-blue-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <Clock className="w-8 h-8 text-blue-600 dark:text-blue-500" strokeWidth={2} />
                    <span className="text-2xl">⏱️</span>
                  </div>
                  <div className="mb-1">
                    <div className="text-3xl text-zinc-900 dark:text-white mb-1">
                      {analytics.yourTime} min
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Your Time</div>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">
                    Avg: {analytics.averageTime} min
                  </div>
                </div>

                {/* Percentile */}
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 dark:from-green-500/20 dark:to-green-600/10 rounded-xl p-6 border border-green-200 dark:border-green-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-500" strokeWidth={2} />
                    <span className="text-2xl">📈</span>
                  </div>
                  <div className="mb-1">
                    <div className="text-3xl text-zinc-900 dark:text-white mb-1">
                      {analytics.yourPercentile}%
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Your Percentile</div>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-500">
                    Top {100 - analytics.yourPercentile}% of users
                  </div>
                </div>

                {/* People Behind */}
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 dark:from-purple-500/20 dark:to-purple-600/10 rounded-xl p-6 border border-purple-200 dark:border-purple-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="w-8 h-8 text-purple-600 dark:text-purple-500" strokeWidth={2} />
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="mb-1">
                    <div className="text-3xl text-zinc-900 dark:text-white mb-1">
                      {(analytics.behindYou / 1000).toFixed(1)}K
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Behind You</div>
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-500">
                    You're doing better! 🎉
                  </div>
                </div>

                {/* People Ahead */}
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 dark:from-orange-500/20 dark:to-orange-600/10 rounded-xl p-6 border border-orange-200 dark:border-orange-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <Target className="w-8 h-8 text-orange-600 dark:text-orange-500" strokeWidth={2} />
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="mb-1">
                    <div className="text-3xl text-zinc-900 dark:text-white mb-1">
                      {(analytics.aheadOfYou / 1000).toFixed(1)}K
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Ahead of You</div>
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-500">
                    Room for improvement
                  </div>
                </div>
              </div>

              {/* Performance Comparison */}
              <div className="mb-8">
                <h3 className="text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#3B82F6]" strokeWidth={2} />
                  Time Distribution Analysis
                </h3>
                <div className="space-y-3">
                  {timeDistribution.map((item, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">{item.range}</span>
                        <span className="text-zinc-900 dark:text-white">
                          {item.percentage}% ({item.count.toLocaleString()} users)
                        </span>
                      </div>
                      <div className="relative w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            analytics.yourTime >= parseInt(item.range.split('-')[0]) && 
                            analytics.yourTime <= (parseInt(item.range.split('-')[1]) || 100)
                              ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB]'
                              : 'bg-zinc-300 dark:bg-zinc-700'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        >
                          {analytics.yourTime >= parseInt(item.range.split('-')[0]) && 
                           analytics.yourTime <= (parseInt(item.range.split('-')[1]) || 100) && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white">
                              You ⭐
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:to-yellow-500/20 rounded-xl p-6 border border-amber-200 dark:border-amber-900/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                    <Award className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-zinc-900 dark:text-white mb-2">Performance Summary</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      Great job! You solved this problem faster than {analytics.behindYou.toLocaleString()} users. 
                      Your solution is in the top {100 - analytics.yourPercentile}% percentile. 
                      {analytics.yourTime < analytics.averageTime 
                        ? ` You were ${analytics.averageTime - analytics.yourTime} minutes faster than average!`
                        : ` Try to optimize your approach to beat the ${analytics.averageTime} min average.`}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {analytics.yourPercentile > 80 && (
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-500 rounded-lg text-xs flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5" strokeWidth={2} />
                          Top Performer
                        </span>
                      )}
                      {analytics.yourTime < analytics.averageTime && (
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-500 rounded-lg text-xs flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" strokeWidth={2} />
                          Speed Demon
                        </span>
                      )}
                      {analytics.yourTime < analytics.fastestTime * 2 && (
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-500 rounded-lg text-xs flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" strokeWidth={2} />
                          Quick Solver
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-emerald-500/10 to-transparent dark:from-emerald-500/20 p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/30">
                  <Code2 className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-zinc-900 dark:text-white">Solution Approaches</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Learn multiple ways to solve this problem</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <Tabs defaultValue="brute" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                  <TabsTrigger 
                    value="brute" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-700 data-[state=active]:shadow-sm transition-all"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" strokeWidth={2} />
                    Brute Force
                  </TabsTrigger>
                  <TabsTrigger 
                    value="better"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-700 data-[state=active]:shadow-sm transition-all"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" strokeWidth={2} />
                    Better
                  </TabsTrigger>
                  <TabsTrigger 
                    value="optimal"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-700 data-[state=active]:shadow-sm transition-all"
                  >
                    <Zap className="w-4 h-4 mr-2" strokeWidth={2} />
                    Optimal
                  </TabsTrigger>
                </TabsList>

                {(['brute', 'better', 'optimal'] as const).map((approach) => (
                  <TabsContent key={approach} value={approach} className="space-y-6">
                    {/* Approach Explanation */}
                    <div className="bg-blue-500/5 dark:bg-blue-500/10 rounded-xl p-6 border border-blue-200 dark:border-blue-900/50">
                      <h3 className="text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-500" strokeWidth={2} />
                        Approach Explanation
                      </h3>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {solutions[approach].explanation}
                      </p>
                    </div>

                    {/* Code */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-zinc-900 dark:text-white">Implementation</h3>
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-white outline-none focus:border-[#3B82F6] transition-all"
                        >
                          <option value="cpp">C++</option>
                          <option value="java">Java</option>
                          <option value="python">Python</option>
                          <option value="javascript">JavaScript</option>
                        </select>
                      </div>
                      <div className="bg-zinc-900 dark:bg-black rounded-xl overflow-hidden border border-zinc-700">
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 dark:bg-zinc-900 border-b border-zinc-700">
                          <span className="text-sm text-zinc-400">solution.cpp</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-zinc-400 hover:text-white"
                          >
                            Copy Code
                          </Button>
                        </div>
                        <pre className="p-4 overflow-x-auto">
                          <code className="text-sm text-zinc-300 font-mono leading-relaxed">
                            {solutions[approach].cpp}
                          </code>
                        </pre>
                      </div>
                    </div>

                    {/* Complexity Analysis */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-500/5 dark:bg-green-500/10 rounded-xl p-4 border border-green-200 dark:border-green-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-green-600 dark:text-green-500" strokeWidth={2} />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">Time Complexity</span>
                        </div>
                        <div className="text-xl text-zinc-900 dark:text-white">
                          {approach === 'brute' ? 'O(n²)' : approach === 'better' ? 'O(n log n)' : 'O(n)'}
                        </div>
                      </div>
                      <div className="bg-purple-500/5 dark:bg-purple-500/10 rounded-xl p-4 border border-purple-200 dark:border-purple-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-purple-600 dark:text-purple-500" strokeWidth={2} />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">Space Complexity</span>
                        </div>
                        <div className="text-xl text-zinc-900 dark:text-white">
                          {approach === 'brute' ? 'O(1)' : 'O(n)'}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          {/* Video Explanation */}
          <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-red-500/10 to-transparent dark:from-red-500/20 p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                  <Play className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-zinc-900 dark:text-white">Video Explanation</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Watch detailed walkthrough of all approaches</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden relative group cursor-pointer border border-zinc-700">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#2563EB]/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                      <Play className="w-10 h-10 text-white ml-1" strokeWidth={2} fill="white" />
                    </div>
                    <p className="text-white text-lg mb-2">Watch Solution Explanation</p>
                    <p className="text-white/70 text-sm">Complete walkthrough • 15:30 min</p>
                  </div>
                </div>
              </div>

              {/* Video Chapters */}
              <div className="mt-6 space-y-2">
                <h3 className="text-zinc-900 dark:text-white mb-3">Video Chapters</h3>
                {[
                  { time: '0:00', title: 'Problem Understanding', duration: '2:30' },
                  { time: '2:30', title: 'Brute Force Approach', duration: '3:45' },
                  { time: '6:15', title: 'Better Approach Explained', duration: '4:20' },
                  { time: '10:35', title: 'Optimal Solution', duration: '3:45' },
                  { time: '14:20', title: 'Code Implementation', duration: '1:10' },
                ].map((chapter, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3B82F6]/20 transition-colors">
                      <Play className="w-4 h-4 text-[#3B82F6]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-zinc-900 dark:text-white">{chapter.title}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">{chapter.duration}</div>
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{chapter.time}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
