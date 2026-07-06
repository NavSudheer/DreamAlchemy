/**
 * Generates a unique ID for dreams
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Formats a date for display
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

/**
 * Truncates text to a specified length
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Extracts the first few sentences from a text
 */
export const extractPreview = (text: string, sentenceCount: number = 2): string => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, sentenceCount).join(' ');
};

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Returns a greeting based on the current time of day
 */
export const getGreeting = (date: Date = new Date()): string => {
  const hour = date.getHours();
  if (hour < 5) return 'Still dreaming?';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Number of consecutive days (ending today or yesterday) with at least one entry
 */
export const computeStreak = (timestamps: Array<number | string | Date>): number => {
  if (timestamps.length === 0) return 0;

  const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const days = new Set(timestamps.map(t => dayKey(new Date(t))));

  // A streak is alive if it includes today or yesterday
  const cursor = new Date();
  if (!days.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(dayKey(cursor))) return 0;
  }

  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

/**
 * Count of entries within the last N days
 */
export const countWithinDays = (
  timestamps: Array<number | string | Date>,
  daysBack: number
): number => {
  const cutoff = Date.now() - daysBack * 24 * 60 * 60 * 1000;
  return timestamps.filter(t => new Date(t).getTime() >= cutoff).length;
}; 