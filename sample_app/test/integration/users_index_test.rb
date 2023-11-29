require "test_helper"

class UsersIndex < ActionDispatch::IntegrationTest
  def setup
    @admin = users(:michael)
    @non_admin = users(:archer)
  end
end

class UsersIndexAdmin < UsersIndex
  def setup
    super
    log_in_as(@admin)
    get users_path
  end
end

class UsersIndexTest < UsersIndexAdmin
  test "should be render the index page" do
    asssert_template "users/index"
  end

  test "should paginate users" do
    assert_select "div.pagination"
  end

  test "should have delete links" do
    first_page_of_users = User.where(activated: true).paginate(page: 1)
    first_page_of_users.each do |user|
      assert_select "a[href=?]", user_path(user), text: user.name
      unless user == @admin
        assert_select "a[href=?]", user_path(user), text: "delete"
      end
    end
  end

  test "should be able to delete non-admin user" do
    assert_difference "User.count", -1 do
      delete user_path(@non_admin)
    end
    assert_response :see_other
    assert_redirected_to users_url
  end
end
