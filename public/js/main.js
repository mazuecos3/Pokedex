// Direccion json web
const fuentesUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";
// Simple script to use with datosAbiertos
let arrayPokemonsPromesas = [];
let mostrarImagenFondo = document.getElementById("imgBackground");
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
    let numeroPokemon;
    let imgOcultar = document.getElementById("imgOcultar")
    let divResultados = document.getElementById("resultados");
    let divPokemons = document.createElement("div");
    divPokemons.id = "divPokemons";

    //por cada resultado nos quedamos la url para poder acceder a sus datos
    resultado.forEach(pokemon => {
        // console.log(pokemon.url);
        //nos guardamos todas las promesas en un array para luego ejecutarlas todas en orden
        arrayPokemonsPromesas.push(devuelvePokemon(pokemon.url));
    });

    //una vez las tenemos todas hacmeos un promsie all para que una vez se cumplan todas las promesas,
    //entonces por cada una de ellas haremos un for each para crear todos los datos de cada pokemon.
    Promise.all(arrayPokemonsPromesas).then(respuesta => {
        //hacemos un foreach y luego un fetch para poder coger la url de cada pokemon
        respuesta.forEach(pokemon => {
            divPokemon = document.createElement("div");
            //añadimos la clase para cada divPokemon
            divPokemon.classList = "divPokemon";
            //nos quedamos con la imagen frontal de cada pokemon
            imagen = document.createElement("img");
            imagen.src = pokemon.sprites.front_default;
            //console.log(imagen);

            //nos quedamos con el identificador de cada pokemon 
            numeroPokemon = document.createElement("p");
            numeroPokemon.innerText = "#" + pokemon.id;
            //añadimos el nombre tipo de cada pokemon  
            nombre = document.createElement("p");
            nombre.innerText = pokemon.name.toUpperCase();

            //añadimos el primer tipo de cada pokemon
            //console.log(respuesta.types[0].type.url);
            tipoPokemon = document.createElement("p");
            tipoPokemon.innerText = pokemon.types[0].type.name.toUpperCase();


            divPokemon.appendChild(imagen);
            divPokemon.appendChild(numeroPokemon);
            divPokemon.appendChild(nombre);
            divPokemon.appendChild(tipoPokemon);

            //añadimos todos los datos de cada pokemon al Div con los resultados del pokemon
            divPokemons.appendChild(divPokemon);
        });



    })

    //lo establecemos en blanco para que cada vez que busquemos se refresque.

    divResultados.innerHTML = "";
    //añadimos todos los pokemons a el div de los Resultados
    divResultados.appendChild(divPokemons);

    //acabar en casa
    if (divResultados.innerHTML == "") {
        //Función para deshabilitar la imagen de fondo
        imgOcultar.style.display = "block";
    } else {
        //Función para habilitar la imagen de fondo
        imgOcultar.style.display = "none";
    }
    arrayPokemonsPromesas = [];
}

function devuelvePokemon(url) {
    const fetchPokemon = fetch(url);
    return fetchPokemon.then(response => {
        //console.log(response);
        return response.json();

    }).then(respuesta => {

        return respuesta;
        //creamos el div para cada Pokemon y sus caracteristcias

    });
}

function init() {

    // Click en el boton de buscar
    document.querySelector(`input[type="button"]`).addEventListener("click", buscar);
    // Texto cambia en el <input>
    document.querySelector(`input[type="text"]`).addEventListener("input", toLowerCase);
}

// The mother of the lamb.
window.onload = init;