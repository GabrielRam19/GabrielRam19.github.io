import baseDeDatos from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    let carrito = [];
   let myinput=document.getElementById('buscar');
   const divisa = '$';
   const DOMitems = document.querySelector('#items');
   const DOMcarrito = document.querySelector('#carrito');
   const DOMtotal = document.querySelector('#total');
   const DOMbotonVaciar = document.querySelector('#boton-vaciar');
   const miLocalStorage = window.localStorage;

// Funciones

/**
* Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
*/

function renderizarProductos(filtrado=baseDeDatos) {
   filtrado.forEach((info) => {
       // Estructura
       const miNodo = document.createElement('div');
       miNodo.classList.add('card', 'col-sm-4');
       // Body
       const miNodoCardBody = document.createElement('div');
       miNodoCardBody.classList.add('card-body');
       // Titulo
       const miNodoTitle = document.createElement('h5');
       miNodoTitle.classList.add('card-title');
       miNodoTitle.textContent = info.nombre;
       //Enlace
       const enlace=document.createElement('a')
       enlace.href='../TEMPLATES/Specifications.html?id='+info.id;
       enlace.textContent='Ver mas';
       // Imagen
       const miNodoImagen = document.createElement('img');
       miNodoImagen.classList.add('img-thumbnail');
       miNodoImagen.setAttribute('src', info.imagen);
       // Precio
       const miNodoPrecio = document.createElement('h6');
       miNodoPrecio.classList.add('card-text');
       miNodoPrecio.textContent = `${info.precio}${divisa}`;
       // Descripción
       const miNodoDescripcion=document.createElement('p');
       miNodoDescripcion.classList.add('card-text');
        miNodoDescripcion.textContent = `${info.descripcion}`;
       // Boton 
       const miNodoBoton = document.createElement('button');
       miNodoBoton.classList.add('btn', 'btn-primary');
       miNodoBoton.textContent = '+';
       miNodoBoton.setAttribute('marcador', info.id);
       miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
       // Insertamos
       enlace.appendChild(miNodoImagen);
       miNodoCardBody.appendChild(enlace)
       miNodoCardBody.appendChild(miNodoTitle);
       miNodoCardBody.appendChild(miNodoPrecio);
       miNodoCardBody.appendChild(miNodoDescripcion);
       miNodoCardBody.appendChild(miNodoBoton);
       miNodo.appendChild(miNodoCardBody);
       DOMitems.appendChild(miNodo);
   });
}

/**
* Evento para añadir un producto al carrito de la compra
*/
function anyadirProductoAlCarrito(evento) {
   // Anyadimos el Nodo a nuestro carrito
   carrito.push(evento.target.getAttribute('marcador'))
   // Actualizamos el carrito 
   renderizarCarrito();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
}

/**
* Dibuja todos los productos guardados en el carrito
*/
function renderizarCarrito() {
   // Vaciamos todo el html
   DOMcarrito.textContent = '';
   // Quitamos los duplicados
   const carritoSinDuplicados = [...new Set(carrito)];
   // Generamos los Nodos a partir de carrito
   carritoSinDuplicados.forEach((item) => {
       // Obtenemos el item que necesitamos de la variable base de datos
       const miItem = baseDeDatos.filter((itemBaseDatos) => {
           // ¿Coincide las id? Solo puede existir un caso
           return itemBaseDatos.id === parseInt(item);
       });
       // Cuenta el número de veces que se repite el producto
       const numeroUnidadesItem = carrito.reduce((total, itemId) => {
           // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
           return itemId === item ? total += 1 : total;
       }, 0);
       // Creamos el nodo del item del carrito
       const miNodo = document.createElement('li');
       miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
       miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
       // Boton de borrar
       const miBoton = document.createElement('button');
       miBoton.classList.add('btn', 'btn-danger', 'mx-5');
       miBoton.textContent = 'X';
       miBoton.style.marginLeft = '1rem';
       miBoton.dataset.item = item;
       miBoton.addEventListener('click', borrarItemCarrito);
       // Mezclamos nodos
       miNodo.appendChild(miBoton);
       DOMcarrito.appendChild(miNodo);
   });
   // Renderizamos el precio total en el HTML
   DOMtotal.textContent = calcularTotal();
}

/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
   // Obtenemos el producto ID que hay en el boton pulsado
   const id = evento.target.dataset.item;
   // Borramos todos los productos
   carrito = carrito.filter((carritoId) => {
       return carritoId != id;
   });
   // volvemos a renderizar
   renderizarCarrito();
   // Actualizamos el LocalStorage
   guardarCarritoEnLocalStorage();
}

/**
* Calcula el precio total teniendo en cuenta los productos repetidos
*/
function calcularTotal() {
   // Recorremos el array del carrito 
   return carrito.reduce((total, item) => {
       // De cada elemento obtenemos su precio
       const miItem = baseDeDatos.filter((itemBaseDatos) => {
           return itemBaseDatos.id === parseInt(item);
       });
       // Los sumamos al total
       return total + miItem[0].precio;
   }, 0).toFixed(2);
}

/**
* Varia el carrito y vuelve a dibujarlo
*/
function vaciarCarrito() {
   // Limpiamos los productos guardados
   carrito = [];
   // Renderizamos los cambios
   renderizarCarrito();
   // Borra LocalStorage
   localStorage.clear();
}

function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

//funcion de busqueda segun el nombre
//en esta funcion se renderizan los productos que coincidan con la busqueda inmediantamente el usuario empieza a escribir
myinput.addEventListener('input',function(){
    console.log(baseDeDatos);
    let filtrado=[];
    let busqueda=myinput.value.replace(/\s/g, "")
    baseDeDatos.forEach((info) => {
        let variable=info.nombre.replace(/\s/g, "")
        if(variable.toLowerCase().includes(busqueda.toLowerCase())){
            filtrado.push(info);
        }
    });
    DOMitems.innerHTML='';
    renderizarProductos(filtrado);
});

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();

});

export default carrito;