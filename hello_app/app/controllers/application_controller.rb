class ApplicationController < ActionController::Base
    def hello 
        render html: "<h1>HEEEELLLLLLLLOOOOOOO</h1>"
    end

    def goodbye
        render html:"good bye"
    end
end
