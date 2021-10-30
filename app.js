const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const pokemonsPromises = () => {
  return Array.from({length:150})
    .map(async (el,index) => {
      const response = await fetch(getPokemonUrl(index+1));
      return await response.json();
    })
}

const populatePokemonList = async() => {

  const allPokemons = await Promise.all(pokemonsPromises());
  const htmlPokemons = await allPokemons.reduce((acc, {types, id, name, sprites}) => {
    const typesValues = types.map(typeInfo => typeInfo.type.name);

    acc += `
      <li class="card  ${typesValues[0]}">
        <img class="card-image" src="${sprites.other.dream_world.front_default}" alt="${name}">
        <h2 class="card-title">${id} . ${name}</h2>
        <p class="card-subtitle">${typesValues.join(" | ")}</p>
      </li>
    `;

    return acc;
  }, '')
    
  const ul = document.querySelector("ul");

  ul.innerHTML = htmlPokemons;
}

populatePokemonList();