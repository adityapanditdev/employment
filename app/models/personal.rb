class Personal < ApplicationRecord
  validates :first_name, presence: true, length: { maximum: 25 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :email, :phone, presence: true
end
