class TrainersController < ApplicationController
    def index
        trainers = Trainer.all 
        render json: trainers, only: [:id, :name]
    end

    def show
        trainer = Trainer.find(params[:id])
        if trainer 
            render json: trainer, only: [:id, :name]
        else
            render json: { message: 'Trianer not found' }
        end
    end
end
