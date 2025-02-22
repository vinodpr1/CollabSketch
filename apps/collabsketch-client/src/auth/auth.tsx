export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Remove token from localStorage (logout)
export const removeAuthToken = () => {
  localStorage.removeItem("token");
};
