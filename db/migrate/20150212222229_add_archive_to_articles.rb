class AddArchiveToArticles < ActiveRecord::Migration
  def up
    Article.delete_all
    remove_column :articles, :read
    add_column :articles, :archive, :boolean, default: false
  end

  def down
    Article.delete_all
    remove_column :articles, :archive
    add_column :articles, :read, :boolean, default: false
  end
end
