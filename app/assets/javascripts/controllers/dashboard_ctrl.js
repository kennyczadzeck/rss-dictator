app.controller('DashboardCtrl', ['$scope', '$sce', 'Feed', function($scope, $sce, Feed){
  $scope.dataLoaded = false;
  $scope.feeds = Feed.query(function(){
    $scope.feeds.forEach(function(feed){
      feed.showing = false;
      $scope.dataLoaded = true;
      $('.dropdown-toggle').dropdown();
    });
  });
  $scope.reading = null;
  $scope.listening = null;
  speechSynthesis.pause();
  speechSynthesis.cancel();

  var voice = new SpeechSynthesisUtterance();

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
    $scope.paused = false;
    voice.text = $(article.content).text();
    speechUtteranceChunker(voice);
  };

  $scope.pausePlay = function(){
    if ($scope.paused)
      speechSynthesis.resume();
    else
      speechSynthesis.pause();
    
    $scope.paused = !$scope.paused;
  }

  $scope.stop = function(){
    $scope.listening = null;
    speechSynthesis.pause();
  }
}]);