// notification_app_be/server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/api/notifications', (req, res) => {
  res.json({
    notifications: [
      { id: 1, message: 'Sample notification', read: false },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Notification backend running on http://localhost:${PORT}`);
});
