class StepSerializer < ActiveModel::Serializer
  attributes :id, :title, :completed
  belongs_to :goal
  # belongs_to :user, through: :goal
end
