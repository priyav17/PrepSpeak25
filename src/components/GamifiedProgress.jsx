import React, { useEffect, useState } from 'react';
import { getProgress } from '../gamification/progressTracker';

const GamifiedProgress = () => {
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(getProgress());
    }, 1000); // Auto-update every second (in case XP changes)

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      padding: '10px',
      border: '2px solid #4CAF50',
      borderRadius: '12px',
      backgroundColor: '#e6ffe6',
      marginBottom: '20px',
      width: 'fit-content'
    }}>
      <h4>🎮 Your Progress</h4>
      <p><strong>XP:</strong> {progress.xp}</p>
      <p><strong>Level:</strong> {progress.level}</p>
      <p><strong>🔥 Streak:</strong> {progress.streak} day(s)</p>
    </div>
  );
};

export default GamifiedProgress;
