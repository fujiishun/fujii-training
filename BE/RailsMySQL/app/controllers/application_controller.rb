class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  #include SessionsHelper

  skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?
end
