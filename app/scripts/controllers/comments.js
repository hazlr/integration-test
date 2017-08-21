app.controller('CommentsCtrl', ['$scope', '$rootScope','PostFactory','$routeParams', function ($scope, $rootScope,PostFactory, $routeParams) {
    
    $rootScope.loading = true;
    $scope.newComment = {};

    // Retrieves the ID of the post requested through the URL
    PostFactory.get($routeParams.id)
    .then(
        // Success callback
        function(post){
            $rootScope.loading = false; //Hide the loader once we receive the post
            $scope.title = post.name;
            $scope.content = post.content;
            $scope.comments = post.comments;
        },
        // Error fallback
        function(msg){
            alert(msg);
        });

    // Adds new comment in the "comments" object via push
    $scope.addComment = function(){
        $scope.comments.push($scope.newComment);

        PostFactory.add($scope.newComment)
        .then(
            // Success callback
            function(){
        
            },
            // Error fallback
            function(){
                alert('Votre message n\'a pas pu être enregistré');
            })

        // Once the new comment is added, we reset the object to an empty one
        // to empty all inputs & allow users to type in inputs for a new comment
        $scope.newComment = {};
    }

}]);