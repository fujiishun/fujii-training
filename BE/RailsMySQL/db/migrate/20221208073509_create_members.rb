class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.string :Name
      t.string :Sex

      t.timestamps
    end
  end
end
