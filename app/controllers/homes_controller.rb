class HomesController < ApplicationController
  before_action :check_logged_in_user

  def show
  end

  def check_logged_in_user
    redirect_to dashboard_path if current_user
  end
end
