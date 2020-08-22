const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    fetch(TRAINERS_URL)
    .then(r => r.json())
    .then(json => paste(json));
    setTimeout(() => fetch(POKEMONS_URL)
    .then(r => r.json())
    .then(json => place(json)), 500);
    setTimeout(() => z(), 1000);
    setTimeout(() => a(), 1000)
});

function paste(x) {
    for (const d of x) {
    let a = document.createElement("div");
    a.className = "card";
    a.id = d.id;
    a.innerHTML = `<p>${d.name}</p>
    <button data-trainer-id="${d.id}">Add Pokemon</button>
    <ul></ul>`;
    document.getElementsByTagName("main")[0].appendChild(a);}
}

function place(x) {
    for (const p of x) {
        const t = document.getElementById(`${p.trainer_id}`).children[2];
        let a = document.createElement('li');
        a.innerHTML = `${p.nickname} (${p.species})<button class="release" data-pokemon-id="${p.id}">Release</button>`;
        t.appendChild(a);
    }
}

function z() {
    const r = document.getElementsByClassName("release")
    for (const b of r) {
        b.addEventListener("click", function() {
            const y = b.parentElement;
            const n = parseInt(b.dataset.pokemonId);
            const config = {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                }
            };
            fetch(`${POKEMONS_URL}/${n}`, config);
            y.parentElement.removeChild(y);
        })
    }
}

function a() {
    const ar = document.getElementsByClassName("card");
    for (const c of ar) {
        const x = c.children[1]
        x.addEventListener("click", function() {
            if (c.children[2].children.length < 6) {
                const config = {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    },
                    body: JSON.stringify({trainer_id: `${c.id}`})
                };
                fetch(POKEMONS_URL, config);
                setTimeout(() => fetch(POKEMONS_URL)
                .then(r => r.json())
                .then(json => add(json)), 200)
            }
            else {alert("Must release a pokemon for room in your party")};
        })
    }
}

function add(x) {
    const p = x[x.length - 1];
    const t = document.getElementById(`${p.trainer_id}`).children[2];
    let a = document.createElement('li');
    a.innerHTML = `${p.nickname} (${p.species})<button class="release" data-pokemon-id="${p.id}">Release</button>`;
    t.appendChild(a);
}