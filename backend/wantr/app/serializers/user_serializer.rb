class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :bio, :goals
  # include: ['comments','author','comments.tags','author.posts']
  has_many :goals
  has_many :steps, through: :goals
end
