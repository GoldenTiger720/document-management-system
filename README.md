# Document Management System - DocuSign Pro

A professional, modern document management system built with AngularJS featuring user management, digital document signing, notification system, and signature evidence management.

## Features

### 1. User Management
- **CRUD Operations**: Create, Read, Update, and Deactivate users
- **User Profiles**: Two role types - Administrators and Operators
- **Role-Based Access Control**: Strict access control based on user roles
- **Department Isolation**: Administrators can only manage users within their own department
- **Secure Authentication**: Login system with session management

### 2. Document Signing Module
- **Document Upload**: Upload documents with metadata and attachments
- **Digital Signatures**: Administrators can sign documents using password and document key verification
- **Signature Evidence**: Complete audit trail with IP address, timestamp, certificate method
- **Document Status Tracking**: Track pending and signed documents
- **Department Filtering**: Users can only access documents from their department

### 3. Notification System
- **Real-Time Notifications**: Stay updated with document status changes
- **Notification Types**: Success, Warning, Error, and Info notifications
- **Detailed Views**: Click notifications to view detailed information
- **Document Attachments**: View and download document attachments
- **PDF Integration**: View related PDF documents
- **Notification Bell**: Real-time notification bell with unread count

### 4. Modern UI/UX
- **Dark/Light Theme Toggle**: Switch between themes seamlessly
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Background Images**: Beautiful background images from Unsplash
- **Smooth Animations**: Polished transitions and animations
- **Modern Design Language**: Clean, professional interface using Poppins font

### 5. Signature Evidence Management
- Complete cryptographic signature tracking
- IP address and timestamp logging
- Certificate method documentation
- Secure password verification for document signing

## Technology Stack

- **Frontend Framework**: AngularJS 1.8.2
- **Routing**: ngRoute
- **Animations**: ngAnimate
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Poppins)
- **Images**: Unsplash (via CDN)
- **CSS**: Custom modern CSS with CSS Variables

## Demo Accounts

### Finance Department
| Username | Password | Role | Access |
|----------|----------|------|--------|
| admin1 | admin123 | Administrator | Full access to Finance dept |
| operator1 | oper123 | Operator | Read-only Finance dept |

### HR Department
| Username | Password | Role | Access |
|----------|----------|------|--------|
| admin2 | admin123 | Administrator | Full access to HR dept |
| operator2 | oper123 | Operator | Read-only HR dept |

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. **Clone or download the project**
   ```bash
   cd angular-project
   ```

2. **Serve the application**

   Option A: Using Python
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   Option B: Using Node.js
   ```bash
   npx http-server -p 8000
   ```

   Option C: Using PHP
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

### Quick Start

1. Open the application in your browser
2. Use one of the demo accounts to login (e.g., admin1 / admin123)
3. Explore the dashboard to see statistics and recent activity
4. Navigate to different sections:
   - **Users**: Manage users (Admin only)
   - **Documents**: View and manage documents
   - **Sign Document**: Sign pending documents (Admin only)
   - **Notifications**: View system notifications

## Project Structure

```
angular-project/
├── index.html                          # Main HTML file
├── README.md                           # This file
├── app/
│   ├── app.js                         # Main application module & routing
│   ├── controllers/
│   │   ├── mainController.js          # Main app controller
│   │   ├── loginController.js         # Login page controller
│   │   ├── dashboardController.js     # Dashboard controller
│   │   ├── userController.js          # User management controller
│   │   ├── documentSigningController.js # Document signing controller
│   │   └── notificationController.js  # Notification controller
│   ├── services/
│   │   ├── authService.js             # Authentication service
│   │   ├── userService.js             # User management service
│   │   ├── departmentService.js       # Department service
│   │   ├── documentService.js         # Document management service
│   │   ├── notificationService.js     # Notification service
│   │   └── themeService.js            # Theme toggle service
│   ├── directives/
│   │   ├── userCard.js                # User card component
│   │   └── notificationBell.js        # Notification bell component
│   └── views/
│       ├── login.html                 # Login page
│       ├── dashboard.html             # Dashboard page
│       ├── users.html                 # User management page
│       ├── documents.html             # Documents page
│       ├── sign-document.html         # Document signing page
│       └── notifications.html         # Notifications page
└── css/
    ├── styles.css                     # Main stylesheet
    └── themes.css                     # Theme styles & component styles
```

## Key Features Explained

### Role-Based Access Control
- **Administrators**: Can create users, sign documents, manage department resources
- **Operators**: Can view documents and notifications, but cannot sign or create users
- **Department Isolation**: Users can only see data from their own department

### Document Signing Process
1. Administrator uploads a document with a unique document key
2. Document appears in "Pending Signatures" list
3. Administrator opens the sign modal
4. Administrator enters their password and the document key for verification
5. System creates a digital signature with cryptographic hash
6. Signature evidence is stored (IP, timestamp, certificate method)
7. Document status changes to "Signed"
8. Notification is created for the signing event

### Notification System
- Automatically generates notifications for important events
- Document signing, uploads, and user actions trigger notifications
- Click any notification to view detailed information
- Notifications show related document info, attachments, and PDF links
- Mark individual or all notifications as read
- Delete unwanted notifications

### Theme System
- Toggle between light and dark themes with one click
- Theme preference is saved in browser localStorage
- Smooth transitions between themes
- All UI elements adapt to the selected theme

## Security Features

1. **Session-Based Authentication**: User sessions stored in sessionStorage
2. **Password Verification**: Required for document signing
3. **Document Key Verification**: Double verification for signing
4. **Department Isolation**: Strict access control by department
5. **Role-Based Permissions**: Different capabilities based on role
6. **Signature Evidence**: Complete audit trail for all signatures

## Browser Compatibility

- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓

## Future Enhancements

- Backend API integration
- Real cryptographic signing
- File upload functionality
- Advanced search and filtering
- Export/import capabilities
- Email notifications
- Multi-language support
- Advanced analytics dashboard
- Audit log system
- Two-factor authentication

## Credits

- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)
- **Images**: Unsplash
- **Framework**: AngularJS

## License

This is a demonstration project for educational purposes.

## Support

For issues, questions, or contributions, please refer to the project documentation.

---

**Built with ❤️ using AngularJS**
