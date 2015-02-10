app.factory('Articles', function ($resource) {
  return $resource('/dummy_data.json');
});