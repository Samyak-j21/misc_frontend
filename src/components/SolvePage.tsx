import { useState } from 'react';
import { ArrowLeft, Play, Send, ChevronDown, Eye, EyeOff, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import type { Theme } from '../App';
import type { Problem } from './problemsData';

interface SolvePageProps {
  theme: Theme;
  problem: Problem;
  onBack: () => void;
  onViewReview?: (problem: Problem) => void;
}

export function SolvePage({ theme, problem, onBack, onViewReview }: SolvePageProps) {
  const [aiProctorEnabled, setAiProctorEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState(`#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState<'testcase' | 'output'>('testcase');
  const [descriptionExpanded, setDescriptionExpanded] = useState(true);

  const handleRun = () => {
    setOutput('Running test cases...\n\nTest Case 1: Passed ✓\nTest Case 2: Passed ✓\nTest Case 3: Failed ✗\n\nExpected: [0, 1]\nGot: [0, 0]');
    setActiveTab('output');
  };

  const handleSubmit = () => {
    setOutput('Submitting solution...\n\nAll test cases passed! ✓\n\nRuntime: 12ms (Beats 87.5%)\nMemory: 10.2MB (Beats 92.1%)');
    setActiveTab('output');
  };

  const isSubmitted = output.includes('All test cases passed');

  return (
    <div className="h-screen flex flex-col bg-zinc-50 dark:bg-[#0F0F0F] animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-[#3B82F6] transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" strokeWidth={2} />
            Back
          </button>
          <h2 className="text-zinc-900 dark:text-white">{problem.title}</h2>
        </div>

        {/* AI Proctor Toggle */}
        <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-[#3B82F6] transition-all duration-200">
          <span className="text-sm text-zinc-700 dark:text-zinc-300">AI Proctor Mode</span>
          <Switch
            checked={aiProctorEnabled}
            onCheckedChange={setAiProctorEnabled}
          />
          {aiProctorEnabled ? (
            <Eye className="w-4 h-4 text-[#3B82F6] animate-pulse" strokeWidth={2} />
          ) : (
            <EyeOff className="w-4 h-4 text-zinc-400" strokeWidth={2} />
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto bg-white dark:bg-zinc-900/30">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-900 dark:text-white">Description</h3>
                <button
                  onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-[#3B82F6] transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${descriptionExpanded ? '' : 'rotate-180'}`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {descriptionExpanded && (
                <div className="space-y-4">
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Given an array of integers <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-[#3B82F6]">nums</code> and an integer <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-[#3B82F6]">target</code>, return indices of the two numbers such that they add up to target.
                  </p>

                  <div>
                    <h4 className="text-zinc-900 dark:text-white mb-2">Example 1:</h4>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                      <p className="text-zinc-700 dark:text-zinc-300 mb-1">
                        <span className="text-zinc-500 dark:text-zinc-400">Input:</span> nums = [2,7,11,15], target = 9
                      </p>
                      <p className="text-zinc-700 dark:text-zinc-300 mb-1">
                        <span className="text-zinc-500 dark:text-zinc-400">Output:</span> [0,1]
                      </p>
                      <p className="text-zinc-700 dark:text-zinc-300">
                        <span className="text-zinc-500 dark:text-zinc-400">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-zinc-900 dark:text-white mb-2">Example 2:</h4>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                      <p className="text-zinc-700 dark:text-zinc-300 mb-1">
                        <span className="text-zinc-500 dark:text-zinc-400">Input:</span> nums = [3,2,4], target = 6
                      </p>
                      <p className="text-zinc-700 dark:text-zinc-300">
                        <span className="text-zinc-500 dark:text-zinc-400">Output:</span> [1,2]
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-zinc-900 dark:text-white mb-2">Constraints:</h4>
                    <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
                      <li>2 ≤ nums.length ≤ 10<sup>4</sup></li>
                      <li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li>
                      <li>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></li>
                      <li>Only one valid answer exists.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col bg-white dark:bg-zinc-900/30">
          {/* Editor Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/30">
            <h3 className="text-zinc-900 dark:text-white">AceInt Online Compiler</h3>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white outline-none focus:border-[#3B82F6] transition-colors"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-6 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 font-mono text-sm resize-none outline-none"
              style={{ tabSize: 4 }}
              spellCheck={false}
            />
          </div>

          {/* Bottom Panel - Input/Output */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 h-64 flex flex-col">
            {/* Tabs */}
            <div className="flex items-center gap-4 px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              <button
                onClick={() => setActiveTab('testcase')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeTab === 'testcase'
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                Test Cases
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeTab === 'output'
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                Output
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {activeTab === 'testcase' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 block">Input</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="nums = [2,7,11,15]&#10;target = 9"
                      className="w-full h-20 px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-mono text-sm resize-none outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'output' && (
                <div>
                  <pre className="text-sm text-zinc-900 dark:text-zinc-100 font-mono whitespace-pre-wrap">
                    {output || 'Run your code to see the output...'}
                  </pre>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center gap-3 bg-zinc-50/50 dark:bg-zinc-800/30">
              <Button
                onClick={handleRun}
                variant="outline"
                className="rounded-xl border-zinc-200 dark:border-zinc-700"
              >
                <Play className="w-4 h-4 mr-2" strokeWidth={2} />
                Run Code
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl"
              >
                <Send className="w-4 h-4 mr-2" strokeWidth={2} />
                Submit
              </Button>
              {isSubmitted && onViewReview && (
                <Button
                  onClick={() => onViewReview(problem)}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl ml-auto shadow-lg hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 animate-in zoom-in"
                >
                  <BarChart3 className="w-4 h-4 mr-2" strokeWidth={2} />
                  View Review & Solutions
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Proctor Overlay */}
      {aiProctorEnabled && (
        <div className="fixed top-20 right-6 bg-white dark:bg-zinc-900 border border-[#3B82F6] dark:border-[#3B82F6]/50 rounded-2xl p-4 shadow-2xl shadow-[#3B82F6]/20 max-w-xs animate-in slide-in-from-right duration-500">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
              <Eye className="w-5 h-5 text-[#3B82F6]" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-zinc-900 dark:text-white mb-1">AI Proctor Active</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Your session is being monitored. Stay focused and avoid switching tabs.
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Tab switches:</span>
              <span className="text-[#3B82F6]">0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}