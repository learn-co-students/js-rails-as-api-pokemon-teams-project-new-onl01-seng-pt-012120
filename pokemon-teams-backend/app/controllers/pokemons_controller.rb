class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all 
        render json: pokemons, only: [:id, :nickname, :species, :trainer_id] 
    end

    def show
        pokemon = Pokemon.find(params[:id])
        if pokemon
            render json: pokemon
        else
            render json: { message: 'Pokemon not found' }
        end
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
end
