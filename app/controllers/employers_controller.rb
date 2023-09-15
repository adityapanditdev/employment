class EmployersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @employers = Employer.all
    render json: @employers
  end

  def create
    employer = Employer.new
    employer.name = params[:employer][:name]
    employer.start_date = Date.strptime(params[:employer][:start_date], "%m/%d/%Y")
    employer.end_date = Date.strptime(params[:employer][:end_date], "%m/%d/%Y")
    if employer.save
      render json: employer
    else
      render json: {error: personal.errors.full_message }
    end
  end
end
