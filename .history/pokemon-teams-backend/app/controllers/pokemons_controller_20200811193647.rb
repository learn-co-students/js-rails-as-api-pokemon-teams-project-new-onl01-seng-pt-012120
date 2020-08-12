class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        newPoke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainerId])
        # render json: newPoke
    end
end
