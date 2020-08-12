const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName('main')[0];

let displayTeams = (json) => {
    for (const trainer of json) {
        // start trainer card
        let div = document.createElement('div');
        div.className = 'card';
        div.setAttribute("data-id", trainer.id);
        div.innerHTML = `<p>${trainer.name}</p>`;
        // debugger;
        let button = document.createElement('button');
        button.setAttribute('data-trainer-id', trainer.id);
        button.addEventListener('click', (e)=>{
            // get trainer id
            // use faker to create new pokemon and add to trainers card
        });
        div.appendChild(button);
        //create list of pokemon 
        let pl = document.createElement('ul');
        let pokemons = trainer.pokemons;
        for (const p of pokemons) {
            let li = document.createElement('li');
            li.innerText = `${p.nickname} (${p.species})`;
            let release = document.createElement('button'); 
            release.className = 'release';
            release.setAttribute('data-pokemon-id' , p.id);
            release.innerText = 'Release';
            release.addEventListener('click', (e)=>{
                // set pokemon free
                // remove pokemon from trainer card 
                // patch trainer to DELETE pokemon
            })
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