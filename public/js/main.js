// Direccion json web
const fuentesUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
// Simple script to use with datosAbiertos

//Filtar por comienzo de letra

function filtroLetra(elemento) {
    let letra = document.querySelector(`input[name="nombrePokemon"]`).value;
    return elemento.name.startsWith(letra);
}
//Transformar a minusculas las letras que escribamos
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
//Funcion para buscar a los pokemons
function buscarPokemons(resultado) {
    let imagen;
    let divPokemon;
    let nombre;
    let tipoPokemon
    let numeroPokemon
    let divPokemons = document.createElement("div");
    divPokemons.id = "divPokemons";

    //hacemos un foreach y luego un fetch para poder coger la url de cada pokemon
    //también cogeremos el nombre y alguna características.
    resultado.forEach(pokemon => {

        const fetchPokemon = fetch(pokemon.url);
        // console.log(pokemon.url);
        fetchPokemon.then(response => {
            console.log(response);
            return response.json();

        }).then(respuesta => {

            console.log(respuesta.id);
            //creamos el div para cada Pokemon y sus caracteristcias
            divPokemon = document.createElement("div");
            //añadimos la clase para cada divPokemon
            divPokemon.classList = "divPokemon";
            //nos quedamos con la imagen frontal de cada pokemon
            imagen = document.createElement("img");
            imagen.src = respuesta.sprites.front_default;
            //console.log(imagen);

            //nos quedamos con el identificador de cada pokemon 
            numeroPokemon = document.createElement("p");
            numeroPokemon.innerText = "#" + respuesta.id;
            //añadimos el nombre tipo de cada pokemon  
            nombre = document.createElement("p");
            nombre.innerText = pokemon.name;

            //añadimos el primer tipo de cada pokemon
            //console.log(respuesta.types[0].type.url);
            tipoPokemon = document.createElement("p");
            tipoPokemon.innerText = "Type: " + respuesta.types[0].type.name;

            //creamos un div para cada pokemon para establecer imagen,texto,etc...
            divPokemon.appendChild(imagen);
            divPokemon.appendChild(numeroPokemon);
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