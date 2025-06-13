// XP & Level configuration
const XP_PER_CORRECTION = 10;
const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 750, 1000]; // Levels 0-6

// Load progress from localStorage
export const getProgress = () => {
  const saved = JSON.parse(localStorage.getItem('gamifiedProgress'));
  return saved || { xp: 0, level: 1, streak: 0, lastActiveDate: null };
};

// Save progress to localStorage
const saveProgress = (progress) => {
  localStorage.setItem('gamifiedProgress', JSON.stringify(progress));
};

// Calculate level based on XP
const calculateLevel = (xp) => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
};

// Add XP and update progress
export const addCorrectionXP = () => {
  const progress = getProgress();
  progress.xp += XP_PER_CORRECTION;
  progress.level = calculateLevel(progress.xp);
  updateStreak(progress);
  saveProgress(progress);
  return progress;
};

// Streak logic based on date
const updateStreak = (progress) => {
  const today = new Date().toDateString();
  if (progress.lastActiveDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (progress.lastActiveDate === yesterday.toDateString()) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }

  progress.lastActiveDate = today;
};
