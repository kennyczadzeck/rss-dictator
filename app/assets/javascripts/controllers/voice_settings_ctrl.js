app.controller("VoiceSettingsCtrl", ["$scope", "VoiceSettings", "$interval", '$location', function($scope, VoiceSettings, $interval, $location) {
  $scope.VoiceSettings = VoiceSettings;

  $scope.save = function(){
    VoiceSettings.save();
    $location.path("/");
  }

  var prom = $interval(function(){
    $scope.languages = [];
    speechSynthesis.getVoices().forEach(function(voice){ 
      if ($scope.languages.indexOf(voice.lang) < 0) {
        $scope.languages.push(voice.lang) 
      }
    });
    $scope.selectedLang = "en-US";
    $scope.voices = speechSynthesis.getVoices();

    if ($scope.languages.length) {
      $interval.cancel(prom);
    }
  }, 500);

}]);