class AddIsCompletedToBooks < ActiveRecord::Migration[7.0]
  def change
    add_column :books, :is_completed, :boolean 
  end
end
