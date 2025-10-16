# Quick Start Guide

## Starting the Application

### Method 1: Using the Startup Script (Recommended)
```bash
cd /home/administrator/Documents/angular-project
./start-server.sh
```

Then open your browser and navigate to: `http://localhost:8000`

### Method 2: Manual Server Start

**Using Python 3:**
```bash
cd /home/administrator/Documents/angular-project
python3 -m http.server 8000
```

**Using Python 2:**
```bash
cd /home/administrator/Documents/angular-project
python -m SimpleHTTPServer 8000
```

**Using PHP:**
```bash
cd /home/administrator/Documents/angular-project
php -S localhost:8000
```

**Using Node.js:**
```bash
cd /home/administrator/Documents/angular-project
npx http-server -p 8000
```

### Method 3: Direct Browser Access
Simply open `index.html` in your browser (some features may not work without a web server)

## Demo Login Credentials

### Finance Department
- **Administrator**: `admin1` / `admin123`
- **Operator**: `operator1` / `oper123`

### HR Department
- **Administrator**: `admin2` / `admin123`
- **Operator**: `operator2` / `oper123`

## Feature Highlights

### For Administrators:
1. **Dashboard**: View department statistics and recent activity
2. **User Management**: Create, edit, and deactivate users in your department
3. **Documents**: Upload, view, and manage documents
4. **Sign Documents**: Digitally sign pending documents with password verification
5. **Notifications**: View system notifications and alerts

### For Operators:
1. **Dashboard**: View department statistics and recent activity
2. **Documents**: View documents in your department
3. **Notifications**: View system notifications and alerts

## Quick Workflow Example

### Signing a Document (Administrator Only)

1. **Login** as an administrator (e.g., admin1 / admin123)
2. Navigate to **"Documents"** or **"Sign Document"**
3. You'll see pending documents that need signatures
4. Click **"Sign Document"** or the pen icon
5. Enter your **password** (admin123)
6. Enter the **document key** shown on the document (e.g., FIN-2024-002)
7. Click **"Sign Document"**
8. ✓ Document is now signed with cryptographic evidence!

### Creating a New User (Administrator Only)

1. **Login** as an administrator
2. Navigate to **"Users"**
3. Click **"Create New User"**
4. Fill in the form:
   - Username (unique)
   - Password
   - Full Name
   - Email
   - Role (Administrator or Operator)
5. Click **"Create User"**
6. ✓ New user is created in your department!

### Viewing Notifications

1. Click the **bell icon** in the top navigation
2. See recent notifications in the dropdown
3. Click **"View all notifications"** for the full list
4. Click any notification to view detailed information
5. View related documents, attachments, and PDFs

### Switching Themes

1. Click the **moon/sun icon** in the top navigation
2. Theme switches between light and dark mode instantly
3. Your preference is saved automatically

## Department Access Rules

**Important**: Each administrator can ONLY:
- View and manage users in their own department
- View and sign documents from their own department
- See notifications related to their department

Example:
- `admin1` (Finance) can only see Finance users and documents
- `admin2` (HR) can only see HR users and documents

## UI Features

- **Modern Design**: Clean, professional interface with beautiful backgrounds
- **Responsive**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Notifications update in real-time
- **Smooth Animations**: Polished transitions throughout
- **Toast Notifications**: Get instant feedback on actions
- **Modal Dialogs**: Intuitive forms and detail views

## Tips

1. **Test Different Roles**: Login as different users to see role-based access control
2. **Try Different Departments**: Compare Finance vs HR department access
3. **Explore Notifications**: Click notifications to see detailed document information
4. **Use Search & Filters**: Filter users and documents easily
5. **Check Signature Evidence**: View complete audit trails for signed documents

## Troubleshooting

**Application won't load?**
- Make sure you're using a web server (not just opening the file)
- Check browser console for errors (F12)

**Login not working?**
- Double-check the credentials match exactly
- Try using the "Quick Login" buttons on the login page

**Features not appearing?**
- Make sure you're logged in as the correct role
- Administrators have more features than Operators

## Next Steps

1. Explore the dashboard
2. Try creating a new user (as admin)
3. Upload a document
4. Sign a document
5. View notifications
6. Switch between light/dark themes
7. Test with different user accounts

Enjoy your Document Management System! 🎉
