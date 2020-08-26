class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
      end 
    
    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            pokemon.delete
            
        else
            render json: {message: 'error deleting pokemon from your team. Please try again.'}
        end
        
    end 
end
