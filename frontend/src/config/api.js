// Dynamic API configuration
const getApiConfig = () => {
  // Use environment variable for production, fallback to local development
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = process.env.REACT_APP_API_URL;
  
  if (isProduction && apiUrl) {
    return {
      baseURL: `${apiUrl}/api`,
      mediaURL: apiUrl
    };
  }
  
  // Development configuration
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const backendPort = 5000;
  
  return {
    baseURL: `${protocol}//${hostname}:${backendPort}/api`,
    mediaURL: `${protocol}//${hostname}:${backendPort}`
  };
};

export default getApiConfig;