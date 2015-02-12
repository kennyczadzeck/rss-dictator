app.factory('Article', ['$resource', function ($resource) {
  return $resource('/articles/:id', {id: '@id'});
}]);