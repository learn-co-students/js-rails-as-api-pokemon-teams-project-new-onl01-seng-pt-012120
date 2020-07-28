class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length < 6
            nickname = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = trainer.pokemons.create(nickname: nickname, species: species)
            render json: pokemon
        else
            render json: {message: "Not allowed to train more than 6 Pokemons"}
        end
    end

    def destroy
        render json: Pokemon.find(params[:id]).destroy
    end
end
