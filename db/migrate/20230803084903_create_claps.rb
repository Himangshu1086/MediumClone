class CreateClaps < ActiveRecord::Migration[7.0]
  def change
    create_table :claps do |t|
      t.integer :user_id
      t.references :clapable, polymorphic: true, index: true

      t.timestamps
    end
  end
end
