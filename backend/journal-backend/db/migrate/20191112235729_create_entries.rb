class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.string :content
      t.string :image_url
      t.belongs_to :user, null: false, foreign_key: true
    end
  end
end
