class EntriesController < ApplicationController

    def index
        @entries = Entry.all 
        render json: @entries 
    end

    def create
        @entry = Entry.create(entry_params)
        render json: @entry 
    end

    def show
        @entry = Entry.find(params[:id])
        render json: @entry 
    end 

    def update
        @entry = Entry.find(params[:id])
        @entry = Entry.update(entry_params)
        render json: @entry 
    end


    private

    def entry_params
        params.require(:entry).permit(:user_id, :image_url, :content)
    end 

end
