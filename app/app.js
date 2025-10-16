// Main AngularJS Application Module
var app = angular.module('docManagementApp', ['ngRoute', 'ngAnimate']);

// Route Configuration
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'app/views/login.html',
            controller: 'LoginController'
        })
        .when('/dashboard', {
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardController',
            resolve: {
                auth: function(AuthService) {
                    return AuthService.requireAuth();
                }
            }
        })
        .when('/users', {
            templateUrl: 'app/views/users.html',
            controller: 'UserController',
            resolve: {
                auth: function(AuthService) {
                    return AuthService.requireAuth();
                },
                adminOnly: function(AuthService) {
                    return AuthService.requireAdmin();
                }
            }
        })
        .when('/documents', {
            templateUrl: 'app/views/documents.html',
            controller: 'DocumentSigningController',
            resolve: {
                auth: function(AuthService) {
                    return AuthService.requireAuth();
                }
            }
        })
        .when('/sign-document', {
            templateUrl: 'app/views/sign-document.html',
            controller: 'DocumentSigningController',
            resolve: {
                auth: function(AuthService) {
                    return AuthService.requireAuth();
                },
                adminOnly: function(AuthService) {
                    return AuthService.requireAdmin();
                }
            }
        })
        .when('/notifications', {
            templateUrl: 'app/views/notifications.html',
            controller: 'NotificationController',
            resolve: {
                auth: function(AuthService) {
                    return AuthService.requireAuth();
                }
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

// Run block - Initialize app
app.run(['$rootScope', '$location', 'AuthService', 'ThemeService', function($rootScope, $location, AuthService, ThemeService) {
    // Initialize theme
    ThemeService.loadTheme();

    // Check authentication on route change
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (!AuthService.isAuthenticated() && next.$$route && next.$$route.originalPath !== '/login') {
            $location.path('/login');
        }
    });

    // Update current path for active navigation
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.currentPath = current.$$route ? current.$$route.originalPath : '';
    });
}]);
