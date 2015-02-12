app.controller("ArticleCtrl", ["$scope", "Article", "$location", function($scope, Article, $location) {

  $scope.createArticle = function() {
    var article = new Article({url: $scope.articleUrl});
    article.$save(function() {
      $location.path("/");
    });
  }
}]);