class AddColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :books, :uid, :bigint 
  end
end
