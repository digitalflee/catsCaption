class EntrySerializer < ActiveModel::Serializer
  attributes :id, :image_url, :content, :user
end
