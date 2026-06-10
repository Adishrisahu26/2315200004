# Quick Start Guide

## 🚀 Start the Application (2 Steps)

### Step 1: Start Backend Server
```bash
cd notification_app_be
node server.js
```
✓ Server running on `http://localhost:3001`

### Step 2: Open Frontend
```bash
# Option A: Direct file
Open `notification_app_fe/index.html` in your web browser

# Option B: Local server (Python 3)
python -m http.server 8000 --directory notification_app_fe
Then visit: http://localhost:8000
```

---

## 💡 Example Usage

### Create a Notification (via Frontend)
1. Enter message: "System maintenance scheduled"
2. Select priority: "High"
3. Enter recipient: "Admin Team"
4. Click "Create"

### Create a Notification (via API/Thunder Client)
```
POST http://localhost:3001/notifications
Content-Type: application/json

{
  "message": "Important update",
  "priority": "critical",
  "recipient": "All Users"
}
```

### Get All Notifications
```
GET http://localhost:3001/notifications
```

### Search Notifications
```
GET http://localhost:3001/notifications/search/urgent
```

### Delete Notification
```
DELETE http://localhost:3001/notifications/{notification-id}
```

---

## 🔗 Important Links

| Service | URL |
|---------|-----|
| Backend API | http://localhost:3001 |
| Frontend | http://localhost:8000 (if using server) |
| API Docs | See README.md |

---

## 📋 Priority Levels

- 🔴 **Critical** - System errors, urgent issues
- 🟠 **High** - Important updates, warnings  
- 🟡 **Medium** - Regular updates, reminders
- 🟢 **Low** - General information

---

## ✅ What's Included

✓ Full CRUD API  
✓ Modern responsive frontend  
✓ Priority-based notification system  
✓ Search functionality  
✓ External API integration  
✓ Error handling & validation  
✓ Logging middleware  

---

## 🆘 Troubleshooting

**Port 3001 already in use?**
```bash
# Check what's using the port
netstat -ano | findstr :3001

# Kill the process or modify server.js to use different port
```

**Module not found error?**
```bash
cd notification_app_be
npm install
```

**Frontend can't connect?**
- Ensure backend is running
- Check browser console for errors
- Verify CORS is enabled

---

## 📚 Next Steps

1. Review the backend code in `notification_app_be/src/`
2. Customize the frontend styling in `notification_app_fe/index.html`
3. Test all endpoints using Thunder Client or Postman
4. Try the search and filter features
5. Integrate with your own external APIs

---

**Happy coding! 🎉**
