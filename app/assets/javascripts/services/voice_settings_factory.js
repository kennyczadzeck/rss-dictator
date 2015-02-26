app.factory('VoiceSettings', [function () {
  var settings = JSON.parse(localStorage.getItem("voiceSettings"));
  
  if (!settings) {
    settings = {
      rate: 1,
      volume: 1,
      voice: null,
      pitch: 1,
      lang: ""
    }
  }

  speaker.settings(settings);

  var save = function(set){
    settings = set || settings;
    speaker.settings(settings);
    speaker.voice(settings.voice.name);
    localStorage.setItem("voiceSettings", JSON.stringify(settings));
  }

  return {
    save     : save,
    settings : settings
  }
}]);