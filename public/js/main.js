// Direccion json web
const fuentesUrl = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20";
// Simple script to use with datosAbiertos

// Esta es la funcion de filtrado para
// obtener tan solo los elementos que cumplen
// una serie de requisitos.

function filtroLetra(elemento) {
    let letra = document.querySelector(`input[name="nombrePokemon"]`).value;
    return elemento.name.startsWith(letra);
}

// Pasa a mayuscula el texto de propio input
// se lanza cada vez que se realiza una insercion en
// el texto del nombre.
function toLowerCase() {
    document.querySelector(`input[name="nombrePokemon"]`).value = document.querySelector(`input[name="nombrePokemon"]`).value.toLowerCase();
}

function buscar() {

    // Obtenemos el JSON que esta definido
    const fetchPromesa = fetch(fuentesUrl);

    fetchPromesa.then(response => {
        return response.json();
    }).then(respuesta => {
        // Filtramos los resultados 
        let resultado = respuesta.results.filter(filtroLetra);
        buscarPokemons(resultado);
    });
}

function buscarPokemons(resultado) {
    let imagen;
    let divPokemon;
    let nombre;
    let tipoPokemon
    let divPokemons = document.createElement("div");
    divPokemons.id = "divPokemons";

    //hacemos un foreach y luego un fetch para poder coger la url de cada pokemon
    //también cogeremos el nombre y alguna características.
    resultado.forEach(pokemon => {

        const fetchPokemon = fetch(pokemon.url);
        // console.log(pokemon.url);
        fetchPokemon.then(response => {
            //console.log(response);
            return response.json();
        }).then(respuesta => {
            divPokemon = document.createElement("div");
            divPokemon.id = "divPokemon";
            //nos quedamos con la imagen frontal de cada pokemon
            imagen = document.createElement("img");
            imagen.src = respuesta.sprites.front_default;

            //console.log(imagen);
            nombre = document.createElement("p");
            nombre.innerHTML = "Name: " + pokemon.name;

            //añadimos el primer tipo de cada pokemon
            console.log(respuesta.types[0].type.name);
            tipoPokemon = document.createElement("p");
            tipoPokemon.innerText = "Type: " + respuesta.types[0].type.name;

            //creamos un div para cada pokemon para establecer imagen,texto,etc...
            divPokemon.appendChild(imagen);
            divPokemon.appendChild(nombre);
            divPokemon.appendChild(tipoPokemon);
            divPokemons.appendChild(divPokemon);
        });
    });
    // Establecemos el divPokemons en la Web
    document.querySelector(".resultados").innerHTML = "";
    document.querySelector(".resultados").appendChild(divPokemons);
}

function init() {

    // Click en el boton de buscar
    document.querySelector(`input[type="button"]`).addEventListener("click", buscar);
    // Texto cambia en el <input>
    document.querySelector(`input[type="text"]`).addEventListener("input", toLowerCase);
}

// The mother of the lamb.
window.onload = init;