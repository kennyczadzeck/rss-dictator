app.controller("FeedCtrl", ["$scope", "$location", "Feed", function($scope, $location, Feed) {
  $scope.createFeed = function() {
    Feed.save($scope.feedUrl, function(sessionFeeds) {
      $scope.feeds = sessionFeeds;
      $location.path('/');
    });
  }

  Feed.query(function(data) {
    $scope.feeds = data;
  });

  $scope.deleteFeed = function(feedId) {
    console.log($scope.feeds);
    console.log(feedId);
    Feed.destroy(feedId, function(sessionFeeds) {
      $scope.feeds = sessionFeeds;
    });
  }

}]);