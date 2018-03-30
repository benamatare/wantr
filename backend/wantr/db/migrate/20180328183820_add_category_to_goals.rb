class AddCategoryToGoals < ActiveRecord::Migration[5.2]
  def change
    add_column :goals, :category, :string
    remove_column :goals, :description 
  end
end
