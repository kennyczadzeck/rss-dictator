app.factory('Feed', ['$resource', function ($resource) {
  var Feed = $resource('/feeds/:id', {id: '@id'});

  var query = function(cb) {
    var sessionFeeds = sessionStorage.getItem('feeds');
    if(sessionFeeds){
      cb(JSON.parse(sessionFeeds));
    } else {
      Feed.query(function(feeds) {
        feeds.forEach(function(feed) {
          feed.showing = false;
        });
        sessionStorage.setItem('feeds', JSON.stringify(feeds));
        cb(feeds);
      });
    }
  }

  var save = function(feedUrl, callback) {
    var feed = new Feed({url: feedUrl});
    feed.$save(function(savedFeed){
      var savedFeedId = savedFeed.id;
      Feed.get({id: savedFeedId}, function(foundFeed) {
        // var foundFeed = foundFeed[feedUrl];
        console.log(foundFeed);
        var sessionFeeds = sessionStorage.getItem('feeds');
        sessionFeeds = JSON.parse(sessionFeeds);
        sessionFeeds.push(foundFeed);
        if(callback) {
          callback(sessionFeeds)
        }
        sessionFeeds = JSON.stringify(sessionFeeds);
        sessionStorage.setItem('feeds', sessionFeeds);
      })
    });
  }

  var destroy = function(feedId, callback) {
    Feed.remove({id:feedId}, function() {
      var sessionFeeds = sessionStorage.getItem('feeds');
      sessionFeeds = JSON.parse(sessionFeeds);
      for (var i=0; i < sessionFeeds.length; i++) {
        if (feedId === sessionFeeds[i].id) {
          sessionFeeds.splice(i, 1);
          }
          if (callback) {
            callback(sessionFeeds);
          }
          sessionFeeds = JSON.stringify(sessionFeeds);
          sessionStorage.setItem('feeds', sessionFeeds);
          break;
        }
    });
  }

  return {
    query: query,
    save: save,
    destroy: destroy
  }
}]);