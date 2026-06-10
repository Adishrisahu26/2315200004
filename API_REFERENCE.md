# API Reference Guide

## Base URL
```
http://localhost:3001
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* notification or array of notifications */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message description"
}
```

---

## Endpoints

### 1. GET /notifications
**Description:** Get all notifications

**Request:**
```
GET /notifications
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "message": "System update completed",
      "priority": "high",
      "recipient": "Admin",
      "status": "read",
      "createdAt": "2026-06-10T10:30:00.000Z",
      "updatedAt": "2026-06-10T11:00:00.000Z"
    }
  ]
}
```

---

### 2. GET /notifications/:id
**Description:** Get a specific notification by ID

**Request:**
```
GET /notifications/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "message": "System update completed",
    "priority": "high",
    "recipient": "Admin",
    "status": "read",
    "createdAt": "2026-06-10T10:30:00.000Z",
    "updatedAt": "2026-06-10T11:00:00.000Z"
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "error": "Notification not found"
}
```

---

### 3. POST /notifications
**Description:** Create a new notification

**Request:**
```
POST /notifications
Content-Type: application/json

{
  "message": "System maintenance scheduled for tonight",
  "priority": "critical",
  "recipient": "All Users",
  "status": "pending"
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| message | string | Yes | Notification message |
| priority | string | Yes | critical, high, medium, low |
| recipient | string | No | Recipient name (default: "General") |
| status | string | No | pending, read, archived (default: "pending") |

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "message": "System maintenance scheduled for tonight",
    "priority": "critical",
    "recipient": "All Users",
    "status": "pending",
    "createdAt": "2026-06-10T10:30:00.000Z",
    "updatedAt": "2026-06-10T10:30:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "error": "Message and priority are required"
}
```

---

### 4. PUT /notifications/:id
**Description:** Update a notification

**Request:**
```
PUT /notifications/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "status": "read",
  "priority": "medium",
  "message": "Updated message text"
}
```

**Parameters:**
Any of the notification fields can be updated. Only provide fields you want to change.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "message": "Updated message text",
    "priority": "medium",
    "recipient": "All Users",
    "status": "read",
    "createdAt": "2026-06-10T10:30:00.000Z",
    "updatedAt": "2026-06-10T10:35:00.000Z"
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "error": "Notification not found"
}
```

---

### 5. DELETE /notifications/:id
**Description:** Delete a notification

**Request:**
```
DELETE /notifications/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "message": "System update completed",
    "priority": "high",
    "recipient": "Admin",
    "status": "read",
    "createdAt": "2026-06-10T10:30:00.000Z",
    "updatedAt": "2026-06-10T11:00:00.000Z"
  },
  "message": "Notification deleted"
}
```

**Error (404):**
```json
{
  "success": false,
  "error": "Notification not found"
}
```

---

### 6. GET /notifications/search/:query
**Description:** Search notifications by message or priority

**Request:**
```
GET /notifications/search/urgent
```

**Query Parameter:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search term (case-insensitive) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "message": "Urgent system update required",
      "priority": "critical",
      "recipient": "Admin",
      "status": "pending",
      "createdAt": "2026-06-10T10:30:00.000Z",
      "updatedAt": "2026-06-10T10:30:00.000Z"
    }
  ]
}
```

---

### 7. GET /notifications/api/external
**Description:** Fetch notifications from external evaluation service

**Request:**
```
GET /notifications/api/external
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "external-notification-id",
      "message": "External notification",
      "priority": "high",
      "recipient": "User",
      "status": "pending",
      "createdAt": "2026-06-10T10:30:00.000Z",
      "updatedAt": "2026-06-10T10:30:00.000Z"
    }
  ]
}
```

**Error (if API unavailable):**
```json
{
  "success": true,
  "data": []
}
```

---

## cURL Examples

### Create Notification
```bash
curl -X POST http://localhost:3001/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test notification",
    "priority": "high",
    "recipient": "Test User"
  }'
```

### Get All Notifications
```bash
curl http://localhost:3001/notifications
```

### Get Single Notification
```bash
curl http://localhost:3001/notifications/550e8400-e29b-41d4-a716-446655440000
```

### Update Notification
```bash
curl -X PUT http://localhost:3001/notifications/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"status": "read"}'
```

### Delete Notification
```bash
curl -X DELETE http://localhost:3001/notifications/550e8400-e29b-41d4-a716-446655440000
```

### Search Notifications
```bash
curl http://localhost:3001/notifications/search/urgent
```

### Fetch External API
```bash
curl http://localhost:3001/notifications/api/external
```

---

## Status Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input, missing fields |
| 404 | Not Found | Notification doesn't exist |
| 500 | Server Error | Internal server error |

---

## Priority Levels

| Priority | Value | Color |
|----------|-------|-------|
| Critical | critical | 🔴 Red |
| High | high | 🟠 Orange |
| Medium | medium | 🟡 Yellow |
| Low | low | 🟢 Green |

---

## Status Values

| Status | Meaning |
|--------|---------|
| pending | Notification not yet read |
| read | Notification has been read |
| archived | Notification is archived |

---

## Rate Limiting

Currently: No rate limiting (for development)

---

## Authentication

Currently: No authentication required (for development)

---

## Tips

1. **Always include Content-Type header for POST/PUT:**
   ```
   -H "Content-Type: application/json"
   ```

2. **Use proper HTTP methods:**
   - GET for retrieving data
   - POST for creating data
   - PUT for updating data
   - DELETE for removing data

3. **Handle errors gracefully:**
   ```javascript
   if (!response.success) {
     console.error(response.error);
   }
   ```

4. **Pagination:** Not currently implemented, but can be added

---

**Last Updated:** 2026-06-10
