// URL base de la API

const  API_URL = 'https://swapi.dev/api/';

// Elementos del DOM

const content = document = document.getElementById('content');
const buttons = document.querySelectorAll('nav button');
const itemSelector = document.getElementById('item-selector');
const selectorContainer = document.getElementById('selector-container');

// Funcion para obtener los datos del API

async function fetchData(endpoint) {
    try {
        const response = await fetch(API_URL + endpoint);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(`Fetch data from ${endpoint}`, data);
        return data.results;
    }catch(error){
        console.error('Error fetching data: ', error)
        return[];
    }
}

// Card para personajes

function createCharacterCard(character){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${character.name}</h2>
    <p>Altura: ${character.height}</p>
    <p>Peso: ${character.mass} kg</p>
    <p>Año de Nacimiento: ${character.birth_year}</p>
    <p>Genero: ${character.gender}</p>
    `;
    return card;
}



// Card para planetas

function createPlanetCard(planets){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${planets.name}</h2>
    <p>Periodo de rotacion: ${planets.rotation_period}</p>
    <p>Diametro: ${planets.diameter} kg</p>
    <p>Clima: ${planets.climate}</p>
    <p>Terreno: ${planets.terrain}</p>
    <p>Poblacion: ${planets.population}</p>
    `;
    return card;
}



// Card para naves

function createStarShipCard(starships){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${starships.name}</h2>
    <p>Fabricante: ${starships.manufacturer}</p>
    <p>Tripulacion: ${starships.crew} kg</p>
    <p>Pasajeros: ${starships.passengers}</p>
    <p>Consumibles: ${starships.consumables}</p>
    <p>Calificación de hiperimpulsor: ${starships.hyperdrive_rating}</p>
    `;
    return card;
}


// Funcion para mostrar los datos

async function displayData(type) {
    content.innerHTML = '';
    itemSelector.style.display = 'block';
    itemSelector.innerHTML = '<option value="" disabled selected>Seleccione un item</option>';

    const endpoint = type === 'characters' ? 'people' : type;
    console.log(`Fetching data for endpoint: ${endpoint}`);

    const data = await fetchData(endpoint);
    if (data.length === 0){
        itemSelector.innerHTML = '<option value = "" disabled>No se encontraron datos!</option>';
        return;
    }
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.url;
        option.textContent = item.name || item.title;
        itemSelector.appendChild(option);
    });
    itemSelector.onchange = async function () {
        const url = this.value;
        const response = await fetch(url);
        const item = await response.json();
        content.innerHTML = '';

        let card;
        if (type === 'people'){
            content.style.display = 'block';
            card = createCharacterCard(item);
        }else if (type === 'planets') {
            content.style.display = 'block';
            card = createPlanetCard(item);
        } else if ( type === 'starships') {
            content.style.display = 'block';
            card = createStarShipCard(item);
        }

        if (card){
            content.appendChild(card);
        }else{
            console.error('Error: card undefined...');
        }
    };
}


//Agregar eventos a los botones
buttons.forEach(button =>{
    button.addEventListener('click', (event)=>{
        content.style.display = 'none';
        const type = event.target.id === 'characters' ? 'people' : event.target.id;
        displayData(type);
    });
});