// User Management Service
app.service('UserService', ['AuthService', function(AuthService) {
    var users = [];
    var nextId = 5;

    // Initialize with users from AuthService
    this.init = function() {
        users = AuthService.getAllUsers();
    };

    // Get all users (filtered by department for non-admins)
    this.getUsers = function() {
        var currentUser = AuthService.getCurrentUser();
        if (currentUser.role === 'administrator') {
            // Admin can only see users from their department
            return users.filter(function(u) {
                return u.department === currentUser.department;
            });
        }
        return [];
    };

    // Get user by ID
    this.getUserById = function(id) {
        return users.find(function(u) {
            return u.id === id;
        });
    };

    // Create new user (Admin only)
    this.createUser = function(userData) {
        var currentUser = AuthService.getCurrentUser();

        if (currentUser.role !== 'administrator') {
            throw new Error('Only administrators can create users');
        }

        // Check if username already exists
        var existingUser = users.find(function(u) {
            return u.username === userData.username;
        });

        if (existingUser) {
            throw new Error('Username already exists');
        }

        var newUser = {
            id: nextId++,
            username: userData.username,
            password: userData.password,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            department: currentUser.department, // User inherits admin's department
            active: true,
            createdAt: new Date(),
            createdBy: currentUser.id
        };

        users.push(newUser);
        return angular.copy(newUser);
    };

    // Update user
    this.updateUser = function(id, userData) {
        var currentUser = AuthService.getCurrentUser();
        var user = this.getUserById(id);

        if (!user) {
            throw new Error('User not found');
        }

        // Check department access
        if (user.department !== currentUser.department) {
            throw new Error('Access denied: Cannot modify users from other departments');
        }

        // Update allowed fields
        user.name = userData.name || user.name;
        user.email = userData.email || user.email;

        if (currentUser.role === 'administrator') {
            user.role = userData.role || user.role;
        }

        if (userData.password) {
            user.password = userData.password;
        }

        user.updatedAt = new Date();
        user.updatedBy = currentUser.id;

        return angular.copy(user);
    };

    // Deactivate user (soft delete)
    this.deactivateUser = function(id) {
        var currentUser = AuthService.getCurrentUser();
        var user = this.getUserById(id);

        if (!user) {
            throw new Error('User not found');
        }

        // Check department access
        if (user.department !== currentUser.department) {
            throw new Error('Access denied: Cannot deactivate users from other departments');
        }

        // Cannot deactivate yourself
        if (user.id === currentUser.id) {
            throw new Error('Cannot deactivate your own account');
        }

        user.active = false;
        user.deactivatedAt = new Date();
        user.deactivatedBy = currentUser.id;

        return true;
    };

    // Reactivate user
    this.reactivateUser = function(id) {
        var currentUser = AuthService.getCurrentUser();
        var user = this.getUserById(id);

        if (!user) {
            throw new Error('User not found');
        }

        // Check department access
        if (user.department !== currentUser.department) {
            throw new Error('Access denied');
        }

        user.active = true;
        delete user.deactivatedAt;
        delete user.deactivatedBy;

        return true;
    };

    // Get user statistics
    this.getUserStats = function() {
        var currentUser = AuthService.getCurrentUser();
        var deptUsers = users.filter(function(u) {
            return u.department === currentUser.department;
        });

        return {
            total: deptUsers.length,
            active: deptUsers.filter(function(u) { return u.active; }).length,
            inactive: deptUsers.filter(function(u) { return !u.active; }).length,
            administrators: deptUsers.filter(function(u) { return u.role === 'administrator'; }).length,
            operators: deptUsers.filter(function(u) { return u.role === 'operator'; }).length
        };
    };

    // Initialize
    this.init();
}]);
