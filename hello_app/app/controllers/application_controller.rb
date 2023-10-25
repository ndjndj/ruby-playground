class ApplicationController < ActionController::Base
    def hello 
        render html: "<h1>HEEEELLLLLLLLOOOOOOO</h1>"
    end
end
