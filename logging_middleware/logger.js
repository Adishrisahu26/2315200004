// logger.js - Enhanced Logging Middleware with API Integration
let axios;
try {
  axios = require("axios");
} catch (e) {
  // axios is optional - needed only for API logging
  axios = null;
}

// Configuration
const API_BASE = "http://4.224.186.213/evaluation-service";
let authToken = null; // Will be set after authentication

// ========================================
// Reusable Log Function
// ========================================
const Log = async (stack, level, packageName, message) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    stack,
    level,
    package: packageName,
    message,
    timestamp
  };

  // 1. Log to console (local logging)
  console.log(
    `[${timestamp}] [${level.toUpperCase()}] [${packageName}] ${stack}: ${message}`
  );

  // 2. Send to API (if auth token available and axios is loaded)
  if (authToken && axios) {
    try {
      await axios.post(`${API_BASE}/logs`, logEntry, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Failed to send log to API:", error.message);
      // Don't throw - logging failures shouldn't break the app
    }
  }

  return logEntry;
};

// ========================================
// Express Middleware
// ========================================
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${req.method} ${req.url}`;
  
  console.log(`[${timestamp}] ${logMessage}`);
  
  // Log this request (async, non-blocking)
  Log(req.method, "info", "http-request", logMessage).catch(err => 
    console.error("Logging error:", err.message)
  );

  next();
};

// ========================================
// Set Auth Token
// ========================================
const setAuthToken = (token) => {
  authToken = token;
  console.log("✓ Auth token set for logging API");
};

// ========================================
// Get Auth Token
// ========================================
const getAuthToken = () => authToken;

// ========================================
// Exports
// ========================================
module.exports = {
  logger,           // Express middleware
  Log,              // Reusable logging function
  setAuthToken,     // Set auth token for API
  getAuthToken      // Get current auth token
};