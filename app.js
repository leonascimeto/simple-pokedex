const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const fetchPokemons = async() => {
  const pokemonsPromisse = [];

  for(let i =1; i <= 102; i++){
    const response = await fetch(getPokemonUrl(i));
    const json = await response.json();
    pokemonsPromisse.push(json);
  }

  const allPokemons = await Promise.all(pokemonsPromisse);
  const htmlPokemons = await allPokemons.reduce((acc, pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);

    acc += `
      <li class="card  ${types[0]}">
        <img class="card-image" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        <h2 class="card-title">${pokemon.id} . ${pokemon.name}</h2>
        <p class="card-subtitle">${types.join(" | ")}</p>
      </li>
    `;

    return acc;
  }, '')
    
  const ul = document.querySelector("ul");

  ul.innerHTML = htmlPokemons;
}

fetchPokemons();