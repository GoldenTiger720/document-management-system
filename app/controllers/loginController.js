// Login Controller
app.controller('LoginController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

    // Redirect if already authenticated
    if (AuthService.isAuthenticated()) {
        $location.path('/dashboard');
        return;
    }

    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.error = '';
    $scope.loading = false;

    // Demo credentials info
    $scope.demoAccounts = [
        { username: 'admin1', password: 'admin123', role: 'Admin (Finance)' },
        { username: 'admin2', password: 'admin123', role: 'Admin (HR)' },
        { username: 'operator1', password: 'oper123', role: 'Operator (Finance)' },
        { username: 'operator2', password: 'oper123', role: 'Operator (HR)' }
    ];

    $scope.login = function() {
        $scope.error = '';

        if (!$scope.credentials.username || !$scope.credentials.password) {
            $scope.error = 'Please enter username and password';
            return;
        }

        $scope.loading = true;

        // Simulate API call delay
        setTimeout(function() {
            $scope.$apply(function() {
                var success = AuthService.login($scope.credentials.username, $scope.credentials.password);

                if (success) {
                    $location.path('/dashboard');
                } else {
                    $scope.error = 'Invalid username or password';
                    $scope.loading = false;
                }
            });
        }, 800);
    };

    $scope.quickLogin = function(username, password) {
        $scope.credentials.username = username;
        $scope.credentials.password = password;
        $scope.login();
    };
}]);
