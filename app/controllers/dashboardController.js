// Dashboard Controller
app.controller('DashboardController', ['$scope', 'AuthService', 'UserService', 'DocumentService', 'NotificationService',
    function($scope, AuthService, UserService, DocumentService, NotificationService) {

    $scope.currentUser = AuthService.getCurrentUser();
    $scope.loading = true;

    // Initialize dashboard data
    $scope.init = function() {
        $scope.userStats = UserService.getUserStats();
        $scope.documentStats = DocumentService.getDocumentStats();
        $scope.recentDocuments = DocumentService.getDocuments().slice(0, 5);
        $scope.recentNotifications = NotificationService.getNotifications().slice(0, 5);
        $scope.loading = false;
    };

    // Quick stats for cards
    $scope.quickStats = [
        {
            icon: 'fa-file-signature',
            title: 'Total Documents',
            value: 0,
            color: '#4F46E5',
            bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80'
        },
        {
            icon: 'fa-check-circle',
            title: 'Signed Documents',
            value: 0,
            color: '#10B981',
            bgImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80'
        },
        {
            icon: 'fa-clock',
            title: 'Pending Signatures',
            value: 0,
            color: '#F59E0B',
            bgImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80'
        },
        {
            icon: 'fa-users',
            title: 'Active Users',
            value: 0,
            color: '#8B5CF6',
            bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80'
        }
    ];

    // Update stats
    $scope.updateStats = function() {
        $scope.quickStats[0].value = $scope.documentStats.total;
        $scope.quickStats[1].value = $scope.documentStats.signed;
        $scope.quickStats[2].value = $scope.documentStats.pending;
        $scope.quickStats[3].value = $scope.userStats.active;
    };

    // Activity timeline
    $scope.recentActivity = [];

    $scope.generateActivityTimeline = function() {
        var activities = [];

        // Add document activities
        $scope.recentDocuments.forEach(function(doc) {
            if (doc.status === 'signed') {
                activities.push({
                    icon: 'fa-file-signature',
                    title: 'Document Signed',
                    description: doc.name,
                    timestamp: doc.signedAt,
                    type: 'success'
                });
            } else {
                activities.push({
                    icon: 'fa-upload',
                    title: 'Document Uploaded',
                    description: doc.name,
                    timestamp: doc.uploadedAt,
                    type: 'info'
                });
            }
        });

        // Sort by timestamp
        activities.sort(function(a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        $scope.recentActivity = activities.slice(0, 8);
    };

    // Initialize
    $scope.init();
    $scope.updateStats();
    $scope.generateActivityTimeline();

    // Refresh data
    $scope.refresh = function() {
        $scope.loading = true;
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.init();
                $scope.updateStats();
                $scope.generateActivityTimeline();
            });
        }, 500);
    };
}]);
