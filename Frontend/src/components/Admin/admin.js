export function isTokenExpired(token) {   
    if (!token) return true;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now(); // Check if token has expired
    } catch (error) {
      return true;
    }
  }