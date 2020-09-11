// Variables
const formulario = document.querySelector('#formulario');
const listadoTweets = document.querySelector('#listado');
const contentError = document.querySelector('#mensajes');
let tweets  = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet );
    
    // Cuando carga el DOM
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        // console.log(tweets);
        mostrarHtmlList();
    });
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Acceder al textarea del formulario para almacenar lo que escriban en el
    const tweet = document.querySelector('#tweet').value;

    // Validar que no venga vacío o con un espacio en blanco el tweet
    if (tweet === "" || tweet === " ") {
        mostrarError('ERROR: El tweet no puede estar vacío!');
        return;
    }

    // Crear un objeto para almacenar el tweet
    const tweetObj  = {
        id: Date.now(),
        tweet
    };

    // Añadir a nuestro arreglo de tweets
    tweets = [...tweets, tweetObj];

    mostrarHtmlList();

    // Limpiar formulario
    formulario.reset();

}


function mostrarError(error) {

    let existeError = contentError.hasChildNodes();

    if (!existeError) {
        const msg = document.createElement('p');
        msg.textContent = error;
        msg.classList.add('alert');
        msg.classList.add('alert-danger');
        
        contentError.appendChild(msg);

        // Remover el mensaje de error
        setTimeout( () => {
            msg.remove();
        }, 3000);
    }

}

function mostrarHtmlList() {

    // Limpiar listado antes de mostrarlo
    limpiarListado();

    if (tweets.length > 0) {
        tweets.forEach( tweetObj => {
            // Creamos un boton para eliminación
            const btnEliminar = document.createElement('i');
            btnEliminar.classList.add('fa');
            btnEliminar.classList.add('fa-trash');
            btnEliminar.classList.add('btnEliminar');

            // Crear funcionalidad para eliminar tweet
            btnEliminar.onclick = () => {
                eliminarTweet(tweetObj.id);
            }

            // Crear el nuevo elemento
            const li = document.createElement('li');
            li.innerHTML = tweetObj.tweet;

            li.appendChild(btnEliminar);

            listadoTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agregar los tweets al storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}

// Limpiamos el listado antes de volverlo a imprimir
function limpiarListado() {
    while (listadoTweets.firstChild) {
        listadoTweets.removeChild(listadoTweets.firstChild);
    }
}

function eliminarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    
    mostrarHtmlList();
}