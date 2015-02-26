require 'rss'
class Feed < ActiveRecord::Base
  belongs_to :user

  validates :url, presence: true
  validates_format_of :url, :with => URI::regexp(%w(http https))


  def self.feedjira_index(feeds)
    arr_feeds = []
    urls = []
    feeds.each do |feed|
      this_feed = Feedjira::Feed.fetch_and_parse feed.url
      this_feed.entries = this_feed.entries.map { |entry| 
        entry.inject({}) { |obj, attr| 
          obj[attr[0]] = attr[1]; 
          obj 
        } 
      }
      arr_feeds.push({
        id: feed.id, 
        title: this_feed.title, 
        description: this_feed.description,
        url: this_feed.url,
        entries: this_feed.entries
        })
    end
    return arr_feeds
  end

  def self.feedjira_show(feed)
    this_feed = Feedjira::Feed.fetch_and_parse feed.url
    this_feed.entries = this_feed.entries.map { |entry| 
      entry.inject({}) { |obj, attr| 
        obj[attr[0]] = attr[1]; 
        obj 
      } 
    }
    big_object = {
      id: feed.id, 
      title: this_feed.title, 
      description: this_feed.description,
      url: this_feed.url,
      entries: this_feed.entries
    }
    return big_object
  end
end
