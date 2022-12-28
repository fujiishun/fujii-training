class UsersController < ApplicationController 
  def index
    @user = User.all
    render json: @user
  end

  def edit
    @user = User.find(params[:id])
    if @user
      render json: { status: 200, user: @user }
    else
      render json: { status: 500}
    end
  end
    
  def update
    @user = User.find(params[:id])
    if @user.update(users_params)
      render json: { status: 200, user: @user}
    else
      render json: { status: 500}
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end
      
  private

  def users_params
    params.require(:user).permit(:nickname, :email)
  end
end
