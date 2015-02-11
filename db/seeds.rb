# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create({
  name: "user1",
  email: "user1@example.com",
  password: "foobar",
  password_confirmation: "foobar"
})

user2 = User.create({
  name: "user2",
  email: "user2@example.com",
  password: "foobar",
  password_confirmation: "foobar"
})

user1.feeds.create([
  {
    url: "http://maryrosecook.com/blog/feed"
  },
  {
    url: "http://feeds.feedburner.com/Freakonomics?format=xm..."
  }
])

user2.feeds.create({
  url: "https://github.com/blog/all.atom"
})