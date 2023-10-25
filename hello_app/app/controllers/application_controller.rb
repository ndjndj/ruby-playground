class ApplicationController < ActionController::Base
    def hello 
        render html: "¡Hola, mundo!, world!"
    end
end
