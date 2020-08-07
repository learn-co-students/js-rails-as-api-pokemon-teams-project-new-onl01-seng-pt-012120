const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
})

function fetchTrainers() {
    return fetch("http://localhost:3000/trainers")
    .then(resp => resp.json())
    .then(json => json.forEach(trainer => addTrainerCard(trainer)));
}

function addTrainerCard(obj) {
    const main = document.querySelector('main')
    const trainerCard = document.createElement('div');
    trainerCard.className = 'card';
    trainerCard.setAttribute('data-id', obj.id);
    trainerCard.id = obj.id;
    trainerCard.innerHTML += `<p>${obj.name}</p> <ul></ul>`
    const pokemons = obj.pokemons;
    pokemons.forEach(poke => renderPokemon(poke));
    
    const btn = document.createElement('button');
    btn.setAttribute('data-trainer-id', obj.id);
    btn.innerText = "Add Pokemon";
    //btn.addEventListener('click', addPokemon);
    
    trainerCard.appendChild(btn);
    main.appendChild(trainerCard)
    //obj.pokemons.forEach(poke => renderPokemon(poke))
}

//function addPokemon() {
//
//}

function renderPokemon(obj) {
    const tr_id = obj.trainer_id;
    console.log(tr_id);
    const card = document.getElementById(tr_id);
    debugger
    //const ul = card.getElementsByTagName('ul');
    //const li = document.createElement('li');
    //li.innerHTML += `${obj.nickname} (${obj.species}) <button class="release" data-pokemon-id=${obj.id}>Release</button>`
    //ul.appendChild(li)
}