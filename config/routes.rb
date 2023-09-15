Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "personals#index"
  post '/hello', to: "personals#hello"
  resources :personals, only: [:index, :create]
end
