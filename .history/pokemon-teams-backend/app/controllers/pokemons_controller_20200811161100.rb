class PokemonsController < ApplicationController
    def create
        debugger
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        render json: Pokemon.create(nickname: name, species: species, trainer_id: trainer_id) 
    end
end
