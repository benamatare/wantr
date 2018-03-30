class AddCompletedDateToGoals < ActiveRecord::Migration[5.2]
  def change
    add_column :goals, :complete_by, :string 
  end
end
