require "test_helper"

class UsersSignup < ActionDispatch::IntegrationTest
  def setup
    ActionMailer::Base.deliveries.clear
  end
end

class UsersSignupTest < UsersSignup
  test "invalid signup information" do
    assert_no_difference "User.count" do
      post users_path, params: {
        user: {
          name: "",
          email: "user@invalid",
          password: "foo",
          password_confirmation: "bbbb"
        }
      }
    end
    assert_response :unprocessable_entity
    assert_template "users/new"
    assert_select "div#error_explanation"
    assert_select "div.field_with_errors"
  end

  test "valid signup information with account activation" do
    assert_difference "User.count", 1 do
      post users_path, params: {
        user: {
          name: "Example User",
          email: "user@example.com",
          password: "passwordpassword",
          password_confirmation: "passwordpassword"
        }
      }
    end
    assert_equal 1, ActionMailer::Base.deliveries.size
  end
end
