require 'rails_helper'

RSpec.describe EmployersController, type: :controller do
  describe 'GET #index' do
    let(:employer) { FactoryBot.create(:employer) } # Assuming you have a factory for Employer
    it 'returns a JSON response with a list of employers' do
      get :index
      expect(response).to have_http_status(:success)
      expect(response.content_type).to eq('application/json; charset=utf-8')
      parsed_response = JSON.parse(response.body)
      expect(parsed_response.length).to eq(3)
    end
  end
end