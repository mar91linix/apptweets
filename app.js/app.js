//variables
const furmulario = document.querySelector('#formulario');
const listadoTweets = document.querySelector('#listado');
const contentError = document.querySelector('#mensajes');
let tweet =  [];

//evenlisten
eventListeners();

 function eventListeners(){
     //cuando el usuario agrega un nuevo tweet
     formulario.addEventListener('submit', agregarTweet );

     //cuando carga el DOM
     document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets') ) || [];
        mostrarHtmlList();
     }) ;
 }

//funciones
function agregarTweet(e) {
    e.preventDefaut();

    //acceder al textarea del formulario para almacenar lo que escriban en el 
    const tweet = document.querySelector('#tweet').Value;

     //validar que no venga vacio o con un espacio en blanco el tweet 
    if(tweet === "" || tweet === "") {
           mostrarError('ERROR :EL tweet no puede estar vacio');
           return;
        }
        //crear un objeto para almacenar el tweet
        const tweetObj = {
            id: Date.now(),
            tweet
        };
    //Anñadir a nuestro areglo de tweets

    tweets = [...tweets, tweetObj];

      mostrarHtmlList();   
      //limpiar formulario
      formulario.reset();
    };
    function mostrarError(error) {

    let existeError = contentError.hasChildNodes();

        if (!existError){
            
        const msg = document.createElement('p');
        msg.textContent = error;
        msg.classList.add('alert');
        msg.classList.add('alert-danger');

        contentError.appendChild(msg);
           
        setTimeout ( () => {
            msg.remove();
        },300);
    }
}

function mostrarHtmlList(){
    // limpiar listado antes de mostarlo 
    limpiarListado();

if (tweets.length > 0) {
    tweets.forEach( tweetObj => {
         //crear un boton papa eliminar
        const btnEliminar = documnt.createElement('i  ');
        btnEliminar.classList.add('fa');
        btnEliminar.classList.add('fa-trash');
        btnEliminar.classList.add('btnEliminar');
    
        //crear funcionalidad para eliminzzr tweet
        btnEliminar.onclik =() => {
            eliminarTweet(tweetObj.id);
        }

       // Crear nuevo elemento
        const li = document.createElement('li');
        li.innerHTML = tweetObj.tweet;

        li.appendChild(btnEliminar);

        listadoTweets.appendChild(li);
    });
}
sincronizarStorage();
}
// agregar los tweets al storage

function sincronizarStorage() {
     localStorage.setItem('tweets',JSON.stringify(tweets) );
} 

// Limpiamos el listado antes de volverlo a imprimir
function limpiarListado() {
    while (listadoTweets.firstChild) {
        listadoTweets.removeChild(listadoTweets.firstChild);
    }
}
 function  eliminarTweet(id) {
     tweets = tweets.filter(tweet => tweet.id !== id);

     mostrarHtmlList();
 }