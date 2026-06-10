const express = require('express');
const notificationService = require('./services/notificationService');
const logger = require('../../logging_middleware/logger');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.post('/notifications', (req, res) => {
  try {
    const notification = notificationService.createNotification(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/notifications', async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/notifications/:id', (req, res) => {
  try {
    const notification = notificationService.getNotificationById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/notifications/:id', (req, res) => {
  try {
    const notification = notificationService.updateNotification(req.params.id, req.body);
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/notifications/:id', (req, res) => {
  try {
    notificationService.deleteNotification(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
