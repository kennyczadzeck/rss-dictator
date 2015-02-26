app.controller('DashboardCtrl', ['$scope', '$route', '$sce', 'Feed', 'Article', 'Speaker', 'flash', '$timeout', 'Spinner', function($scope, $route, $sce, Feed, Article, Speaker, flash, $timeout, Spinner){
  $('.dropdown-toggle').dropdown();
  $scope.Speaker = Speaker;
  $scope.reading = null;
  $scope.articlesShowing = false;
  $scope.flash = flash;
  var loaded = 0;

  Spinner.start('loading-icon');

  Article.query(function(data){
    $scope.articles = data;
    if (++loaded >= 2) Spinner.stop();
  });

  Feed.query(function(data){
    $scope.feeds = data;
    if (++loaded >= 2) Spinner.stop();
  });

  $scope.saveArticle = function() {
    var url = $scope.reading.url;
    $scope.processingSave = true;
    $scope.flashDisplay = true;
    Article.save(url, function(sessionArticles) {
      $timeout($scope.resetFlashTimeout, 1000);
      $scope.articles = sessionArticles;
    });
  };

  $scope.resetFlashTimeout = function() {
    $scope.flashDisplay = false;
    $scope.processingSave = false;
  }

  // Allow Angular to display content text as html
  $scope.sanitize = function(str){
    return $sce.trustAsHtml(str);
  };

  // User Controls
  $scope.read = function(article, feedTitle){
    $scope.reading = article;
    $scope.readingSourceTitle = feedTitle;
  };

  $scope.listen = function(article, feedTitle){
    $scope.Speaker.play(article);
    $scope.listeningSourceTitle = feedTitle;
    $scope.reading = article;
  };

}]);