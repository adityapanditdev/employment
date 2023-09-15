require 'rails_helper'

RSpec.describe Personal, type: :model do
  context 'validations' do
    it 'is valid with a valid email' do
      personal = Personal.new(email: 'test@example.com')
      expect(personal).to be_valid
    end

    it 'is not valid without an email' do
      personal = Personal.new(email: nil)
      expect(personal).not_to be_valid
    end
  end
end
