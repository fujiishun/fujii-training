Rails.application.routes.draw do
  #post '/articles', to: 'articles#create'
  #get '/articles/:id', to: 'articles#show'
  
  get '/books/all', to:'books#all'
  post '/books', to: 'books#create'
  get  '/books/:id', to: 'books#show'
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      as :user do
        delete 'sign_out', to: 'sessions#destroy', as: :destroy_user_session
      end

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end