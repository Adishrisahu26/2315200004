const express = require("express");
const notificationService = require("./src/services/notificationService");
const { logger, setAuthToken, Log } = require("../logging_middleware/logger");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// ========================================
// Authentication Route
// ========================================
app.post("/auth", async (req, res) => {
  try {
    const { clientID, clientSecret, rollNo, accessCode } = req.body;

    if (!clientID || !clientSecret) {
      await Log("POST /auth", "warn", "auth-service", "Missing credentials");
      return res.status(400).json({ 
        success: false, 
        error: "clientID and clientSecret required" 
      });
    }

    // Call evaluation service for authentication
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/auth",
      { clientID, clientSecret, rollNo, accessCode }
    );

    const token = response.data.token || response.data.authorization;
    
    if (token) {
      setAuthToken(token);
      await Log("POST /auth", "info", "auth-service", "Authentication successful");
      
      return res.json({ 
        success: true, 
        token, 
        message: "Authenticated successfully" 
      });
    }

    throw new Error("No token in response");
  } catch (error) {
    await Log("POST /auth", "error", "auth-service", error.message);
    res.status(401).json({ 
      success: false, 
      error: error.response?.data?.message || error.message 
    });
  }
});

// ========================================
// Notification Routes
// ========================================
app.get("/", (req, res) => {
  res.send("Notification Backend Running");
});

// Get all notifications
app.get("/notifications", async (req, res) => {
  try {
    const notifications = notificationService.getAllNotifications();
    await Log("GET /notifications", "info", "notification-service", `Retrieved ${notifications.length} notifications`);
    res.json({ success: true, data: notifications });
  } catch (error) {
    await Log("GET /notifications", "error", "notification-service", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get notifications from external API
app.get("/notifications/api/external", async (req, res) => {
  try {
    const notifications = await notificationService.getNotificationsFromAPI();
    await Log("GET /notifications/api/external", "info", "notification-service", "Fetched from external API");
    res.json({ success: true, data: notifications });
  } catch (error) {
    await Log("GET /notifications/api/external", "error", "notification-service", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single notification
app.get("/notifications/:id", async (req, res) => {
  try {
    const notification = notificationService.getNotificationById(req.params.id);
    if (!notification) {
      await Log("GET /notifications/:id", "warn", "notification-service", "Notification not found");
      return res.status(404).json({ success: false, error: "Notification not found" });
    }
    await Log("GET /notifications/:id", "info", "notification-service", `Retrieved notification ${req.params.id}`);
    res.json({ success: true, data: notification });
  } catch (error) {
    await Log("GET /notifications/:id", "error", "notification-service", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create notification
app.post("/notifications", async (req, res) => {
  try {
    const notification = notificationService.createNotification(req.body);
    await Log("POST /notifications", "info", "notification-service", `Created notification: ${notification.message.substring(0, 50)}`);
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    await Log("POST /notifications", "error", "notification-service", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update notification
app.put("/notifications/:id", async (req, res) => {
  try {
    const notification = notificationService.updateNotification(req.params.id, req.body);
    await Log("PUT /notifications/:id", "info", "notification-service", `Updated notification ${req.params.id}`);
    res.json({ success: true, data: notification });
  } catch (error) {
    await Log("PUT /notifications/:id", "error", "notification-service", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete notification
app.delete("/notifications/:id", async (req, res) => {
  try {
    const deleted = notificationService.deleteNotification(req.params.id);
    await Log("DELETE /notifications/:id", "info", "notification-service", `Deleted notification ${req.params.id}`);
    res.json({ success: true, data: deleted, message: "Notification deleted" });
  } catch (error) {
    await Log("DELETE /notifications/:id", "error", "notification-service", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Search notifications
app.get("/notifications/search/:query", async (req, res) => {
  try {
    const results = notificationService.searchNotifications(req.params.query);
    await Log("GET /notifications/search/:query", "info", "notification-service", `Search for "${req.params.query}" returned ${results.length} results`);
    res.json({ success: true, data: results });
  } catch (error) {
    await Log("GET /notifications/search/:query", "error", "notification-service", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(3001, () => {
  console.log("✓ Server running on http://localhost:3001");
  Log("SERVER", "info", "notification-backend", "Server started on port 3001").catch(console.error);
});