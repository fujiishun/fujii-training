class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :label
      t.string :name
      t.string :body

      t.timestamps
    end
  end
end
