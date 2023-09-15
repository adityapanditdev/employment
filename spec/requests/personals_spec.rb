require 'rails_helper'

RSpec.describe PersonalsController, type: :controller do
  describe 'POST #create' do
    context 'with valid parameters' do
      let(:valid_params) do
        {
          personal: {
            email: 'test@example.com',
            personal_info: {
              firstName: 'John',
              lastName: 'Doe',
              nickname: 'JD',
              phoneNumber: '123-456-7890'
            },
            address: {
              street: '123 Main St',
              city: 'Exampleville',
              state: 'CA',
              zip: '12345'
            }
          }
        }
      end

      it 'creates a new personal record' do
        expect {
          post :create, params: valid_params, format: :json
        }.to change(Personal, :count).by(1)
      end

      it 'returns a JSON response with the created personal record' do
        post :create, params: valid_params, format: :json
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)).to include('email' => 'test@example.com')
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) { { personal: { email: 'invalid-email' } } }

      it 'does not create a new personal record' do
        expect {
          post :create, params: invalid_params, format: :json
        }.not_to change(Personal, :count)
      end

      it 'returns a JSON response with errors' do
        post :create, params: invalid_params, format: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to include('error')
      end
    end
  end
end
