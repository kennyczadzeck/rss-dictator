app.factory('Speaker', [function () {
  var service = {
    listening: null,
    paused: true
  }

  service.play = function(article){
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
    speaker.increaseRate();
  };

  service.decreaseRate = function() {
    speaker.decreaseRate();
  };

  return service;
}]);