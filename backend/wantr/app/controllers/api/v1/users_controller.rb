module Api
  module V1

    class UsersController < ApplicationController

      def index
        render json: User.includes(:goals), include: ['goals']
      end

      def show
        @user = User.find(params[:id])
        render json: @user
      end

      # def create
      #  Come back to, as a stretch goal.
      # end

      # def destroy
      #  @user = User.find(params[:id])
        #  Come back to, as a stretch goal.
      # end
      
    end
  end
end
