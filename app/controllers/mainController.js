// Main Controller
app.controller('MainController', ['$scope', '$rootScope', '$location', 'AuthService', 'ThemeService',
    function($scope, $rootScope, $location, AuthService, ThemeService) {

    // Initialize
    $scope.isAuthenticated = AuthService.isAuthenticated();
    $scope.currentUser = AuthService.getCurrentUser();
    $scope.showUserMenu = false;
    $scope.toasts = [];

    // Theme toggle
    $scope.toggleTheme = function() {
        ThemeService.toggleTheme();
    };

    // User menu toggle
    $scope.toggleUserMenu = function() {
        $scope.showUserMenu = !$scope.showUserMenu;
    };

    // Close user menu when clicking elsewhere
    angular.element(document).on('click', function(event) {
        var isClickInside = angular.element(event.target).closest('.user-menu').length > 0;
        if (!isClickInside && $scope.showUserMenu) {
            $scope.$apply(function() {
                $scope.showUserMenu = false;
            });
        }
    });

    // Logout
    $scope.logout = function() {
        AuthService.logout();
    };

    // Toast notification system
    $scope.showToast = function(message, type) {
        var toast = {
            message: message,
            type: type || 'info',
            show: true
        };
        $scope.toasts.push(toast);

        setTimeout(function() {
            $scope.$apply(function() {
                toast.show = false;
                setTimeout(function() {
                    var index = $scope.toasts.indexOf(toast);
                    if (index > -1) {
                        $scope.$apply(function() {
                            $scope.toasts.splice(index, 1);
                        });
                    }
                }, 300);
            });
        }, 5000);
    };

    $scope.closeToast = function(index) {
        $scope.toasts[index].show = false;
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.toasts.splice(index, 1);
            });
        }, 300);
    };

    // Listen for route changes
    $rootScope.$on('$routeChangeSuccess', function() {
        $scope.isAuthenticated = AuthService.isAuthenticated();
        $scope.currentUser = AuthService.getCurrentUser();
    });

    // Expose toast to root scope for global access
    $rootScope.showToast = $scope.showToast;
}]);
