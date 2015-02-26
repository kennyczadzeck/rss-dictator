app.controller("ArticleCtrl", ["$scope", "$location", "Article", function($scope, $location, Article) {
  $scope.createArticle = function() {
    Article.save($scope.articleUrl, function() {
      $location.path('/');
    });
  }

  Article.query(function(data) {
    $scope.articles = data;
  });

  $scope.deleteArticle = function(articleId) {
    Article.destroy(articleId, function(sessionArticles) {
      $scope.articles = sessionArticles;
    });
  }

}]);