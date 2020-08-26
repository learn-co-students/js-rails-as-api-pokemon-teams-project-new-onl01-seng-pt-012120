const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');

let view = {
    card: function(trainer) {
        let div = document.createElement('div');
        div.class = 'card';
        div.setAttribute('data-id', trainer.id);
            
        let p = document.createElement('p');
        p.innerText = trainer.name;

        let button = document.createElement('button');
        button.setAttribute('data-trainer-id', trainer.id);
        button.textContent = 'Add Pokemon';
        button.addEventListener('click', event => {
            
            let pokemonCount = button.nextElementSibling.childElementCount;
            let pokemonData = {'trainer_id': button.dataset.trainerId};
            if (pokemonCount < 6) {
                actions.addPokemon(pokemonData);
            } else {
                alert('Your team cannot have more than 6 members')
            }
            
        });

        let ul = document.createElement('ul');
        ul.addEventListener('click', event => {
            let targetPokemon = event.target;
            if (targetPokemon.class === 'release') {
                if (confirm('are you sure you want to delete this pokemon?')) {
                    actions.releasePokemon(targetPokemon.dataset.pokemonId);
                }
                
            }
        });

        trainer.pokemons.forEach(pokemon => {
            this.lists(pokemon, ul);
        });

        div.append(p, button, ul);
        main.appendChild(div);
        
    },

    lists: function(pokemon, ul) {
        let li = document.createElement('li');
        li.innerText = `${pokemon.nickname} (${pokemon.species})`

        let listButton = document.createElement('button');
        listButton.class = 'release';
        listButton.setAttribute('data-pokemon-id', pokemon.id);
        listButton.textContent = 'Release';

        li.appendChild(listButton);
        ul.appendChild(li);
    }
};

let actions = {
    displayTeams: function() {
        fetch(TRAINERS_URL).then(resp => resp.json()).then(trainers => {
            main.innerHTML = ''
            trainers.forEach(trainer => {
                view.card(trainer);
            });
        }).catch(error => {alert(error.message)})
    },

     addPokemon: function(pokemonData) {
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(pokemonData)
        };
        fetch(POKEMONS_URL, config).then(() => {
            this.displayTeams();
            alert('pokemon successfully added')
        })
     },

     releasePokemon: function(pokemon_id) {
        fetch(`${POKEMONS_URL}/${pokemon_id}`, {method: 'DELETE'})
         
        this.displayTeams();
        alert('pokemon released successfully')
            
         
     }

};

actions.displayTeams();
