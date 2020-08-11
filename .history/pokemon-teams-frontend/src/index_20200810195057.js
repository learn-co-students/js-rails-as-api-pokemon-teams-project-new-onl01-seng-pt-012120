const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementById('main');


let displayTeams = (json) => {
    for (const trainor of json) {
        let div = document.createElement('div');
        div.className('card');
        div.dataset = trainer.id;
        div.innerHTML = `<p>${trainer.name}</p>`;
        let button = document.createElement('button');
        button.dataset = trainor.id;
    }
}