const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=150`;

const ListenningPokemons = async () => {
  const response = await fetch(baseUrl);
  console.log(response);
}

ListenningPokemons()