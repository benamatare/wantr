class GoalSerializer < ActiveModel::Serializer
  attributes :id, :title, :category, :completed, :steps, :complete_by
  belongs_to :user
  has_many :steps
end
