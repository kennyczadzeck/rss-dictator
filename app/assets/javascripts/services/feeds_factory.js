app.factory('Feeds', function ($resource) {
  return $resource('/feeds');
});