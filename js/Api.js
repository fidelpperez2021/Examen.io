const getRick = async () => {
    let characters = await fetch(`https://rickandmortyapi.com/api/character?page=2`);
    characters = await characters.json();
    console.log(characters);
    
    if (characters.results){
        for (let index = 0; index < characters.results.length; index++) {
            const characterData = await fetch(characters.results[index].url);
            characters.results[index].data = await characterData.json();
        }
    }
    console.log(characters);
    displayCharacters(characters.results);
}

function displayCharacters(characterList) {
    const serviceItems = document.querySelectorAll('.service-item');
    characterList.forEach((character, index) => {
        if (index < serviceItems.length) {
            const img = serviceItems[index].querySelector('.service-img img');
            img.src = character.data.image;
            img.alt = character.data.name;

            const serviceName = serviceItems[index].querySelector('.service-content-inner h5');
            serviceName.textContent = character.data.name;

            const serviceDescription = serviceItems[index].querySelector('.service-content-inner p');
            serviceDescription.textContent = `Status: ${character.data.status}, Species: ${character.data.species}, Type: ${character.data.type}`;
            
            // Agregar eventos de clic a los elementos de la lista o galería
            serviceItems[index].addEventListener('click', () => mostrarDetalles(character));
        }
    });
}

function mostrarDetalles(character) {
    // Mostrar detalles del personaje en la consola
    console.log(character);
}

window.addEventListener('load', getRick);
