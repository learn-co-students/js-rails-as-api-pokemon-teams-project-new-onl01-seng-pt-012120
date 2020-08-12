class Trainer < ApplicationRecord
    has_many :pokemons

    def self.addPokemon
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        Pokemon.create(nickname: name, species: species, trainer_id: self.id)
    end
end
