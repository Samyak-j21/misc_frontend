export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  status: 'solved' | 'attempted' | 'unsolved';
  starred: boolean;
  note: string;
  day: number;
}

// Comprehensive problem bank organized by difficulty
const easyProblems = [
  'Two Sum', 'Best Time to Buy and Sell Stock', 'Contains Duplicate', 'Valid Anagram',
  'Valid Parentheses', 'Valid Palindrome', 'Merge Two Sorted Lists', 'Reverse Linked List',
  'Maximum Depth of Binary Tree', 'Same Tree', 'Invert Binary Tree', 'Symmetric Tree',
  'Path Sum', 'Remove Duplicates from Sorted Array', 'Search Insert Position', 'Plus One',
  'Climbing Stairs', 'Single Number', 'Majority Element', 'Happy Number', 'Move Zeroes',
  'Power of Three', 'Reverse String', 'First Unique Character in a String', 'Find the Difference',
  'Is Subsequence', 'Length of Last Word', 'Add Binary', 'Sqrt(x)', 'Implement Stack using Queues',
  'Reverse Integer', 'Palindrome Number', 'Roman to Integer', 'Longest Common Prefix',
  'Remove Element', 'Merge Sorted Array', 'Pascal\'s Triangle', 'Maximum Subarray Sum',
  'Count and Say', 'Valid Perfect Square', 'Missing Number', 'First Bad Version',
  'Ransom Note', 'Fizz Buzz', 'Third Maximum Number', 'Add Strings', 'Find All Numbers Disappeared',
  'Assign Cookies', 'Island Perimeter', 'Hamming Distance', 'Relative Ranks',
  'Next Greater Element I', 'Keyboard Row', 'Minimum Index Sum', 'Reshape the Matrix'
];

const mediumProblems = [
  'Product of Array Except Self', 'Maximum Subarray', 'Maximum Product Subarray',
  'Find Minimum in Rotated Sorted Array', 'Search in Rotated Sorted Array', '3Sum',
  'Container With Most Water', 'Longest Substring Without Repeating Characters',
  'Longest Repeating Character Replacement', 'Group Anagrams', 'Longest Palindromic Substring',
  'Palindromic Substrings', 'Remove Nth Node From End of List', 'Reorder List',
  'Binary Tree Level Order Traversal', 'Validate Binary Search Tree', 'Kth Smallest Element in a BST',
  'Construct Binary Tree from Preorder and Inorder Traversal', 'Course Schedule', 'Number of Islands',
  'Clone Graph', 'Pacific Atlantic Water Flow', 'Longest Consecutive Sequence', 'Coin Change',
  'Longest Increasing Subsequence', 'Word Break', 'Combination Sum', 'Subsets',
  'Permutations', 'Letter Combinations of a Phone Number', 'Generate Parentheses',
  'Word Search', 'Sort Colors', 'Top K Frequent Elements', 'Daily Temperatures',
  'Spiral Matrix', 'Jump Game', 'Merge Intervals', 'Insert Interval', 'Rotate Image',
  'Set Matrix Zeroes', 'Gas Station', 'Find Peak Element', 'Search a 2D Matrix',
  'Find First and Last Position', 'Valid Sudoku', 'Rotate Array', 'Min Stack',
  'Kth Largest Element', 'Decode String', 'Flatten Nested List Iterator', 'Evaluate Division',
  'Accounts Merge', 'Task Scheduler', 'Minimum Add to Make Parentheses Valid', 'Path Sum II',
  'Binary Tree Right Side View', 'Count Complete Tree Nodes', 'Lowest Common Ancestor',
  'House Robber', 'House Robber II', 'Decode Ways', 'Unique Paths', 'Minimum Path Sum',
  'Triangle', 'Maximum Square', 'Partition Equal Subset Sum', 'Target Sum'
];

const hardProblems = [
  'Merge k Sorted Lists', 'Trapping Rain Water', 'Median of Two Sorted Arrays',
  'Binary Tree Maximum Path Sum', 'Serialize and Deserialize Binary Tree', 'Word Ladder',
  'Minimum Window Substring', 'Sliding Window Maximum', 'Wildcard Matching',
  'Regular Expression Matching', 'Edit Distance', 'Longest Valid Parentheses',
  'Distinct Subsequences', 'Scramble String', 'Maximal Rectangle', 'Max Points on a Line',
  'N-Queens', 'Sudoku Solver', 'First Missing Positive', 'Largest Rectangle in Histogram',
  'Word Ladder II', 'Palindrome Partitioning II', 'Word Break II', 'LRU Cache',
  'Insert Delete GetRandom O(1)', 'Find Median from Data Stream', 'Russian Doll Envelopes',
  'Burst Balloons', 'Dungeon Game', 'Cherry Pickup', 'Alien Dictionary', 'Graph Valid Tree',
  'Number of Connected Components', 'Count of Smaller Numbers After Self', 'Reverse Pairs',
  'Max Sum of Rectangle No Larger Than K', 'Self Crossing', 'Concatenated Words',
  'Palindrome Pairs', 'Design Search Autocomplete System', 'Frog Jump', 'Split Array Largest Sum'
];

const patterns = [
  'Array', 'String', 'Linked List', 'Tree', 'Graph', 'Dynamic Programming',
  'Binary Search', 'Backtracking', 'Stack', 'Heap', 'Interval', 'Sliding Window',
  'Two Pointers', 'Hash Table', 'Greedy', 'Divide and Conquer'
];

// Seeded random number generator for consistent shuffling per challenge
function seededRandom(seed: number) {
  let state = seed;
  return function() {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function shuffleArray<T>(array: T[], seed: number): T[] {
  const result = [...array];
  const random = seededRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateProblems(challengeId: string, totalDays: number): Problem[] {
  const problems: Problem[] = [];
  const totalProblems = totalDays * 2; // 2 problems per day
  
  // Use challenge ID as seed for consistent but different shuffling per challenge
  const seed = challengeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Shuffle problem pools for this challenge
  const shuffledEasy = shuffleArray(easyProblems, seed);
  const shuffledMedium = shuffleArray(mediumProblems, seed + 1000);
  const shuffledHard = shuffleArray(hardProblems, seed + 2000);
  const shuffledPatterns = shuffleArray(patterns, seed + 3000);
  
  // Calculate distribution based on total days
  let easyIndex = 0;
  let mediumIndex = 0;
  let hardIndex = 0;
  let patternIndex = 0;
  
  for (let day = 1; day <= totalDays; day++) {
    // Determine difficulty progression based on day
    const dayProgress = day / totalDays;
    
    // Problem 1 of the day
    let difficulty1: 'Easy' | 'Medium' | 'Hard';
    let prob1Title: string;
    
    if (dayProgress < 0.25) {
      // First 25%: Mostly easy
      difficulty1 = 'Easy';
      prob1Title = shuffledEasy[easyIndex % shuffledEasy.length];
      easyIndex++;
    } else if (dayProgress < 0.6) {
      // Next 35%: Mix of easy and medium
      if ((day + seed) % 3 === 0) {
        difficulty1 = 'Easy';
        prob1Title = shuffledEasy[easyIndex % shuffledEasy.length];
        easyIndex++;
      } else {
        difficulty1 = 'Medium';
        prob1Title = shuffledMedium[mediumIndex % shuffledMedium.length];
        mediumIndex++;
      }
    } else if (dayProgress < 0.85) {
      // Next 25%: Mostly medium with some hard
      if ((day + seed) % 4 === 0) {
        difficulty1 = 'Hard';
        prob1Title = shuffledHard[hardIndex % shuffledHard.length];
        hardIndex++;
      } else {
        difficulty1 = 'Medium';
        prob1Title = shuffledMedium[mediumIndex % shuffledMedium.length];
        mediumIndex++;
      }
    } else {
      // Last 15%: Hard problems
      if ((day + seed) % 3 === 0) {
        difficulty1 = 'Medium';
        prob1Title = shuffledMedium[mediumIndex % shuffledMedium.length];
        mediumIndex++;
      } else {
        difficulty1 = 'Hard';
        prob1Title = shuffledHard[hardIndex % shuffledHard.length];
        hardIndex++;
      }
    }
    
    problems.push({
      id: `${challengeId}-${day}-1`,
      title: prob1Title,
      difficulty: difficulty1,
      pattern: shuffledPatterns[patternIndex % shuffledPatterns.length],
      status: 'unsolved',
      starred: false,
      note: '',
      day
    });
    patternIndex++;
    
    // Problem 2 of the day
    let difficulty2: 'Easy' | 'Medium' | 'Hard';
    let prob2Title: string;
    
    if (dayProgress < 0.25) {
      // First 25%: Mostly easy, some medium
      if ((day + seed) % 4 === 0) {
        difficulty2 = 'Medium';
        prob2Title = shuffledMedium[mediumIndex % shuffledMedium.length];
        mediumIndex++;
      } else {
        difficulty2 = 'Easy';
        prob2Title = shuffledEasy[easyIndex % shuffledEasy.length];
        easyIndex++;
      }
    } else if (dayProgress < 0.6) {
      // Next 35%: More medium
      if ((day + seed) % 2 === 0) {
        difficulty2 = 'Medium';
        prob2Title = shuffledMedium[mediumIndex % shuffledMedium.length];
        mediumIndex++;
      } else {
        difficulty2 = 'Easy';
        prob2Title = shuffledEasy[easyIndex % shuffledEasy.length];
        easyIndex++;
      }
    } else if (dayProgress < 0.85) {
      // Next 25%: Medium and hard
      difficulty2 = 'Medium';
      prob2Title = shuffledMedium[mediumIndex % shuffledMedium.length];
      mediumIndex++;
    } else {
      // Last 15%: Mix of medium and hard
      if ((day + seed) % 2 === 0) {
        difficulty2 = 'Hard';
        prob2Title = shuffledHard[hardIndex % shuffledHard.length];
        hardIndex++;
      } else {
        difficulty2 = 'Medium';
        prob2Title = shuffledMedium[mediumIndex % shuffledMedium.length];
        mediumIndex++;
      }
    }
    
    problems.push({
      id: `${challengeId}-${day}-2`,
      title: prob2Title,
      difficulty: difficulty2,
      pattern: shuffledPatterns[patternIndex % shuffledPatterns.length],
      status: 'unsolved',
      starred: false,
      note: '',
      day
    });
    patternIndex++;
  }
  
  return problems;
}

// Generate problems for all challenges
export const challengeProblems: Record<string, Problem[]> = {
  'flipkart-30': generateProblems('flipkart-30', 30),
  'google-21': generateProblems('google-21', 21),
  'meta-45': generateProblems('meta-45', 45),
  'amazon-40': generateProblems('amazon-40', 40),
  'microsoft-35': generateProblems('microsoft-35', 35),
  'apple-28': generateProblems('apple-28', 28),
  'netflix-25': generateProblems('netflix-25', 25),
  'uber-30': generateProblems('uber-30', 30),
};

export const challengeInfo: Record<string, { name: string; days: number; totalProblems: number }> = {
  'flipkart-30': { name: 'Flipkart', days: 30, totalProblems: 60 },
  'google-21': { name: 'Google', days: 21, totalProblems: 42 },
  'meta-45': { name: 'Meta', days: 45, totalProblems: 90 },
  'amazon-40': { name: 'Amazon', days: 40, totalProblems: 80 },
  'microsoft-35': { name: 'Microsoft', days: 35, totalProblems: 70 },
  'apple-28': { name: 'Apple', days: 28, totalProblems: 56 },
  'netflix-25': { name: 'Netflix', days: 25, totalProblems: 50 },
  'uber-30': { name: 'Uber', days: 30, totalProblems: 60 },
};
