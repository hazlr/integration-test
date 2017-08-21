var app = angular.module('monApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // If no parameters passed through URI redirect to home
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'PostCtrl'
        })
        // About redirection
        .when('/about', {
            templateUrl: 'partials/about.html'
        })
        // Posts list
        .when('/blog', {
            templateUrl: 'partials/posts.html',
            controller: 'PostCtrl'
        })
        // Match the id passed through URI
        .when('/blog/article:id', {
            templateUrl: 'partials/comments.html',
            controller: 'CommentsCtrl'
        })
        // If does not match any -> Redirect to homepage
        .otherwise({
            redirectTo: '/'
        })
}]);