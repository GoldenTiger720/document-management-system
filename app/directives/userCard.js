// User Card Directive
app.directive('userCard', function() {
    return {
        restrict: 'E',
        scope: {
            user: '=',
            onEdit: '&',
            onDeactivate: '&',
            onReactivate: '&'
        },
        template: `
            <div class="user-card" ng-class="{'inactive': !user.active}">
                <div class="user-card-header">
                    <div class="user-avatar-large">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-card-info">
                        <h3>{{user.name}}</h3>
                        <p class="user-username">@{{user.username}}</p>
                        <p class="user-email">{{user.email}}</p>
                    </div>
                </div>
                <div class="user-card-body">
                    <div class="user-meta">
                        <span class="badge" ng-class="{'badge-primary': user.role === 'administrator', 'badge-secondary': user.role === 'operator'}">
                            <i class="fas" ng-class="{'fa-user-shield': user.role === 'administrator', 'fa-user': user.role === 'operator'}"></i>
                            {{user.role | uppercase}}
                        </span>
                        <span class="badge" ng-class="{'badge-success': user.active, 'badge-danger': !user.active}">
                            <i class="fas" ng-class="{'fa-check-circle': user.active, 'fa-times-circle': !user.active}"></i>
                            {{user.active ? 'Active' : 'Inactive'}}
                        </span>
                    </div>
                    <div class="user-details">
                        <p><i class="fas fa-building"></i> {{user.department}}</p>
                        <p><i class="fas fa-calendar"></i> Joined {{user.createdAt | date:'MMM d, yyyy'}}</p>
                    </div>
                </div>
                <div class="user-card-actions">
                    <button class="btn btn-sm btn-primary" ng-click="onEdit({user: user})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" ng-if="user.active" ng-click="onDeactivate({user: user})">
                        <i class="fas fa-ban"></i> Deactivate
                    </button>
                    <button class="btn btn-sm btn-success" ng-if="!user.active" ng-click="onReactivate({user: user})">
                        <i class="fas fa-check"></i> Reactivate
                    </button>
                </div>
            </div>
        `
    };
});
