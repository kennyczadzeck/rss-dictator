app.controller('DashboardCtrl', ['$scope', 'Articles', function($scope, Articles){
  $scope.articles = Articles.query();
  $scope.reading = null;
  $scope.listening = null;
  $scope.paused = false;

  var voice = new SpeechSynthesisUtterance();

  $scope.read = function(id){
    $scope.reading = id;
  };

  $scope.listen = function(id){
    $scope.paused = false;
    $scope.listening = id;
    $scope.reading = id;
    voice.text = $scope.articles[id].content;
    speechUtteranceChunker(voice);
  };

  $scope.pausePlay = function(){
    if ($scope.paused)
      speechSynthesis.resume();
    else
      speechSynthesis.pause();
    
    $scope.paused = !$scope.paused;
  }
}]);