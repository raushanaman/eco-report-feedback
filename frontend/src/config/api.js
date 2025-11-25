// Dynamic API configuration
const getApiConfig = () => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // Default backend port
  const backendPort = 5000;
  
  // Construct backend URL
  const baseURL = `${protocol}//${hostname}:${backendPort}/api`;
  const mediaURL = `${protocol}//${hostname}:${backendPort}`;
  
  return {
    baseURL,
    mediaURL
  };
};

export default getApiConfig;