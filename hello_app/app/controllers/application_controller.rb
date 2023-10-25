class ApplicationController < ActionController::Base
    def hello 
        render html: "hellor, world!"
    end
end
