const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { Log } = require("../../../logging_middleware/logger");

let localNotifications = [];

const notificationService = {
  // Fetch from external API
  async getNotificationsFromAPI() {
    try {
      await Log("getNotificationsFromAPI", "info", "notificationService", "Fetching from external API");
      const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications"
      );
      await Log("getNotificationsFromAPI", "info", "notificationService", `Retrieved ${response.data.notifications?.length || 0} notifications`);
      return response.data.notifications || [];
    } catch (error) {
      await Log("getNotificationsFromAPI", "error", "notificationService", error.message);
      return [];
    }
  },

  // Get all local notifications
  getAllNotifications() {
    Log("getAllNotifications", "info", "notificationService", `Total notifications: ${localNotifications.length}`).catch(console.error);
    return localNotifications;
  },

  // Create a new notification
  createNotification(data) {
    if (!data.message || !data.priority) {
      const error = "Message and priority are required";
      Log("createNotification", "warn", "notificationService", error).catch(console.error);
      throw new Error(error);
    }

    const notification = {
      id: uuidv4(),
      message: data.message,
      priority: data.priority,
      recipient: data.recipient || "General",
      status: data.status || "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    localNotifications.push(notification);
    Log("createNotification", "info", "notificationService", `Created notification with ID: ${notification.id}`).catch(console.error);
    return notification;
  },

  // Get notification by ID
  getNotificationById(id) {
    const notification = localNotifications.find(n => n.id === id);
    if (notification) {
      Log("getNotificationById", "info", "notificationService", `Found notification ${id}`).catch(console.error);
    } else {
      Log("getNotificationById", "warn", "notificationService", `Notification ${id} not found`).catch(console.error);
    }
    return notification;
  },

  // Update notification
  updateNotification(id, data) {
    const index = localNotifications.findIndex(n => n.id === id);
    if (index === -1) {
      const error = "Notification not found";
      Log("updateNotification", "warn", "notificationService", error).catch(console.error);
      throw new Error(error);
    }

    localNotifications[index] = {
      ...localNotifications[index],
      ...data,
      id: localNotifications[index].id,
      createdAt: localNotifications[index].createdAt,
      updatedAt: new Date().toISOString()
    };

    Log("updateNotification", "info", "notificationService", `Updated notification ${id}`).catch(console.error);
    return localNotifications[index];
  },

  // Delete notification
  deleteNotification(id) {
    const index = localNotifications.findIndex(n => n.id === id);
    if (index === -1) {
      const error = "Notification not found";
      Log("deleteNotification", "warn", "notificationService", error).catch(console.error);
      throw new Error(error);
    }

    const deleted = localNotifications[index];
    localNotifications.splice(index, 1);
    Log("deleteNotification", "info", "notificationService", `Deleted notification ${id}`).catch(console.error);
    return deleted;
  },

  // Search notifications
  searchNotifications(query) {
    const results = localNotifications.filter(n =>
      n.message.toLowerCase().includes(query.toLowerCase()) ||
      n.priority.toLowerCase().includes(query.toLowerCase())
    );
    Log("searchNotifications", "info", "notificationService", `Search for "${query}" found ${results.length} results`).catch(console.error);
    return results;
  }
};

module.exports = notificationService;