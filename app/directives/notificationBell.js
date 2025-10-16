// Notification Bell Directive
app.directive('notificationBell', ['NotificationService', '$location', function(NotificationService, $location) {
    return {
        restrict: 'E',
        template: `
            <div class="notification-bell">
                <button class="notification-button" ng-click="toggleDropdown()">
                    <i class="fas fa-bell"></i>
                    <span class="notification-badge" ng-if="unreadCount > 0">{{unreadCount}}</span>
                </button>
                <div class="notification-dropdown" ng-show="showDropdown">
                    <div class="notification-header">
                        <h4>Notifications</h4>
                        <button ng-click="markAllAsRead()" ng-if="unreadCount > 0">
                            <i class="fas fa-check-double"></i> Mark all read
                        </button>
                    </div>
                    <div class="notification-list">
                        <div class="notification-item"
                             ng-repeat="notification in recentNotifications"
                             ng-class="{'unread': !notification.read}"
                             ng-click="viewNotification(notification)">
                            <div class="notification-icon" ng-class="'notification-' + notification.type">
                                <i class="fas" ng-class="{
                                    'fa-check-circle': notification.type === 'success',
                                    'fa-exclamation-triangle': notification.type === 'warning',
                                    'fa-times-circle': notification.type === 'error',
                                    'fa-info-circle': notification.type === 'info'
                                }"></i>
                            </div>
                            <div class="notification-content">
                                <h5>{{notification.title}}</h5>
                                <p>{{notification.message}}</p>
                                <span class="notification-time">{{formatTime(notification.timestamp)}}</span>
                            </div>
                        </div>
                        <div class="notification-empty" ng-if="recentNotifications.length === 0">
                            <i class="fas fa-inbox"></i>
                            <p>No notifications</p>
                        </div>
                    </div>
                    <div class="notification-footer">
                        <a href="#!/notifications" ng-click="closeDropdown()">View all notifications</a>
                    </div>
                </div>
            </div>
        `,
        link: function(scope, element) {
            scope.showDropdown = false;
            scope.unreadCount = 0;
            scope.recentNotifications = [];

            scope.loadNotifications = function() {
                scope.recentNotifications = NotificationService.getNotifications().slice(0, 5);
                scope.unreadCount = NotificationService.getUnreadCount();
            };

            scope.toggleDropdown = function() {
                scope.showDropdown = !scope.showDropdown;
            };

            scope.closeDropdown = function() {
                scope.showDropdown = false;
            };

            scope.markAllAsRead = function() {
                NotificationService.markAllAsRead();
                scope.loadNotifications();
            };

            scope.viewNotification = function(notification) {
                NotificationService.markAsRead(notification.id);
                scope.closeDropdown();
                $location.path('/notifications');
            };

            scope.formatTime = function(timestamp) {
                var now = new Date();
                var time = new Date(timestamp);
                var diffMs = now - time;
                var diffMins = Math.floor(diffMs / 60000);
                var diffHours = Math.floor(diffMs / 3600000);
                var diffDays = Math.floor(diffMs / 86400000);

                if (diffMins < 1) return 'Just now';
                if (diffMins < 60) return diffMins + ' min ago';
                if (diffHours < 24) return diffHours + ' hour' + (diffHours > 1 ? 's' : '') + ' ago';
                if (diffDays < 7) return diffDays + ' day' + (diffDays > 1 ? 's' : '') + ' ago';
                return time.toLocaleDateString();
            };

            // Close dropdown when clicking outside
            angular.element(document).on('click', function(event) {
                var isClickInside = element[0].contains(event.target);
                if (!isClickInside && scope.showDropdown) {
                    scope.$apply(function() {
                        scope.showDropdown = false;
                    });
                }
            });

            // Listen for new notifications
            scope.$on('new-notification', function() {
                scope.loadNotifications();
            });

            scope.$on('notification-read', function() {
                scope.loadNotifications();
            });

            // Initialize
            scope.loadNotifications();

            // Poll for updates every 30 seconds
            setInterval(function() {
                scope.$apply(function() {
                    scope.loadNotifications();
                });
            }, 30000);
        }
    };
}]);
