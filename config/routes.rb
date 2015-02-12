Rails.application.routes.draw do

  resources :articles

  resources :feeds, defaults: {format: :json}

  get "/signin" => "sessions#new"
  get "/signout" => "sessions#destroy"
  resource :session, only: [:new, :create, :destroy]

  get "/signup" => "users#new"
  resources :users

  root "dashboard#show"
  get "/home" => "homes#show"
end
