class Book < ApplicationRecord
  belongs_to :user
  mount_uploader :label, LabelUploader
end
