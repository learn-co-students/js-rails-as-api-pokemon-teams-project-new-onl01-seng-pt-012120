class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        newPoke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainerId])
    end
    def destroy
        Pokemon.find_by(params[:pokeId]).destroy
    end
end
