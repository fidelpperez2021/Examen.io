const getRick = async () => {
    let characters = await fetch(`https://rickandmortyapi.com/api/character?page=2`);
    characters = await characters.json();
    
    if (characters.results) {
        for (let index = 0; index < characters.results.length; index++) {
            const characterData = await fetch(characters.results[index].url);
            characters.results[index].data = await characterData.json();
        }
    }
    
    displayCharacters(characters.results);
}

// Agregar la lógica de búsqueda
const searchCharacters = async () => {
    let characters = await fetch(`https://rickandmortyapi.com/api/character?page=2`);
    characters = await characters.json();
    
    if (characters.results) {
        for (let index = 0; index < characters.results.length; index++) {
            const characterData = await fetch(characters.results[index].url);
            characters.results[index].data = await characterData.json();
        }
    }

    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.toLowerCase();
    let filteredCharacters;
    if (searchText.trim() === '') {
        filteredCharacters = characters.results;
    } else {
        filteredCharacters = characters.results.filter(character => {
            return character.data.name.toLowerCase().includes(searchText);
        });
    }

    displayCharacters(filteredCharacters);
}

function displayCharacters(characterList) {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        if (index < characterList.length) {
            const img = item.querySelector('.service-img img');
            img.src = characterList[index].data.image;
            img.alt = characterList[index].data.name;

            const serviceName = item.querySelector('.service-content-inner h5');
            serviceName.textContent = characterList[index].data.name;

            const serviceDescription = item.querySelector('.service-content-inner p');
            serviceDescription.textContent = `Status: ${characterList[index].data.status}, Species: ${characterList[index].data.species}, Type: ${characterList[index].data.type}`;
            
            // Agregar eventos de clic a los elementos de la lista o galería
            item.addEventListener('click', () => mostrarDetalles(characterList[index]));
        } else {
            // Si no hay personajes suficientes para llenar todos los elementos, ocultarlos
            item.style.display = 'none';
        }
    });
}

function mostrarDetalles(character) {
    // Mostrar detalles del personaje en la consola
    console.log(character);
}

window.addEventListener('load', () => {
    getRick();
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchCharacters);
});

