const infoAPI = {
  baseUrl: `https://pokeapi.co/api/v2/pokemon/`,
  totalItems: 649
}

const limitItems = 20;
const statePage = {
  current: 1,
  limitItems,
  totalPages: Math.ceil(infoAPI.totalItems / limitItems),
}

const html = {
    select(element){
      return document.querySelectorAll(element);
    }
}

const controls = {
  next(){
    (statePage.current < statePage.totalPages) && statePage.current++;
    update();
  },
  prev(){
    (statePage.current > 1) && statePage.current--;
    update();
  },
  goTO(option){
    if(option > 1 && option <= statePage.totalPages)
      statePage.current = +option;
      update();
  },
  eventsButtons(){
    const btnPrev = html.select(".prev");
    btnPrev.forEach((el) => el.addEventListener("click", this.prev));

    const btnNext = html.select(".next");
    btnNext.forEach((el) => el.addEventListener("click", this.next));

  }
}

function getPokemonUrl(id){
  return infoAPI.baseUrl + String(id);
}

 function listPromises(){
  const {current, limitItems, totalPages} = statePage;
  const {totalItems} = infoAPI;
  let startArray = ((current - 1) * limitItems);

  const limit = ((startArray + limitItems) > totalItems) ? limitItems - ((startArray + limitItems) - totalItems) : limitItems;

  console.log(limit)

  const promises = Array.from({length: limit}).map(async(item) => {
      startArray++;
      console.log(getPokemonUrl(startArray))
      const response = await fetch(getPokemonUrl(startArray));
      const json = await response.json();
      return json;
  });

  return promises;
}

async function populateList(){
  try {
    const resutPromises = await Promise.all(listPromises());
    const htmlPokemons = await resutPromises.reduce((acc, {types, id, name, sprites}) => {
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
      ul.innerHTML = "";
      ul.innerHTML = htmlPokemons; 
    
  } catch (error) {
    alert("erro na conexão com os dados")
    console.error(error);
  }
}

function update(){
  console.log(statePage.current);
  console.log("totalPages: ",statePage.totalPages)
  populateList();
}

function init(){
  controls.eventsButtons();
  update();
}

init();