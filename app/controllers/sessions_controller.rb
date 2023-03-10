class SessionsController < ApplicationController
    def create

        @user = User.find_by(name: session_params[:name])
      
        if @user && @user.authenticate(session_params[:password])
          login!
          render json: {
            status: 200,
            data: {
              logged_in: true,
              user: @user
            },
            message: 'login successful' 
          }
        elsif @user
          render json: { 
            status: 401,
            message: 'incorrect password entered'
          }
        else
          render json: { 
            status: 401,
            message: 'no such user present'
          }  
        end
    end

    def is_logged_in?
        if logged_in? && current_user
          render json: {
            status: 200,
            data: {
              logged_in: true,
              user: current_user  
            },
            message: 'user is logged in'
          }
        else
          render json: {
            status: 401,
            logged_in: false,
            message: 'no user logged in'
          }
        end
    end
    
    def destroy
          logout!
          render json: {
            status: 200,
            logged_out: true,
            message: 'logged out successfully'
          }
    end
    
    private
    
    def session_params
          params.require(:user).permit(:name, :password)
    end
end
