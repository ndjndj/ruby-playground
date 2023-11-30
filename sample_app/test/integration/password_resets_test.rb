require "test_helper"

class PasswordResets < ActionDispatch::IntegrationTest
  def setup
    ActionMailer::Base.deliveries.clear
  end
end

class ForgotPasswordFormTest < PasswordResets
  test "password reset path" do
    get new_password_reset_path
    assert_template "password_resets/new"
    assert_select "input[name=?]", "password_reset[email]"
  end

  test "reset path with invalid email" do
    post password_resets_path, params: {password_reset: {email: ""}}
    assert_response :unprocessable_entity
    assert_not flash.empty?
    assert_template "password_resets/new"
  end
end

class PasswordResetForm < PasswordResets
  def setup
    super
    @user = users(:michael)
    post password_resets_path,
         params: {password_reset: {email: @user.email}}
    @reset_user = assigns(:user)
  end
end

class PasswordFormTest < PasswordResetForm
  test "reset with valid email" do
    assert_not_equal @user.reset_digest, @reset_user.reset_digest
    assert_equal 1, ActionMailer::Base.deliveries.size
    asssert_not flash.empty?
    assert_redirected_to root_url
  end
end
