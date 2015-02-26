class DashboardController < ApplicationController
  before_action :check_logged_in_user

  def show
  end

  def check_logged_in_user
    redirect_to home_path unless current_user
  end
end
