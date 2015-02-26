app.factory("flash", function($rootScope) {
  
  var message = "Article Successfully Saved!";

  return {
    message: message
  };
});