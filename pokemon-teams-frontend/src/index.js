const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
// Constants
const main = document.querySelector('main');
// Functions
function loadPokemon(pokemon, uList) {
    let li = document.createElement('li');
    li.textContent = `${pokemon["nickname"]} (${pokemon["species"]})`;
    let removeBtn = document.createElement('button');
    removeBtn.setAttribute("class", "release");
    removeBtn.setAttribute("data-pokemon-id", pokemon["id"]);
    removeBtn.setAttribute("onclick", "removePokemon(event)")
    removeBtn.textContent = "Release";
    li.appendChild(removeBtn);
    uList.appendChild(li);
};

function loadPokemons(trainer, pokemonCard) {
    let ul = document.createElement('ul');
    for (const pokemon of trainer["attributes"]["pokemons"]) {
        loadPokemon(pokemon, ul);
        pokemonCard.appendChild(ul);
    }
};

function loadTrainers(trainers) {
    for (const trainer of trainers ) {
        let card = document.createElement('div');
        card.setAttribute("class", "card");
        card.setAttribute("data-id", trainer["id"]);
        let p = document.createElement('p');
        p.textContent = trainer["attributes"]["name"];
        card.appendChild(p);
        let addButton = document.createElement('button');
        addButton.setAttribute("data-trainer-id", trainer["id"]);
        addButton.setAttribute("onclick", "addPokemon(event)")
        addButton.textContent = "Add Pokemon";
        card.appendChild(addButton);
        loadPokemons(trainer, card)

        main.appendChild(card);
    }
};

function addPokemon(event) {

    let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": event.target.dataset.trainerId
        })
    }
    fetch(POKEMONS_URL, configObj)
    .then(r => r.json())
    .then(data => addPokemonToDom(data, event))
};

function addPokemonToDom(data, e) {
    if(data.message){
      alert(data.message)
    } else {
        let ul = e.target.nextSibling;
        loadPokemon(data, ul)
    }
  };
function removePokemon(event){
    fetch(POKEMONS_URL+`/${event.target.dataset.pokemonId}`, {
        method: "DELETE"
      })
      .then(r => r.json())
      .then(pokemon => removePokemonFromDom(event))
};
function removePokemonFromDom(event) {
    let li = event.target.parentNode;
    li.parentNode.removeChild(li);
  };

window.addEventListener('DOMContentLoaded', (event) => {
    fetch(TRAINERS_URL)
    .then(function(response){
        return response.json();
    })
    .then(function(trainers){
        console.log(trainers);
        loadTrainers(trainers["data"]);
    })
});
