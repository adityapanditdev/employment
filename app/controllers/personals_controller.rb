class PersonalsController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]

  def index
  end

  def all
    personals = Personal.all
    render json: personals
  end

  def create
    personal = Personal.new(personal_params)
    if personal.save
      render json: personal
    else
      render json: {error: personal.errors.full_message }
    end
  end

  private

  def personal_params
    params.require(:personal).permit(
      :email,
      personal_info: [:firstName, :lastName, :nickname, :phoneNumber],
      address: [:street, :city, :state, :zip]
    )
  end
end
