// Department Management Service
app.service('DepartmentService', [function() {
    var departments = [
        {
            id: 1,
            name: 'Finance',
            description: 'Financial operations and accounting',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 2,
            name: 'HR',
            description: 'Human Resources management',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 3,
            name: 'IT',
            description: 'Information Technology services',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 4,
            name: 'Legal',
            description: 'Legal affairs and compliance',
            createdAt: new Date('2024-01-01')
        },
        {
            id: 5,
            name: 'Operations',
            description: 'Business operations management',
            createdAt: new Date('2024-01-01')
        }
    ];

    this.getAllDepartments = function() {
        return angular.copy(departments);
    };

    this.getDepartmentByName = function(name) {
        return departments.find(function(d) {
            return d.name === name;
        });
    };

    this.getDepartmentById = function(id) {
        return departments.find(function(d) {
            return d.id === id;
        });
    };
}]);
