# アカウント作成用コントローラー
class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
    before_action :configure_sign_up_params, only: [:create]
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:account_update, keys:[:name])
  end

  private 
  def sign_up_params
    params.permit(:image, :nickname, :email, :password, :password_confirmation, :name)
  end
end
