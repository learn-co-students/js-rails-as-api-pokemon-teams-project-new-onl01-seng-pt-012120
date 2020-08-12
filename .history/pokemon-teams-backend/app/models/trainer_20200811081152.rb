class Trainer < ApplicationRecord
    has_many :pokemons

    def addPokemon
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    end
end
