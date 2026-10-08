/**
 * Utility function to format dates into human-readable strings
 * @param {string|Date} dateInput 
 * @returns {string} Formatted date (e.g., "Oct 5, 2026")
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return 'N/A';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'N/A';
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Calculate relative time string (e.g., "2 days ago")
 * @param {string|Date} dateInput 
 * @returns {string} Relative time
 */
export const formatRelativeTime = (dateInput) => {
  if (!dateInput) return 'N/A';
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateInput);
};
