# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Feed.create!([
  {
    url: "http://maryrosecook.com/blog/feed"
  },
  {
    url: "http://feeds.feedburner.com/Freakonomics?format=xm..."
  },
  {
    url: "https://github.com/blog/all.atom"
  }
])