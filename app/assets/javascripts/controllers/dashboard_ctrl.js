app.controller('DashboardCtrl', ['$scope', 'Articles', function($scope, Articles){
  $scope.articles = Articles;
}]);