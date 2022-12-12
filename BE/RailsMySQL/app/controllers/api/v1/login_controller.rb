class Api::V1::LoginController < ApplicationController
  def index
    render json: { message: "Hello World!"}
  end
end
