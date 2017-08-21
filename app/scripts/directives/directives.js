// Comment component
app.directive('ngComment', function(){
    return {
        scope:  {
            comment : '='
        },
        restrict: 'E',
        templateUrl: 'partials/comment.html'
    }
})