// Direccion json web
const fuentesUrl = "https://pokeapi.co/api/v2/pokemon";
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
function toUpp() {
    document.querySelector(`input[name="nombrePokemon"]`).value = document.querySelector(`input[name="nombrePokemon"]`).value.toLowerCase();
}


function buscar() {

    // Obtenemos el JSON que esta definido
    const fetchPromesa = fetch(fuentesUrl);

    // Cuando se resuelva la promesa
    fetchPromesa.then(response => {
        // la pasamos a JSON
        return response.json();
        // Y entonces
    }).then(respuesta => {
        // Filtramos los resultados con el filtro definido anteriormente

        console.log(respuesta.results);
        const resultado = respuesta.results.filter(filtroLetra);

        let divPokemons = document.createElement("div");


        resultado.forEach(pokemon => {

            let calleli = document.createElement("p");
            calleli.innerHTML = pokemon.name;

            divPokemons.appendChild(calleli);
        });
        // Establecemos el divPokemons en la Web
        document.querySelector(".resultados").innerHTML = "";
        document.querySelector(".resultados").appendChild(divPokemons);
    });
}

function init() {

    // Binding de los eventos correspondientes.

    // Click en el boton de buscar
    document.querySelector(`input[type="button"]`).addEventListener("click", buscar);
    // Texto cambia en el <input>
    document.querySelector(`input[type="text"]`).addEventListener("input", toUpp);
}

// The mother of the lamb.
window.onload = init;