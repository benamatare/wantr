module Api
  module V1
    class StepsController < ApplicationController

      def index
        render json: Step.all
      end

      def show
        @step = Step.find(params[:id])
        render json: @step
      end

      def create
        @step = Step.create(step_params)
        render json: @step
      end

      def update
        @step = Step.find(params[:id])
        @step.update(step_params)
        render json: @step
      end

      private
      def step_params
        params.require(:step).permit(:title, :goal_id, :completed)
      end

    end
  end
end
