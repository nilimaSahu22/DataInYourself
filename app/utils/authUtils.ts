// Authentication utility functions

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('adminToken');
  const loggedIn = localStorage.getItem('adminLoggedIn');
  return token !== null && loggedIn === 'true';
};

export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('adminUsername');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
};

export const makeAuthenticatedRequest = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };

  return fetch(url, {
    ...options,
    headers
  });
}; 