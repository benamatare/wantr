Rails.application.routes.draw do

  namespace :api do
     namespace :v1 do
      resources :users, only: [:index, :show] do
        resources :goals, only: [:index, :show, :create, :update] do
          resources :steps, only: [:index, :show, :create, :update]
        end
      end
    end
  end
end
