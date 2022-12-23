class UsersController < ApplicationController
    def index
        @user = User.all
        render json: @user
      end
    
      def create
        @user = User.new(users_params)
        if @user.save
          render json: { status: 200, user: @user }
        else
          render json: { status: 500 }
        end
      end
    
      def show
        @user = User.find(params[:id])
        if @user
          render json: { status: 200, user: @user }
        else
          render json: { status: 500}
        end
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
        @user.update(users_params)
        if @user
          render json: { status: 200, user: @user}
        else
          render json: { status: 500}
        end
      end
      
      private

    def users_params
      params.require(:user).permit(:nickname, :email)
    end
end
