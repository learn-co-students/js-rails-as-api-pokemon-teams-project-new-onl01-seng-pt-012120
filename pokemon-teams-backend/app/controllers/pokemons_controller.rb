class PokemonsController < ApplicationController
    def index
      pokemons = Pokemon.all
      render json: PokemonSerializer.new(pokemons)
    end
  
    def create
      new_poke = Pokemon.new(JSON(request.body.read))
      new_poke.nickname = Faker::Name.first_name
      new_poke.species = Faker::Games::Pokemon.name
      new_poke.save
  
      render json: PokemonSerializer.new(new_poke)
    end
  
    def show
      pokemon = Pokemon.find_by(id: params[:id])
      render json: PokemonSerializer.new(pokemon)
    end
  
    def destroy
      # binding.pry
      Pokemon.find_by(id: params[:id]).destroy
      render json: { message: "pokemon #{params[:id]} deleted" }
    end
  end
