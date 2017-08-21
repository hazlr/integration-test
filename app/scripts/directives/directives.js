// Comment component
app.directive('ngComment', function(){
    return {
        scope:  {
            comment : '='
        },
        restrict: 'E',
        templateUrl: 'partials/_comment.html'
    }
})