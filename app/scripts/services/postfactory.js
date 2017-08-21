app.factory('PostFactory',['$http','$q','$timeout', function ($http, $q, $timeout) {
    
    var factory = {
        posts: false,

        // Gets all posts with $http.get method
        find : function () {
            // AJAX requests are non instantly returned so we need
            // to defer the result with $q.

            // Initialize a new task which will end in the future
            var deferred = $q.defer();
            if(factory.posts !== false) {
                deferred.resolve(factory.posts);
            } else {
                $http.get('json/posts.json')
                    // If the request works
                    .success(function(data, status){
                        factory.posts = data;
                        $timeout(function(){  
                            deferred.resolve(factory.posts);
                        }, 2000)
                    })
                    // otherwise..
                    .error(function(data, status){
                        deferred.reject('Impossible de récupérer les articles');
                    });

            }
            // Always return the promise
            return deferred.promise;
        },

        // Retrieves only the requested articles
        get : function (id) {
            var deferred = $q.defer();
            var post = {};
            // We call all articles through find() method
            var posts = factory.find().then(
                
                // Success callback
                function(posts){
                    // We loop through all articles
                    angular.forEach(posts, function(value, key) {
                        // If a post.id matches the url parameter
                        if(value.id == id){
                            post = value;
                        }
                    });
                    // return the requested post
                    deferred.resolve(post);
                },
                // Error fallback
                function(msg){
                    deferred.reject(msg);
                }
            );
            return deferred.promise;
        },

        // Add a comment
        add : function(comment) {
            var deferred = $q.defer();
            // ...
            deferred.resolve();
            return deferred.promise;
        }

    };
    return factory;
}]);