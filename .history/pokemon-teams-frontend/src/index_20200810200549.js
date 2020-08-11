const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementById('main');


let displayTeams = (json) => {
    for (const trainer of json) {
        // start trainer card
        let div = document.createElement('div');
        div.className = 'card';
        div.dataset = trainer.id;
        div.innerHTML = `<p>${trainer.name}</p>`;
        debugger;
        let button = document.createElement('button');
        button.dataset = trainer.id;
        div.appendChild(button);
        //create list of pokemon 
        let pl = document.createElement('ul');
        let pokemons = trainer.pokemons;
        for (const p of pokemons) {
            let li = document.createElement('li');
            li.innerText = `${p.nickname} (${p.species})`;
            let release = document.createElement('button'); 
            release.className('release');
            release.dataset = p.id;
            li.appendChild(release);
            pl.appendChild(li);
        }
        // append list to div
        div.appendChild(pl);
        // append card to main element
        main.appendChild(div);
    }
}

fetch('http://localhost:3000/trainers').then(resp => resp.json()).then(json => displayTeams(json));