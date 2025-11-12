import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PracticeDashboard } from './components/PracticeDashboard';
import { ChallengeList } from './components/ChallengeList';
import { SolvePage } from './components/SolvePage';
import { ReviewPage } from './components/ReviewPage';
import { Button } from './components/ui/button';
import type { Problem } from './components/problemsData';
import { Crown, X, CheckCircle2 } from 'lucide-react';

export type Theme = 'light' | 'dark';
export type Page = 'dashboard' | 'challenge-list' | 'solve' | 'review' | 'ai-interviewer';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showSubscribeDialog, setShowSubscribeDialog] = useState<boolean>(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleChallengeSelect = (challengeId: string) => {
    setSelectedChallenge(challengeId);
    setCurrentPage('challenge-list');
  };

  const handleProblemSolve = (problem: Problem) => {
    setSelectedProblem(problem);
    setCurrentPage('solve');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedChallenge(null);
  };

  const handleBackToList = () => {
    setCurrentPage('challenge-list');
    setSelectedProblem(null);
  };

  const handleProblemComplete = (problemId: string) => {
    setCompletedProblems(prev => new Set([...prev, problemId]));
  };

  const handleSubscribe = () => {
    setShowSubscribeDialog(true);
  };

  const confirmSubscription = () => {
    setIsSubscribed(true);
    setShowSubscribeDialog(false);
  };

  const handleViewReview = (problem: Problem) => {
    setSelectedProblem(problem);
    setCurrentPage('review');
  };

  const handleBackToSolve = () => {
    setCurrentPage('solve');
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen overflow-hidden bg-[#F4F4F5] dark:bg-gradient-to-br dark:from-[#0F0F0F] dark:to-[#1A1A1A] transition-colors duration-300">
        <Sidebar
          theme={theme}
          toggleTheme={toggleTheme}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        
        <main className="flex-1 overflow-auto">
          {currentPage === 'dashboard' && (
            <PracticeDashboard
              theme={theme}
              onChallengeSelect={handleChallengeSelect}
            />
          )}
          
          {currentPage === 'challenge-list' && selectedChallenge && (
            <ChallengeList
              theme={theme}
              challengeId={selectedChallenge}
              onBackToDashboard={handleBackToDashboard}
              onProblemSolve={handleProblemSolve}
              completedProblems={completedProblems}
              onProblemComplete={handleProblemComplete}
              isSubscribed={isSubscribed}
              onSubscribe={handleSubscribe}
            />
          )}
          
          {currentPage === 'solve' && selectedProblem && (
            <SolvePage
              theme={theme}
              problem={selectedProblem}
              onBack={handleBackToList}
              onViewReview={handleViewReview}
            />
          )}

          {currentPage === 'review' && selectedProblem && (
            <ReviewPage
              theme={theme}
              problem={selectedProblem}
              onBack={handleBackToSolve}
            />
          )}

          {currentPage === 'ai-interviewer' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-zinc-900 dark:text-white mb-2">AI Interviewer</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Coming soon...</p>
              </div>
            </div>
          )}
        </main>

        {/* Subscription Dialog */}
        {showSubscribeDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-md mx-4 animate-in zoom-in duration-300">
              {/* Header */}
              <div className="relative p-6 pb-0">
                <button
                  onClick={() => setShowSubscribeDialog(false)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center mb-4 shadow-lg shadow-[#3B82F6]/30">
                    <Crown className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h2 className="text-zinc-900 dark:text-white mb-2">
                    Subscribe to AceInt Practice
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Unlock all challenges and accelerate your interview preparation
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="px-6 py-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-500" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-zinc-900 dark:text-white text-sm">
                      Access to all days and problems
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-500 text-xs">
                      Unlock hundreds of curated coding challenges
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-500" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-zinc-900 dark:text-white text-sm">
                      Company-specific challenges
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-500 text-xs">
                      From Google, Meta, Amazon, and more
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-500" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-zinc-900 dark:text-white text-sm">
                      AI-powered interview prep
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-500 text-xs">
                      Get personalized guidance and feedback
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-4 space-y-3">
                <Button
                  onClick={confirmSubscription}
                  className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white rounded-xl py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <Crown className="w-5 h-5 mr-2" strokeWidth={2} />
                  Subscribe Now
                </Button>
                <Button
                  onClick={() => setShowSubscribeDialog(false)}
                  variant="outline"
                  className="w-full rounded-xl py-6 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                >
                  Maybe Later
                </Button>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-0">
                <p className="text-xs text-center text-zinc-500 dark:text-zinc-500">
                  Start your 7-day free trial • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;