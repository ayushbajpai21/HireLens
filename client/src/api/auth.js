const API_URL = 'http://localhost:5000/api/auth';

/**
 * Register a new user account (Sets HTTP-Only Cookie + Returns token)
 */
export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed.');
  }
  return data;
}

/**
 * Log in an existing user (Sets HTTP-Only Cookie + Returns token)
 */
export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed.');
  }
  return data;
}

/**
 * Get the current user profile (Uses HTTP-Only Cookie or optional token fallback)
 */
export async function fetchCurrentUser(token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers,
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to authenticate.');
  }
  return data;
}

/**
 * Request temporary password via Emailer
 */
export async function requestForgotPassword(email) {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Forgot password request failed.');
  }
  return data;
}

/**
 * Update / Reset Password (From profile popup)
 */
export async function updatePassword({ currentPassword, newPassword }, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/update-password`, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify({ currentPassword, newPassword })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Password update failed.');
  }
  return data;
}

/**
 * Logout and clear HTTP-Only cookie
 */
export async function logoutUser() {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (e) {
    console.warn('[Logout API error]:', e);
  }
}
