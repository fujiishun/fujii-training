Rails.application.routes.draw do
  resources :books, only: [:index, :create, :show, :edit, :update]
  resources :users, only: [:edit, :update]
  devise_for :users
  devise_for :books

  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      as :user do
        delete 'sign_out', to: 'sessions#destroy', as: :destroy_user_session
      end

      namespace :auth do
        resources :sessions, only: [:index, :create]
      end
    end
  end
end