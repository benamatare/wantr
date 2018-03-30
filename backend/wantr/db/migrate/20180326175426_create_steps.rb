class CreateSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :steps do |t|
      t.string :title
      t.boolean :completed, default: false
      t.references :goal, index: true

      t.timestamps
    end
  end
end
