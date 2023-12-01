require "test_helper"

class MicropostsInterface < ActionDispatch::IntegrationTest
  def setup
    @user = users(:michael)
    log_in_as(@user)
  end
end

class MicropostsInterfaceTest < MicropostsInterface

  test "should paginate microposts" do
    get root_path
    assert_select "div.pagination"
  end

  test "should show errors but not create micropost on invalid submission" do
    assert_no_difference "Micropost.count" do
      post microposts_path, params: {micropost: {content: ""}}
    end
  end
end
