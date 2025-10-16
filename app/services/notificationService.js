// Notification Service
app.service('NotificationService', ['AuthService', '$rootScope', function(AuthService, $rootScope) {
    var notifications = [
        {
            id: 1,
            title: 'Document Signed Successfully',
            message: 'Annual Financial Report 2024 has been signed',
            type: 'success',
            timestamp: new Date('2024-10-11T14:30:00'),
            read: false,
            department: 'Finance',
            relatedDocument: {
                id: 1,
                name: 'Annual Financial Report 2024',
                documentKey: 'FIN-2024-001',
                attachments: ['balance_sheet.pdf', 'income_statement.pdf'],
                pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            }
        },
        {
            id: 2,
            title: 'New Document Uploaded',
            message: 'Q3 Budget Proposal is awaiting signature',
            type: 'info',
            timestamp: new Date('2024-10-10T09:15:00'),
            read: false,
            department: 'Finance',
            relatedDocument: {
                id: 3,
                name: 'Q3 Budget Proposal',
                documentKey: 'FIN-2024-002',
                attachments: ['budget_breakdown.xlsx', 'projections.pdf'],
                pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            }
        },
        {
            id: 3,
            title: 'Signature Required',
            message: 'Employee Onboarding Form requires your signature',
            type: 'warning',
            timestamp: new Date('2024-10-01T11:00:00'),
            read: true,
            department: 'HR',
            relatedDocument: {
                id: 2,
                name: 'Employee Onboarding Form',
                documentKey: 'HR-2024-045',
                attachments: ['employment_contract.pdf'],
                pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            }
        },
        {
            id: 4,
            title: 'User Account Created',
            message: 'New operator account created: Mike Johnson',
            type: 'info',
            timestamp: new Date('2024-09-28T16:45:00'),
            read: true,
            department: 'Finance',
            relatedDocument: null
        },
        {
            id: 5,
            title: 'Document Expiring Soon',
            message: 'Contract ABC-2024 will expire in 7 days',
            type: 'warning',
            timestamp: new Date('2024-10-14T08:00:00'),
            read: false,
            department: 'Finance',
            relatedDocument: null
        }
    ];

    var nextId = 6;

    // Get notifications for current user's department
    this.getNotifications = function() {
        var currentUser = AuthService.getCurrentUser();
        if (!currentUser) return [];

        return notifications.filter(function(n) {
            return n.department === currentUser.department;
        }).sort(function(a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
    };

    // Get unread count
    this.getUnreadCount = function() {
        var userNotifications = this.getNotifications();
        return userNotifications.filter(function(n) {
            return !n.read;
        }).length;
    };

    // Mark notification as read
    this.markAsRead = function(id) {
        var notification = notifications.find(function(n) {
            return n.id === id;
        });

        if (notification) {
            notification.read = true;
            $rootScope.$broadcast('notification-read');
        }
    };

    // Mark all as read
    this.markAllAsRead = function() {
        var currentUser = AuthService.getCurrentUser();
        notifications.forEach(function(n) {
            if (n.department === currentUser.department) {
                n.read = true;
            }
        });
        $rootScope.$broadcast('notification-read');
    };

    // Get notification by ID
    this.getNotificationById = function(id) {
        var currentUser = AuthService.getCurrentUser();
        var notification = notifications.find(function(n) {
            return n.id === id;
        });

        if (notification && notification.department === currentUser.department) {
            return notification;
        }
        return null;
    };

    // Create new notification
    this.createNotification = function(notificationData) {
        var currentUser = AuthService.getCurrentUser();

        var newNotification = {
            id: nextId++,
            title: notificationData.title,
            message: notificationData.message,
            type: notificationData.type || 'info',
            timestamp: new Date(),
            read: false,
            department: currentUser.department,
            relatedDocument: notificationData.relatedDocument || null
        };

        notifications.unshift(newNotification);
        $rootScope.$broadcast('new-notification', newNotification);
        return newNotification;
    };

    // Delete notification
    this.deleteNotification = function(id) {
        var index = notifications.findIndex(function(n) {
            return n.id === id;
        });

        if (index > -1) {
            notifications.splice(index, 1);
            return true;
        }
        return false;
    };
}]);
