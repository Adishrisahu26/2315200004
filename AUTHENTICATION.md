# Authentication & Registration Guide

## 📋 Step 1: Register with Evaluation Service

### Endpoint
```
POST http://4.224.186.213/evaluation-service/register
```

### Request Body
```json
{
  "email": "adishri.sahu_cs.da23@gla.ac.in",
  "name": "Adishri Sahu",
  "mobileNo": "8115970630",
  "githubUsername": "Adishrisahu26",
  "rollNo": "2315200004",
  "accessCode": "RPsgYt"
}
```

### Response (Keep this safe!)
```json
{
  "email": "adishri.sahu_cs.da23@gla.ac.in",
  "name": "Adishri Sahu",
  "rollNo": "2315200004",
  "accessCode": "RPsgYt",
  "clientID": "d9cbb699-6a27-44a5-8d59-8b1befa816da",
  "clientSecret": "tVJaaaRBSeXcRXeM"
}
```

⚠️ **SAVE YOUR clientID AND clientSecret - You cannot retrieve them again!**

---

## 🔐 Step 2: Authenticate to Get Token

### Endpoint
```
POST http://localhost:3001/auth
```

### Request Body
```json
{
  "clientID": "d9cbb699-6a27-44a5-8d59-8b1befa816da",
  "clientSecret": "tVJaaaRBSeXcRXeM",
  "rollNo": "2315200004",
  "accessCode": "RPsgYt"
}
```

### Response
```json
{
  "success": true,
  "token": "YOUR_AUTH_TOKEN_HERE",
  "message": "Authenticated successfully"
}
```

---

## 🔄 Using the Token

Once authenticated, all subsequent logging will be sent to the evaluation service API with your token.

### Header to Include
```
Authorization: Bearer YOUR_AUTH_TOKEN_HERE
```

---

## 🧪 Test with Thunder Client

### Step 1: Register
1. Create new request
2. Method: **POST**
3. URL: `http://4.224.186.213/evaluation-service/register`
4. Body (JSON):
```json
{
  "email": "adishri.sahu_cs.da23@gla.ac.in",
  "name": "Adishri Sahu",
  "mobileNo": "8115970630",
  "githubUsername": "Adishrisahu26",
  "rollNo": "2315200004",
  "accessCode": "RPsgYt"
}
```
5. Click **Send**
6. **Copy the response** (clientID and clientSecret)

### Step 2: Authenticate
1. Create new request
2. Method: **POST**
3. URL: `http://localhost:3001/auth`
4. Body (JSON):
```json
{
  "clientID": "YOUR_CLIENT_ID",
  "clientSecret": "YOUR_CLIENT_SECRET",
  "rollNo": "2315200004",
  "accessCode": "RPsgYt"
}
```
5. Click **Send**
6. **Copy the token** from response

---

## 📝 What Happens After Authentication

✅ All your application logs are now sent to the evaluation service  
✅ Log entries include: stack, level, package, message, timestamp  
✅ All notification operations are logged automatically  
✅ You can view logs in the evaluation service dashboard  

---

## 🔍 Logged Events

Your notification system automatically logs:
- ✓ Notification creation
- ✓ Notification updates
- ✓ Notification deletion
- ✓ Notification searches
- ✓ External API calls
- ✓ Errors and warnings
- ✓ API endpoint access

---

## 📊 Log Format

Every log entry includes:
```
[Timestamp] [Level] [Package] Stack: Message
```

Example:
```
[2026-06-10T12:30:45.123Z] [INFO] [notification-service] POST /notifications: Created notification: System update required
```

---

## 🚀 Quick Commands (cURL)

### Register
```bash
curl -X POST http://4.224.186.213/evaluation-service/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "adishri.sahu_cs.da23@gla.ac.in",
    "name": "Adishri Sahu",
    "mobileNo": "8115970630",
    "githubUsername": "Adishrisahu26",
    "rollNo": "2315200004",
    "accessCode": "RPsgYt"
  }'
```

### Authenticate
```bash
curl -X POST http://localhost:3001/auth \
  -H "Content-Type: application/json" \
  -d '{
    "clientID": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET",
    "rollNo": "2315200004",
    "accessCode": "RPsgYt"
  }'
```

---

## ⚠️ Important Notes

1. **Register Only Once** - Each email can only be registered once
2. **Save Your Credentials** - clientID and clientSecret cannot be recovered
3. **Keep Token Safe** - Treat your auth token like a password
4. **Update Code** - Replace placeholder credentials with your actual values
5. **Test Locally First** - Make sure your backend is running on port 3001

---

## 🐛 Troubleshooting

### "Email already exists"
- Your email is already registered
- You already have clientID and clientSecret
- Use those credentials to authenticate

### "Invalid credentials"
- Check your clientID and clientSecret
- Verify they match the registration response
- Make sure there are no extra spaces

### "Token authentication failed"
- Get a new token using your clientID and clientSecret
- Make sure your backend is running
- Restart the server after authentication

---

## ✅ Checklist

- [ ] Register with evaluation service
- [ ] Save clientID and clientSecret
- [ ] Start notification backend (port 3001)
- [ ] Authenticate using /auth endpoint
- [ ] Verify logs are being sent
- [ ] Test notification operations

---

**You're all set! Your notification system is now connected to the evaluation service with comprehensive logging.** 🎉
