Rails.application.routes.draw do
  get '/books/e', to:'books#e'
  resources :books, only: [:index, :create, :show, :edit, :update]

  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      as :user do
        delete 'sign_out', to: 'sessions#destroy', as: :destroy_user_session
      end

      namespace :auth do
        resources :sessions, only: [:index]
      end
    end
  end
end