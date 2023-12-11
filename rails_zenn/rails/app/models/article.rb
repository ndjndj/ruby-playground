class Article < ApplicationRecord
  belongs_to :user
  enum :status, { unsaved: 10, draft: 20, published: 30 }, _prefix: true
  validates :title, :content, presence: true, if: :published?
  validate :verify_only_one_unsaved_status_is_allowed

  
end
