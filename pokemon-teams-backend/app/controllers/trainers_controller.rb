class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        options = {
            except: [:created_at, :updated_at],
            include: {
                pokemons: {
                    only: [:id, :species, :nickname]
                }
            }
        }
        render json: trainers.to_json(options)
    end
    
end
