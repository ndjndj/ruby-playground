class Api::V1::User::ConfirmationsController < Api::V1::BaseController
  def update
    user = User.find_by(confirmation_token: params[:confirmation_token])

    return render json: { message: "User record is not found." }, status: :not_found if user.nil?
  end
end
