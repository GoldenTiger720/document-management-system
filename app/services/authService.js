// Authentication Service
app.service('AuthService', ['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
    var currentUser = null;

    // Mock user database with departments
    var users = [
        {
            id: 1,
            username: 'admin1',
            password: 'admin123',
            name: 'John Doe',
            email: 'john.doe@company.com',
            role: 'administrator',
            department: 'Finance',
            active: true,
            createdAt: new Date('2024-01-15')
        },
        {
            id: 2,
            username: 'admin2',
            password: 'admin123',
            name: 'Jane Smith',
            email: 'jane.smith@company.com',
            role: 'administrator',
            department: 'HR',
            active: true,
            createdAt: new Date('2024-02-10')
        },
        {
            id: 3,
            username: 'operator1',
            password: 'oper123',
            name: 'Mike Johnson',
            email: 'mike.johnson@company.com',
            role: 'operator',
            department: 'Finance',
            active: true,
            createdAt: new Date('2024-03-05')
        },
        {
            id: 4,
            username: 'operator2',
            password: 'oper123',
            name: 'Sarah Williams',
            email: 'sarah.williams@company.com',
            role: 'operator',
            department: 'HR',
            active: true,
            createdAt: new Date('2024-03-20')
        }
    ];

    var nextUserId = 5;

    this.login = function(username, password, role, department) {
        // Check if user already exists
        var existingUser = users.find(function(u) {
            return u.username === username;
        });

        if (existingUser) {
            // Existing user - verify password
            if (existingUser.password === password && existingUser.active) {
                currentUser = angular.copy(existingUser);
                delete currentUser.password;
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                $rootScope.currentUser = currentUser;
                $rootScope.isAuthenticated = true;
                return true;
            }
            return false;
        } else {
            // New user - create account
            var newUser = {
                id: nextUserId++,
                username: username,
                password: password,
                name: username.charAt(0).toUpperCase() + username.slice(1), // Capitalize first letter
                email: username + '@company.com',
                role: role,
                department: department,
                active: true,
                createdAt: new Date()
            };

            users.push(newUser);

            // Log them in
            currentUser = angular.copy(newUser);
            delete currentUser.password;
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            $rootScope.currentUser = currentUser;
            $rootScope.isAuthenticated = true;
            return true;
        }
    };

    this.logout = function() {
        currentUser = null;
        sessionStorage.removeItem('currentUser');
        $rootScope.currentUser = null;
        $rootScope.isAuthenticated = false;
        $location.path('/login');
    };

    this.isAuthenticated = function() {
        if (!currentUser) {
            var stored = sessionStorage.getItem('currentUser');
            if (stored) {
                currentUser = JSON.parse(stored);
                $rootScope.currentUser = currentUser;
                $rootScope.isAuthenticated = true;
            }
        }
        return !!currentUser;
    };

    this.getCurrentUser = function() {
        if (!currentUser) {
            var stored = sessionStorage.getItem('currentUser');
            if (stored) {
                currentUser = JSON.parse(stored);
            }
        }
        return currentUser;
    };

    this.isAdmin = function() {
        var user = this.getCurrentUser();
        return user && user.role === 'administrator';
    };

    this.requireAuth = function() {
        var deferred = $q.defer();
        if (this.isAuthenticated()) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.path('/login');
        }
        return deferred.promise;
    };

    this.requireAdmin = function() {
        var deferred = $q.defer();
        if (this.isAdmin()) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.path('/dashboard');
        }
        return deferred.promise;
    };

    this.getAllUsers = function() {
        return angular.copy(users);
    };

    this.getUsersByDepartment = function(department) {
        return users.filter(function(u) {
            return u.department === department;
        });
    };
}]);
