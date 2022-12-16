# 認証確認用コントローラー
  
class Api::V1::Auth::SessionsController < ApplicationController 
  def render_destroy_error
      render json: {
        message: I18n.t("devise_token_auth.sessions.user_not_found")
      }, status: 404
  end

  def index
    if current_api_v1_user
      render json: { status: 200, current_user: current_api_v1_user }
    else
      render json: { status: 500, message: "ユーザーが存在しません" }
    end
  end
end
