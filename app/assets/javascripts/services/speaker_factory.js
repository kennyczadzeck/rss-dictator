app.factory('Speaker', ['VoiceSettings', function (VoiceSettings) {
  var service = {
    listening: null,
    paused: true
  }

  service.play = function(article){
    if (VoiceSettings.settings.voice) {
      speaker.voice(VoiceSettings.settings.voice.name);
    }
    service.paused = false;
    service.listening = article;
    speaker.text($(article.content).text());
    speaker.speak();
  };

  service.pausePlay = function(){
    if (service.paused)
      speaker.resume();
    else
      speaker.pause();
    
    service.paused = !service.paused;
  }

  service.stop = function(){
    service.listening = null;
    speaker.stop();
  }

  service.increaseRate = function() {
    VoiceSettings.settings.rate += 0.2;
    VoiceSettings.save();
  };

  service.decreaseRate = function() {
    VoiceSettings.settings.rate -= 0.2;
    VoiceSettings.save();
  };

  return service;
}]);