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
            // make new pokemon to send to post to trainer/:id
            // fetch new pokemon
            console.log(e.target.dataset);
            // fetch(`${POKEMONS_URL}/create`)

            // add pokemons info to current cards team
            // let newPokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: e.target.dataset.id)

            // let whatToChange = {
            //     nickname: name,
            //     species: species,
            //     trainer_id: e.target.dataset.id
            // }
            // let configObj = {
            //     method: 'post',
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(whatToChange)
            // }
            
            // fetch(`${TRAINERS_URL}${e.target.dataset.id}`, configObj)
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

fetch(TRAINERS_URL).then(resp => resp.json()).then(json => displayTeams(json));