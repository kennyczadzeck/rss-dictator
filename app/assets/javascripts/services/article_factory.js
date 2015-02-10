app.factory('Articles', function ($resource) {
  var service = {};
  var Article = $resource('/dummy_data.json');
  service.articles = Article.query();
  return service;
});