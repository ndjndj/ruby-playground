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
  end
end

class PasswordResetsTest < ActionDispatch::IntegrationTest

end
