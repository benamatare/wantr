class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.string :title
      t.text :description
      t.boolean :completed, default: false
      t.references :user, index: true

      t.timestamps
    end
  end
end
