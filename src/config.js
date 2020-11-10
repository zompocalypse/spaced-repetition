export default {
  REACT_APP_API_BASE:
    process.env.REACT_APP_API_BASE || 'http://localhost:8000/api',
  TOKEN_KEY: process.env.TOKEN_KEY || 'spaced-repetition-jwt-secret',
};
