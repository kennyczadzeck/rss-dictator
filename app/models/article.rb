require 'readability'
require 'nokogiri'
require 'open-uri'
class Article < ActiveRecord::Base
  belongs_to :user

  validates :url, presence: true
  validates_format_of :url, :with => URI::regexp(%w(http https))

  def self.read_nokogiri(article)
    #Nokogiri for title
    doc = Nokogiri::HTML(open(article.url))
    article.title = doc.css('title').text
    #Readability for content
    source = open(article.url).read
    content = Readability::Document.new(source).content
    article.content = content
    return article
  end
end
