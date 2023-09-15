Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "personals#index"
  resources :personals, only: [:index, :create] do
    collection do
      get 'all'
    end
  end
  resources :employers, only: [:index, :create]
end
