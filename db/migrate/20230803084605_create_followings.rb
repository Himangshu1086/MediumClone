class CreateFollowings < ActiveRecord::Migration[7.0]
  def change
    create_table :followings do |t|
      t.integer :follower_id, null: false
      t.integer :followed_id, null: false
    end

    add_index :followings, [:follower_id, :followed_id], unique: true
  end
end
