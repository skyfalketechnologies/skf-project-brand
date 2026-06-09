const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace('/api', '');
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://127.0.0.1:8000';
  }
  return 'https://portfolio-yg3v.onrender.com';
};

const BASE_URL = getBaseUrl();

/**
 * Formats an image URL from the backend.
 * If the URL is already absolute, it returns it as is.
 * If it's relative, it prefixes it with the backend BASE_URL.
 */
export const getImageUrl = (path) => {
  if (!path) return null;
  // Already an absolute URL (Cloudinary or external) — return as-is
  if (path.startsWith('http')) return path;

  // Remove any leading slash for consistent handling
  const clean = path.startsWith('/') ? path.slice(1) : path;

  // If path already includes "media/" prefix, just join with base
  if (clean.startsWith('media/')) {
    return `${BASE_URL}/${clean}`;
  }

  // Otherwise it's a bare filename from Django — prefix with /media/
  return `${BASE_URL}/media/${clean}`;
};


export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
