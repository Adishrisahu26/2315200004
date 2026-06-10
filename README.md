# Notification Management System

A complete full-stack notification management application with backend API and modern frontend UI.

## 🎯 Project Overview

This project implements a comprehensive notification management system with:
- **Backend API** (Node.js + Express) - RESTful API for managing notifications
- **Frontend UI** (HTML5 + CSS3 + Vanilla JS) - Modern, responsive user interface
- **Logging Middleware** - Request/response logging for debugging
- **External API Integration** - Fetch notifications from external evaluation service

## 📁 Project Structure

```
notification_system_design.md       # System design documentation
README.md                          # This file
logging_middleware/
  └── logger.js                    # Logging middleware
notification_app_be/
  ├── server.js                    # Express server entry point
  ├── package.json                 # Backend dependencies
  └── src/
      ├── app.js                   # Express app configuration
      ├── services/
      │   └── notificationService.js  # Business logic & API calls
      └── utils/
          └── prioritySort.js      # Priority sorting utility
notification_app_fe/
  └── index.html                   # Full-featured frontend application
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Installation & Running

1. **Install Backend Dependencies**
   ```bash
   cd notification_app_be
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   node server.js
   ```
   Server will run on `http://localhost:3001`

3. **Open Frontend**
   - Open `notification_app_fe/index.html` in a web browser
   - Or use Python HTTP server: `python -m http.server 8000 --directory notification_app_fe`

## 📡 API Endpoints

### Create Notification
```
POST /notifications
{
  "message": "Your message",
  "priority": "high|medium|low|critical",
  "recipient": "User Name"
}
```

### Get All Notifications
```
GET /notifications
```

### Get Single Notification
```
GET /notifications/:id
```

### Update Notification
```
PUT /notifications/:id
{
  "status": "pending|read|archived",
  "message": "Updated message",
  "priority": "high"
}
```

### Delete Notification
```
DELETE /notifications/:id
```

### Search Notifications
```
GET /notifications/search/:query
```

### Fetch from External API
```
GET /notifications/api/external
```

## 🎨 Frontend Features

### Dashboard
- View all notifications with color-coded priorities
- Real-time notification management
- Search and filter functionality
- Responsive design for all devices

### Create Notifications
- Compose notifications with message, priority, and recipient
- Form validation
- Instant feedback with success/error messages

### Manage Notifications
- Update notification status (Pending, Read, Archived)
- Delete notifications with confirmation
- View metadata (creation time, recipient)

### External API Integration
- Fetch notifications from evaluation service
- Automatic error handling
- User feedback via alerts

## 🔧 Backend Service Details

### NotificationService Methods

- **`getNotificationsFromAPI()`** - Fetch from external API
- **`getAllNotifications()`** - Get all stored notifications
- **`createNotification(data)`** - Create new notification
- **`getNotificationById(id)`** - Get notification by ID
- **`updateNotification(id, data)`** - Update notification
- **`deleteNotification(id)`** - Delete notification
- **`searchNotifications(query)`** - Search notifications

## 🎯 Priority Levels

| Priority | Color  | Icon | Use Case |
|----------|--------|------|----------|
| Critical | 🔴 Red | 🔴   | System errors, urgent issues |
| High     | 🟠 Orange | 🟠 | Important updates, warnings |
| Medium   | 🟡 Yellow | 🟡 | Regular updates, reminders |
| Low      | 🟢 Green | 🟢 | General information |

## 📊 Notification Object

```json
{
  "id": "uuid-string",
  "message": "Notification text",
  "priority": "high|medium|low|critical",
  "recipient": "User Name",
  "status": "pending|read|archived",
  "createdAt": "ISO-8601 timestamp",
  "updatedAt": "ISO-8601 timestamp"
}
```

## 📦 Dependencies

### Backend
- `express` - Web framework
- `axios` - HTTP client
- `uuid` - Unique identifiers

### Frontend
- Pure HTML5, CSS3, Vanilla JavaScript (no dependencies!)

## 🌐 CORS & Middleware

- CORS enabled for all origins
- Request logging middleware
- JSON body parsing
- Standard HTTP method support

## 🧪 Testing

Use Thunder Client, Postman, or cURL to test endpoints:

```bash
# Create notification
curl -X POST http://localhost:3001/notifications \
  -H "Content-Type: application/json" \
  -d '{"message":"Test","priority":"high","recipient":"Admin"}'

# Get all notifications
curl http://localhost:3001/notifications

# Delete notification
curl -X DELETE http://localhost:3001/notifications/{id}
```

## 📝 Logging

All requests are logged with timestamp, method, and path for debugging and monitoring.

## 🔐 Error Handling

- **400** - Bad request (validation errors)
- **404** - Notification not found
- **500** - Server error

Error response format:
```json
{
  "success": false,
  "error": "Error description"
}
```

## 🎓 Key Features

✅ Full CRUD operations  
✅ Priority-based notification system  
✅ Search and filter capabilities  
✅ External API integration  
✅ Responsive mobile-friendly UI  
✅ Real-time updates  
✅ Error handling and validation  
✅ RESTful API design  

## 👤 Author

Adishri Sahu (Roll No: 2315200004)

## 📄 License

ISC

---

**Status: ✅ COMPLETE AND RUNNING**

Server: http://localhost:3001  
Frontend: Open `notification_app_fe/index.html` in browser
