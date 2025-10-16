// Notification Controller
app.controller('NotificationController', ['$scope', '$rootScope', 'NotificationService',
    function($scope, $rootScope, NotificationService) {

    $scope.notifications = [];
    $scope.selectedNotification = null;
    $scope.showDetailsModal = false;
    $scope.filterType = 'all';

    // Initialize
    $scope.init = function() {
        $scope.loadNotifications();
    };

    // Load notifications
    $scope.loadNotifications = function() {
        $scope.notifications = NotificationService.getNotifications();
        $scope.applyFilter();
    };

    // Apply filter
    $scope.applyFilter = function() {
        if ($scope.filterType === 'all') {
            $scope.filteredNotifications = $scope.notifications;
        } else if ($scope.filterType === 'unread') {
            $scope.filteredNotifications = $scope.notifications.filter(function(n) {
                return !n.read;
            });
        } else {
            $scope.filteredNotifications = $scope.notifications.filter(function(n) {
                return n.type === $scope.filterType;
            });
        }
    };

    // Watch for filter changes
    $scope.$watch('filterType', function() {
        $scope.applyFilter();
    });

    // Open notification details
    $scope.openNotificationDetails = function(notification) {
        // Mark as read
        if (!notification.read) {
            NotificationService.markAsRead(notification.id);
            notification.read = true;
        }

        $scope.selectedNotification = notification;
        $scope.showDetailsModal = true;
    };

    // Close details modal
    $scope.closeDetailsModal = function() {
        $scope.showDetailsModal = false;
        $scope.selectedNotification = null;
    };

    // Mark all as read
    $scope.markAllAsRead = function() {
        NotificationService.markAllAsRead();
        $scope.loadNotifications();
        $rootScope.showToast('All notifications marked as read', 'success');
    };

    // Delete notification
    $scope.deleteNotification = function(notification, event) {
        if (event) {
            event.stopPropagation();
        }

        if (confirm('Are you sure you want to delete this notification?')) {
            NotificationService.deleteNotification(notification.id);
            $scope.loadNotifications();
            $rootScope.showToast('Notification deleted', 'success');
        }
    };

    // Get notification icon
    $scope.getNotificationIcon = function(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'warning': return 'fa-exclamation-triangle';
            case 'error': return 'fa-times-circle';
            case 'info': return 'fa-info-circle';
            default: return 'fa-bell';
        }
    };

    // Download attachment (mock)
    $scope.downloadAttachment = function(attachment) {
        $rootScope.showToast('Downloading ' + attachment + '...', 'info');
    };

    // View PDF (mock)
    $scope.viewPDF = function(notification) {
        if (notification.relatedDocument && notification.relatedDocument.pdfUrl) {
            window.open(notification.relatedDocument.pdfUrl, '_blank');
        } else {
            $rootScope.showToast('PDF not available', 'warning');
        }
    };

    // Listen for new notifications
    $scope.$on('new-notification', function(event, notification) {
        $scope.loadNotifications();
    });

    // Listen for notification read events
    $scope.$on('notification-read', function() {
        $scope.loadNotifications();
    });

    // Initialize
    $scope.init();
}]);
