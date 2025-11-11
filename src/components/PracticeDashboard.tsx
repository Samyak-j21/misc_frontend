import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import type { Theme } from '../App';
import flipkartLogo from '../assets/flipkart_logo.png';
import googleLogo from '../assets/google_logo.png';
import netflixLogo from '../assets/netflix_logo.png';
import metaLogo from '../assets/meta_logo.png';
import amazonLogo from '../assets/amazon_logo.png';
import microsoftLogo from '../assets/microsoft_logo.png';
import appleLogo from '../assets/apple_logo.png';
import uberLogo from '../assets/uber_logo.png';

interface Challenge {
  id: string;
  company: string;
  days: number;
  description: string;
  color: string;
  logo: string | 'image';
  logoImage?: string;
}

const challenges: Challenge[] = [
  {
    id: 'flipkart-30',
    company: 'Flipkart',
    days: 30,
    description: 'Master e-commerce platform challenges',
    color: '#2874F0',
    logo: 'image',
    logoImage: flipkartLogo
  },
  {
    id: 'google-21',
    company: 'Google',
    days: 21,
    description: 'Conquer Google coding interviews',
    color: '#4285F4',
    logo: 'image',
    logoImage: googleLogo
  },
  {
    id: 'meta-45',
    company: 'Meta',
    days: 45,
    description: 'Ace Meta technical assessments',
    color: '#0668E1',
    logo: 'image',
    logoImage: metaLogo
  },
  {
    id: 'amazon-40',
    company: 'Amazon',
    days: 40,
    description: 'Prepare for Amazon leadership principles',
    color: '#FF9900',
    logo: 'image',
    logoImage: amazonLogo
  },
  {
    id: 'microsoft-35',
    company: 'Microsoft',
    days: 35,
    description: 'Excel at Microsoft coding rounds',
    color: '#00A4EF',
    logo: 'image',
    logoImage: microsoftLogo
  },
  {
    id: 'apple-28',
    company: 'Apple',
    days: 28,
    description: 'Master Apple system design',
    color: '#555555',
    logo: 'image',
    logoImage: appleLogo
  },
  {
    id: 'netflix-25',
    company: 'Netflix',
    days: 25,
    description: 'Streaming platform challenges',
    color: '#E50914',
    logo: 'image',
    logoImage: netflixLogo
  },
  {
    id: 'uber-30',
    company: 'Uber',
    days: 30,
    description: 'Real-world ride-sharing problems',
    color: '#000000',
    logo: 'image',
    logoImage: uberLogo
  }
];

interface PracticeDashboardProps {
  theme: Theme;
  onChallengeSelect: (challengeId: string) => void;
}

export function PracticeDashboard({ theme, onChallengeSelect }: PracticeDashboardProps) {
  return (
    <div className="min-h-full p-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center animate-in slide-in-from-top duration-700">
        <h1 className="text-zinc-900 dark:text-white mb-3">
          AceInt Practice Challenges
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Master coding interviews with company-specific challenge programs
        </p>
      </div>

      {/* Challenge Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {challenges.map((challenge, index) => (
          <div
            key={challenge.id}
            className="group bg-white dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:shadow-[#3B82F6]/10 dark:hover:shadow-[#3B82F6]/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom"
            style={{ animationDelay: `${index * 50}ms`, animationDuration: '600ms' }}
            onClick={() => onChallengeSelect(challenge.id)}
          >
            {/* Company Icon */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: challenge.logo === 'image' ? 'transparent' : challenge.color }}
              >
                {challenge.logo === 'image' && challenge.logoImage ? (
                  <img 
                    src={challenge.logoImage} 
                    alt={`${challenge.company} logo`}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <span>{challenge.logo}</span>
                )}
              </div>
              <div className="bg-[#3B82F6]/10 text-[#3B82F6] px-3 py-1 rounded-full text-sm animate-pulse">
                {challenge.days} Days
              </div>
            </div>

            {/* Company Name */}
            <h3 className="text-zinc-900 dark:text-white mb-2 group-hover:text-[#3B82F6] transition-colors duration-200">
              {challenge.company} Challenge
            </h3>

            {/* Description */}
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              {challenge.description}
            </p>

            {/* Problem Count */}
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
              {challenge.days * 2} Problems • 2 per day
            </p>

            {/* Start Button */}
            <Button
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl group-hover:shadow-lg group-hover:shadow-[#3B82F6]/30 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onChallengeSelect(challenge.id);
              }}
            >
              Start Learning
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}