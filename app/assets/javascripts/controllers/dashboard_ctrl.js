app.controller('DashboardCtrl', ['$scope', '$sce', 'Feed', 'Article', function($scope, $sce, Feed, Article){
  $('.dropdown-toggle').dropdown();
  $scope.listening = null;
  $scope.reading = null;
  $scope.dataLoaded = false;

  $scope.feeds = Feed.query(function(){
    $scope.feeds.forEach(function(feed){
      feed.showing = false;
      $scope.dataLoaded = true;
    });
  });

  $scope.articles = Article.query(function(){
    $scope.articles.forEach(function(article){
      article.showing = false;
    });
  });

  $scope.sanitize = function(str){
    return $sce.trustAsHtml(str);
  }

  $scope.read = function(article, feedTitle){
    $scope.reading = article;
    $scope.readingSourceTitle = feedTitle;
  };

  $scope.listen = function(article, feedTitle){
    $scope.listening = article;
    $scope.listeningSourceTitle = feedTitle;
    $scope.reading = article;

    speaker.text($(article.content).text());
    speaker.speak();
  };

  $scope.pausePlay = function(){
    if ($scope.paused)
      speaker.resume();
    else
      speaker.pause();
    
    $scope.paused = !$scope.paused;
  }

  $scope.stop = function(){
    $scope.listening = null;
    speaker.stop();
  }
}]);