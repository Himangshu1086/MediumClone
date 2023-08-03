class AddQuantityToClaps < ActiveRecord::Migration[7.0]
  def change
    add_column :claps, :quantity, :integer
  end
end
