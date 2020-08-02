class TrainersController < ApplicationController
  def index
    options = {}
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers, options)
  end
end
