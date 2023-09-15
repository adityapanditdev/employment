class Personal < ApplicationRecord
  validates :email, presence: true
end
