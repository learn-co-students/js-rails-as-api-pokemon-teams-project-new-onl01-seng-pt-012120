class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers, include: [id:, name:]        
    end
end
