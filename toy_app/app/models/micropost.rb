class Micropost < ApplicationRecord
  belogns_to :user
  validates :content, length: {maximum: 140}
end
