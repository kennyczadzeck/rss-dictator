app.controller("FeedCtrl", ["$scope", "Feed", "$location", function($scope, Feed, $location) {

  $scope.createFeed = function() {
    var feed = new Feed({url: $scope.feedUrl});
    feed.$save(function() {
      $location.path("/");
    });
  }
}]);