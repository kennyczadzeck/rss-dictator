app.factory('Feed', ['$resource', function ($resource) {
  return $resource('/feeds/:id', {id: '@id'});
}]);