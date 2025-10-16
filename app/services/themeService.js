// Theme Service
app.service('ThemeService', ['$rootScope', function($rootScope) {
    var currentTheme = 'light';

    this.loadTheme = function() {
        var savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            currentTheme = savedTheme;
            $rootScope.isDarkTheme = (currentTheme === 'dark');
        } else {
            $rootScope.isDarkTheme = false;
        }
    };

    this.toggleTheme = function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        $rootScope.isDarkTheme = (currentTheme === 'dark');
        localStorage.setItem('theme', currentTheme);
        return currentTheme;
    };

    this.getCurrentTheme = function() {
        return currentTheme;
    };

    this.setTheme = function(theme) {
        currentTheme = theme;
        $rootScope.isDarkTheme = (theme === 'dark');
        localStorage.setItem('theme', theme);
    };
}]);
