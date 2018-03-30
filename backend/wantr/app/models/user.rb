class User < ApplicationRecord
  has_many :goals
  has_many :steps, through: :goals
end
