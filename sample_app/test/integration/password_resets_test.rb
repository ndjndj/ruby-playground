require "test_helper"

class PasswordResets < ActionDispatch::IntegrationTest
  def setup
    ActionMailer::Base.deliveries.clear
  end
end

class PasswordResetsTest < ActionDispatch::IntegrationTest

end
