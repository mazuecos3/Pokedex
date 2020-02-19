// Direccion json web
const fuentesUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=897";
// Simple script to use with datosAbiertos
let arrayPokemonsPromesas = [];
let mostrarImagenFondo = document.getElementById("imgBackground");
//Filtar por comienzo de letra

let cortar = true;

function filtroLetra(elemento) {
    let letra = document.querySelector(`input[name="nombrePokemon"]`).value;
    return elemento.name.startsWith(letra);
}
//Transformar a minusculas las letras que escribamos
function toLowerCase() {
    document.querySelector(`input[name="nombrePokemon"]`).value = document.querySelector(`input[name="nombrePokemon"]`).value.toLowerCase();
}

function buscar() {

    alertaNombre();
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
    let gif = document.getElementById("gifCargar");
    let divAmpliar = document.getElementById("ampliacion");
    let divCapa = document.getElementById("capaProtectora");
    let imagen;
    let url2;
    let divPokemon;
    let nombre;
    let text;
    let tipoPokemon
    let imgOcultar = document.getElementById("imgOcultar")
    let divResultados = document.getElementById("resultados");
    let divPokemons = document.createElement("div");
    divPokemons.id = "divPokemons";
    let ability;
    let select = document.getElementById("select");
    let contadorIndex = 1;

    //por cada resultado nos quedamos la url para poder acceder a sus datos
    resultado.forEach(pokemon => {
        // console.log(pokemon.url);
        //nos guardamos todas las promesas en un array para luego ejecutarlas todas en orden
        arrayPokemonsPromesas.push(devuelvePokemon(pokemon.url));
    });

    //hacemos un foreach y luego un fetch para poder coger la url de cada pokemon
    //una vez las tenemos todas hacmeos un promsie all para que una vez se cumplan todas las promesas,
    //entonces por cada una de ellas haremos un for each para crear todos los datos de cada pokemon.
    Promise.all(arrayPokemonsPromesas).then(respuesta => {

        respuesta.forEach(pokemon => {
            //console.log(pokemon);
            divPokemon = document.createElement("div");

            //añadimos la clase para cada divPokemon
            divPokemon.classList = "divPokemon";
            ability = pokemon.abilities;
            //   console.log(ability[0].ability.name);

            let abilityText = document.createElement("p");
            if (select.value == "ingles") {
                abilityText.innerText = "Main attack: " + ability[0].ability.name.toUpperCase();
            } else {
                abilityText.innerText = "Ataque Principal: " + ability[0].ability.name.toUpperCase();
            }

            divPokemon.addEventListener("click", function() {
                //PREGUNTAR DUDAS
                divAmpliar.innerHTML = "";
                // console.log(divAmpliar);
                // console.log(pokemon.name);
                url2 = pokemon.species.url;
                imagen.src = pokemon.sprites.front_default;
                nombre.innerText = pokemon.name.toUpperCase();



                // nombre.innerText = pokemon;

                const fetchPromesa = fetch(url2);

                fetchPromesa.then(response => {
                    // console.log(response);
                    return response.json();


                }).then(respuesta => {
                    // Filtramos los resultados 
                    // console.log(respuesta.flavor_text_entries[9].flavor_text);
                    text = document.createElement("p");
                    let arrayTexts = respuesta.flavor_text_entries;
                    let contador = 0;

                    // AQUI NOS QUEDAREMOS SOLO CON LAS DESCRIPCIONES QUE ESTNE EN INGLÉS, y solo con la primera descripción.
                    for (let i = 0; i < arrayTexts.length; i++) {

                        if (select.value == "ingles") {
                            if (respuesta.flavor_text_entries[i].language.name == "en" && contador == 0) {
                                text.innerText = respuesta.flavor_text_entries[i].flavor_text;
                                contador++;
                            }
                        } else {
                            if (respuesta.flavor_text_entries[i].language.name == "es" && contador == 0) {
                                text.innerText = respuesta.flavor_text_entries[i].flavor_text;
                                contador++;
                            }
                        }



                    }
                    //añadimos la descripcion al div
                    divAmpliar.appendChild(text);

                });
                //añadimos el resto de datos como nombre imagen y habilidad main a el div para mostrarlo.
                divAmpliar.appendChild(nombre);
                divAmpliar.appendChild(imagen);
                divAmpliar.appendChild(abilityText);


                //hacemos que aparecza y desaparezca el div grande al hacer click en el pokemon y fuera de el.
                divAmpliar.style.visibility = "visible";
                divCapa.style.visibility = "visible";

                divCapa.addEventListener("click", function() {
                    divAmpliar.style.visibility = "hidden";
                    divCapa.style.visibility = "hidden";
                })



            });
            //nos quedamos con la imagen frontal de cada pokemon
            imagen = document.createElement("img");
            // console.log(pokemon.name);
            imagen.tabIndex = contadorIndex;
            imagen.src = pokemon.sprites.front_default;
            imagen.alt = pokemon.name;

            contadorIndex++;
            //nos quedamos con el nombre de cad apokemon y lo ponemos con letras maysuculas
            nombre = document.createElement("p");
            nombre.innerText = pokemon.name.toUpperCase();

            //añadimos el primer tipo de cada pokemon
            tipoPokemon = document.createElement("p");
            tipoPokemon.innerText = pokemon.types[0].type.name.toUpperCase();

            /*   const fetchPromesaTypes = fetch(urlTypes);

              fetchPromesaTypes.then(response => {
                  // console.log(response);
                  return response.json();
              }).then(respuesta => {

                  if (select.value == "ingles") {
                      // si es en ingles numero 2 del json
                      //console.log(respuesta.names[6].name);    
                      tipoPokemon.innerText = respuesta.names[6].name.toUpperCase();

                  } else {
                      //si es en español, numero 4 del json
                      //console.log(respuesta.names[4].name);
                        tipoPokemon.innerText = respuesta.names[2].name.toUpperCase();

                  }
              }); */

            //añadimos todos los datos de cada pokemon al Div con los resultados del pokemon
            divPokemon.appendChild(imagen);
            divPokemon.appendChild(nombre);
            divPokemon.appendChild(tipoPokemon);


            divPokemons.appendChild(divPokemon);
        });
    }).then(function() {

        let gif = document.getElementById("gifCargar");
        gif.style.display = "none";
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

    gif.style.display = "block";
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

function alertaNombre() {
    console.log("No has escrito ningún nombre, por defecto cargaremos todos.");
    /* if (document.querySelector(`input[type="text"]`).value == "") {
        alert("No ha escrito ningún nombre, van a cargar todos los pokémons.");
    } */

}

function init() {

    // Click en el boton de buscar
    document.querySelector(`input[type="button"]`).addEventListener("click", buscar);
    // Texto cambia en el <input>
    document.querySelector(`input[type="text"]`).addEventListener("input", toLowerCase);
}

// The mother of the lamb.
window.onload = init;