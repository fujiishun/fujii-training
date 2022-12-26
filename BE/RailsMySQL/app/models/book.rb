class Book < ApplicationRecord
  belongs_to :user, foreign_key: 'user_id'
  mount_uploader :label, LabelUploader
end
