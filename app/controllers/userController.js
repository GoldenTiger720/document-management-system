// User Management Controller
app.controller('UserController', ['$scope', '$rootScope', 'AuthService', 'UserService', 'DepartmentService',
    function($scope, $rootScope, AuthService, UserService, DepartmentService) {

    $scope.currentUser = AuthService.getCurrentUser();
    $scope.users = [];
    $scope.filteredUsers = [];
    $scope.searchQuery = '';
    $scope.showCreateModal = false;
    $scope.showEditModal = false;
    $scope.selectedUser = null;

    // New user form
    $scope.newUser = {
        username: '',
        password: '',
        name: '',
        email: '',
        role: 'operator'
    };

    // Edit user form
    $scope.editUser = {};

    // Filters
    $scope.filters = {
        status: 'all',
        role: 'all'
    };

    // Initialize
    $scope.init = function() {
        $scope.loadUsers();
    };

    // Load users
    $scope.loadUsers = function() {
        try {
            $scope.users = UserService.getUsers();
            $scope.applyFilters();
        } catch (error) {
            $rootScope.showToast(error.message, 'error');
        }
    };

    // Apply filters
    $scope.applyFilters = function() {
        $scope.filteredUsers = $scope.users.filter(function(user) {
            var matchesSearch = !$scope.searchQuery ||
                user.name.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) > -1 ||
                user.username.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) > -1 ||
                user.email.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) > -1;

            var matchesStatus = $scope.filters.status === 'all' ||
                ($scope.filters.status === 'active' && user.active) ||
                ($scope.filters.status === 'inactive' && !user.active);

            var matchesRole = $scope.filters.role === 'all' || user.role === $scope.filters.role;

            return matchesSearch && matchesStatus && matchesRole;
        });
    };

    // Watch for search and filter changes
    $scope.$watch('searchQuery', function() {
        $scope.applyFilters();
    });

    $scope.$watch('filters', function() {
        $scope.applyFilters();
    }, true);

    // Open create modal
    $scope.openCreateModal = function() {
        $scope.newUser = {
            username: '',
            password: '',
            name: '',
            email: '',
            role: 'operator'
        };
        $scope.showCreateModal = true;
    };

    // Close create modal
    $scope.closeCreateModal = function() {
        $scope.showCreateModal = false;
    };

    // Create user
    $scope.createUser = function() {
        try {
            if (!$scope.newUser.username || !$scope.newUser.password ||
                !$scope.newUser.name || !$scope.newUser.email) {
                $rootScope.showToast('Please fill in all fields', 'error');
                return;
            }

            UserService.createUser($scope.newUser);
            $rootScope.showToast('User created successfully', 'success');
            $scope.closeCreateModal();
            $scope.loadUsers();
        } catch (error) {
            $rootScope.showToast(error.message, 'error');
        }
    };

    // Open edit modal
    $scope.openEditModal = function(user) {
        $scope.selectedUser = user;
        $scope.editUser = angular.copy(user);
        $scope.showEditModal = true;
    };

    // Close edit modal
    $scope.closeEditModal = function() {
        $scope.showEditModal = false;
        $scope.selectedUser = null;
    };

    // Update user
    $scope.updateUser = function() {
        try {
            UserService.updateUser($scope.selectedUser.id, $scope.editUser);
            $rootScope.showToast('User updated successfully', 'success');
            $scope.closeEditModal();
            $scope.loadUsers();
        } catch (error) {
            $rootScope.showToast(error.message, 'error');
        }
    };

    // Deactivate user
    $scope.deactivateUser = function(user) {
        if (confirm('Are you sure you want to deactivate ' + user.name + '?')) {
            try {
                UserService.deactivateUser(user.id);
                $rootScope.showToast('User deactivated successfully', 'success');
                $scope.loadUsers();
            } catch (error) {
                $rootScope.showToast(error.message, 'error');
            }
        }
    };

    // Reactivate user
    $scope.reactivateUser = function(user) {
        try {
            UserService.reactivateUser(user.id);
            $rootScope.showToast('User reactivated successfully', 'success');
            $scope.loadUsers();
        } catch (error) {
            $rootScope.showToast(error.message, 'error');
        }
    };

    // Get user statistics
    $scope.getUserStats = function() {
        return UserService.getUserStats();
    };

    // Initialize
    $scope.init();
}]);
