app.controller('PostCtrl', ['$scope','$rootScope','PostFactory', function ($scope, $rootScope, PostFactory) {
    $rootScope.loading = true;

    $scope.posts = PostFactory.find()
    .then(
        // Success callback
        function(posts){
            $rootScope.loading = false;
            $scope.posts = posts;
        },
        // Error fallback
        function(msg){
            alert(msg);
        }
    );
}]);