module Api
  module V1

    class GoalsController < ApplicationController

      def index
        @goals = Goal.where(user_id: params[:user_id])
        render json: @goals.includes(:steps), include: ['steps']
      end

      def show
        @goal = Goal.find(params[:id])
        render json: @goal
      end

      def create
        @goal = Goal.create(goal_params)
        render json: @goal
      end

      def update
        @goal = Goal.find(params[:id])
        @goal.update(goal_params)
        render json: @goal
      end

      private
      def goal_params
        params.require(:goal).permit(:title, :category, :user_id, :completed, :complete_by)
      end

    end
  end
end
