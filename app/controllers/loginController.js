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
        password: '',
        role: '',
        department: ''
    };

    $scope.error = '';
    $scope.loading = false;

    $scope.login = function() {
        $scope.error = '';

        if (!$scope.credentials.username || !$scope.credentials.password ||
            !$scope.credentials.role || !$scope.credentials.department) {
            $scope.error = 'Please fill in all fields';
            return;
        }

        $scope.loading = true;

        // Simulate API call delay
        setTimeout(function() {
            $scope.$apply(function() {
                var success = AuthService.login(
                    $scope.credentials.username,
                    $scope.credentials.password,
                    $scope.credentials.role,
                    $scope.credentials.department
                );

                if (success) {
                    $location.path('/dashboard');
                } else {
                    $scope.error = 'Invalid credentials or user already exists';
                    $scope.loading = false;
                }
            });
        }, 800);
    };
}]);
