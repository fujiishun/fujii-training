class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :label
      t.string :body
      t.integer :user_id

      t.timestamps
    end
  end
end
