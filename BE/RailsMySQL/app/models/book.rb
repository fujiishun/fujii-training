class Book < ApplicationRecord
    mount_uploader :label, LabelUploader
end
