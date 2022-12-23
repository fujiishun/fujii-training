class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.references :user, null: true, foreign_key: true
      t.string :title
      t.string :body
      t.string :label

      t.timestamps
    end
  end
end
