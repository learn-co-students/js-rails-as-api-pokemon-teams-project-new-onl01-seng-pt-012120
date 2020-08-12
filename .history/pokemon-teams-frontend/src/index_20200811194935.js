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
        button.innerText = "Add Pokemon"
        button.addEventListener('click', (e)=>{
            // fetch new pokemon
            let dataToSend = {trainerId: e.target.dataset.trainerId}; 
            let configObj = {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }
            fetch(`${POKEMONS_URL}`, configObj)
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
                // delete pokemon fetch delete
                let poke2Delete = {pokeId: e.target.dataset.pokemonId};
                let configObj = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify(poke2Delete)
                };
                fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`,configObj);
            });
            li.appendChild(release);
            pl.appendChild(li);
        };
        // append list to div
        div.appendChild(pl);
        // append card to main element
        main.appendChild(div);
    };
}

fetch(TRAINERS_URL).then(resp => resp.json()).then(json => displayTeams(json));