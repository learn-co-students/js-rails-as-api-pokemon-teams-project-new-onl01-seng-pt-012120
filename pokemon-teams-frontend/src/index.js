const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function isTeamFull(teamCount) {
  if (teamCount === 6) {
    alert("I'm sorry: can only have 6 max pokemon")
    return true
  } else {
    return false
  }
}

function addNewPoke(pokemon) {
  const card = document.querySelector(`[data-id="${pokemon.attributes.trainer.id}"]`)
  const pokeUl = card.querySelector('ul')
  // debugger
  const li = document.createElement('li')
  li.innerText = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`

  const releaseButton = document.createElement('button')
  releaseButton.className = 'release'
  releaseButton.dataset.pokemonId = pokemon.id
  releaseButton.innerText = "Release"

  releaseButton.addEventListener('click', () => {
    function deletePokeFromDb(id) {
      config = {
        method: "DELETE",
        header: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        }
      }
      fetch(`${POKEMONS_URL}/${id}`, config)
        .then(res => res.json())
        .then(json => removePokeFromPage(json))
        .catch(err => console.log(err.message))
    }

    function removePokeFromPage(json) {
      const id = json.message.split(" ")[1]
      document.querySelector(`[data-pokemon-id="${id}"]`).parentNode.remove()
      // debugger
    }

    console.log(`release Pokemon: ${pokemon.id}`)
    deletePokeFromDb(pokemon.id)
  })

  li.appendChild(releaseButton)

  pokeUl.appendChild(li)
  // card.appendChild(pokeUl)
}

function renderTrainers(json) {
  const main = document.querySelector('main')

  // add each existing trainer in the DB
  for (const trainer of json['data']) {
    const pokemons = trainer.attributes.pokemons
    const card = document.createElement('div')
    const trainerName = document.createElement('p')
    const addButton = document.createElement('button')
    const pokeUl = document.createElement('ul')

    // set class and data-id for card
    card.className = 'card'
    card.dataset.id = trainer.id

    // set trainer name and id for p-tag and 'add poke button' respectively
    trainerName.innerText = trainer.attributes.name
    addButton.dataset.trainerId = trainer.id
    addButton.innerText = "Add Pokemon"

    // CREATE EVENT LISTENER FOR 'add pokemon button'
    addButton.addEventListener('click', (e) => {
      const pokeCount = e.target.parentElement.querySelector('ul').childElementCount
      // debugger
      if (!isTeamFull(pokeCount)) {
        console.log(`${trainerName.innerText} added a pokemon`)
        const trainerId = e.target.dataset.trainerId
        config = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({trainer_id: trainerId })
        }
        fetch(POKEMONS_URL, config)
          .then(res => res.json())
          .then(json => addNewPoke(json.data))
          .catch(json => console.log(json))
      }
      
    })

    // create a li for each poke with a release button
    for (const pokemon of pokemons) {
      const li = document.createElement('li')
      const releaseButton = document.createElement('button')

      li.innerText = `${pokemon.nickname} (${pokemon.species})`
      releaseButton.className = 'release'
      releaseButton.dataset.pokemonId = pokemon.id
      releaseButton.innerText = "Release"

      // logic for deleting pokemon from database then removing from DOM
      releaseButton.addEventListener('click', () => {
        function deletePokeFromDb(id) {
          config = {
            method: "DELETE",
            header: {
              'Content-Type': "application/json",
              'Accept': "application/json"
            }
          }
          fetch(`${POKEMONS_URL}/${id}`, config)
            .then(res => res.json())
            .then(json => removePokeFromPage(json))
            .catch(err => console.log(err.message))
        }

        function removePokeFromPage(json) {
          const id = json.message.split(" ")[1]
          document.querySelector(`[data-pokemon-id="${id}"]`).parentNode.remove()
          // debugger
        }

        console.log(`release Pokemon: ${pokemon.id}`)
        deletePokeFromDb(pokemon.id)
      })

      li.appendChild(releaseButton)
      pokeUl.appendChild(li)
    }

    // append new trainer card w/ pokemon below on page load
    main.appendChild(card)
    card.appendChild(trainerName)
    card.appendChild(addButton) 
    card.appendChild(pokeUl)
    // debugger
  }
}

// INITIAL CALL THAT FETCHES AND LOADS TRAINERS AND THEIR POKEMON INTO THE DOM
fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => renderTrainers(json))

