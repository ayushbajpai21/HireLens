function getBaseApiUrl() {
  let url = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim();
  url = url.replace(/\/+$/, '');
  if (!url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
}

const BASE_API = getBaseApiUrl();
const API_URL = `${BASE_API}/resumes`;

/**
 * Upload a resume PDF file
 */
export async function uploadResumeFile(file, token) {
  const formData = new FormData();
  formData.append('resume', file);

  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: formData
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to upload and parse resume.');
  }
  return data;
}

/**
 * Get all uploaded resumes for current user
 */
export async function fetchMyResumes(token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers,
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch resumes.');
  }
  return data;
}

/**
 * Get currently active/selected resume
 */
export async function fetchActiveResume(token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/active`, {
    method: 'GET',
    headers,
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch active resume.');
  }
  return data;
}

/**
 * Set a resume as active
 */
export async function setActiveResume(id, token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/${id}/active`, {
    method: 'PUT',
    headers,
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to set active resume.');
  }
  return data;
}

/**
 * Delete a resume
 */
export async function deleteResume(id, token) {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers,
    credentials: 'include'
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete resume.');
  }
  return data;
}
