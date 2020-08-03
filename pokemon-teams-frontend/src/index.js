const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

console.log("%c Welcome to pokèmon trainers!", "color: yellow; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: blue;  font-size: 50px;");
const trainersContainer = document.querySelector('main');

fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(trainers => {
  trainers.forEach(trainer => {
    const trainerHTML = `
    <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button data-action="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul data-trainer-ul-id=${trainer.id}>
      </ul>
    </div>`;

    trainersContainer.insertAdjacentHTML('beforeend', trainerHTML);
    const trainerUl = document.querySelector(`[data-trainer-ul-id='${trainer.id}']`);
    trainer.pokemons.forEach(pokemon => {
      const pokeHTML = `
<<<<<<< HEAD
      <li>${pokemon.nickname} (${pokemon.species}) 
=======
      <li>${pokemon.nickname} (${pokemon.species})
>>>>>>> 9d5049cde06165cefeeaacdbe02fcb2133a25c20
        <button class="release" data-pokemon-id=${pokemon.id}>
          Release
        </button>
      </li>`;

      trainerUl.insertAdjacentHTML('beforeend', pokeHTML);
    })
  })
<<<<<<< HEAD
}); 
=======
});
>>>>>>> 9d5049cde06165cefeeaacdbe02fcb2133a25c20

// EVENT DELEGATION:
trainersContainer.addEventListener('click', (e) => {
  if (e.target.dataset.action === "add"){
    const trainerId = e.target.dataset.trainerId;
    const trainerUl = e.target.parentNode.querySelector('ul');
    if (trainerUl.children.length < 6){
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "trainer_id": trainerId
        })
      })
      .then(resp => resp.json())
      .then(newPokemon => {
        const pokeHTML = `
<<<<<<< HEAD
        <li>${newPokemon.nickname} (${newPokemon.species}) 
=======
        <li>${newPokemon.nickname} (${newPokemon.species})
>>>>>>> 9d5049cde06165cefeeaacdbe02fcb2133a25c20
          <button class="release" data-pokemon-id=${newPokemon.id}>
            Release
          </button>
        </li>`;
<<<<<<< HEAD
  
=======

>>>>>>> 9d5049cde06165cefeeaacdbe02fcb2133a25c20
        trainerUl.insertAdjacentHTML('beforeend', pokeHTML);
      })
    }
  };
  if (e.target.classList.contains("release")){
    const pokemonId = e.target.dataset.pokemonId;
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => e.target.parentNode.remove());
  }

<<<<<<< HEAD
})
=======
})
>>>>>>> 9d5049cde06165cefeeaacdbe02fcb2133a25c20
