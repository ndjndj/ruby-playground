class AccountActivationsController < ApplicationController
  before_create :create_activation_digest

  private
    def create_activation_digest
      
    end
end
