import baseDeDatos from "./db.js";

document.addEventListener('DOMContentLoaded', () => {

const DOMmain = document.querySelector('#main');

let carrito=JSON.parse(localStorage.getItem('carrito')) || [];
let boton=document.getElementById('agregar');
let contador=document.getElementsByClassName('contador')[0];
boton.addEventListener('click',agregarAlCarrito);

let DOMContador=document.getElementById('header');

function obtenerParametroUrl(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
  }

  // Obtén el id del producto de la URL
  const productId = obtenerParametroUrl('id');
  const productoSeleccionado=baseDeDatos.find(producto => producto.id == parseInt(productId));
  document.title = productoSeleccionado.nombre;

function renderizarSpecs(info) {
        //titulo
        const titulo = document.createElement('h1');
        titulo.classList.add('titulo');
        titulo.textContent = `${info.nombre}`;
        //divtitulo
        const divtitulo = document.createElement('div');
        divtitulo.classList.add('divtitulo');
        //descripcion
        const desc = document.createElement('p');
        desc.classList.add('descripcion');
        desc.textContent = `${info.descripcion}`;
        //divdescripcion
        const divdesc = document.createElement('div');
        divdesc.classList.add('divdesc');
        //descripcion 2
        const desc2 = document.createElement('p');
        desc2.classList.add('descripcion2');
        desc2.textContent = `${info.descripcion1}`;
        //titulo 2
        const titulo2 = document.createElement('h3');
        titulo2.classList.add('titulo2');
        titulo2.textContent = `Especificaciones`;
        //especificaciones
        const espec = document.createElement('p');
        espec.classList.add('espec');
        espec.textContent = `${info.caracteristicas}`;
        //imagen de presentacion
        const Nodo = document.createElement('img');
        Nodo.classList.add('imagen');
        Nodo.setAttribute('src', info.imagen1);
        //div
        const div = document.createElement('div');
        div.setAttribute('id','contenedor')
        div.classList.add('div');
        //se agregan los nodos hijo
        divtitulo.appendChild(titulo);
        divdesc.appendChild(desc);
        divdesc.appendChild(desc2);
        div.appendChild(espec)
        div.appendChild(Nodo);
        DOMmain.appendChild(divtitulo);
        DOMmain.appendChild(divdesc);
        DOMmain.appendChild(titulo2);
        DOMmain.appendChild(div);
}

function renderizarContador(){
    contador.textContent=carrito.length+' productos';
    DOMContador.appendChild(contador);
}



function agregarAlCarrito(){
    carrito.push(productoSeleccionado.id);
    guardarCarritoEnLocalStorage();
    renderizarContador();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const slideData=[
  {src:productoSeleccionado.imagen1, alt:'imagen1'},
  {src:productoSeleccionado.imagen2, alt:'imagen2'},
  {src:productoSeleccionado.imagen3, alt:'imagen3'}
];

// Función para agregar diapositivas al carrusel
function populateCarousel() {
  const carouselInner = document.querySelector('#dynamicCarousel .carousel-inner');
  carouselInner.innerHTML = '';

  slideData.forEach((slide, index) => {
      const item = document.createElement('div');
      item.classList.add('carousel-item');
      if (index === 0) {
          item.classList.add('active');
      }

      const image = document.createElement('img');
      image.src = slide.src;
      image.alt = slide.alt;
      image.classList.add('d-block', 'w-100');

      item.appendChild(image);
      carouselInner.appendChild(item);
  });
}

populateCarousel();
renderizarSpecs(productoSeleccionado);
renderizarContador();
});