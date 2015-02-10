class User < ActiveRecord::Base
  has_secure_password
  has_many :feeds

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: /\A\S+@\S+\z/

  def self.authenticate(email, password)
    user = User.find_by(email: email)
    user && user.authenticate(password)
  end
end
