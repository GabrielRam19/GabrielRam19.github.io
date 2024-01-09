document.addEventListener('DOMContentLoaded', () => {
    // Variables
const baseDeDatos = [
   {
       id: 1,
       nombre: 'PlayStation 5',
       imagen1:'../IMG/stock ps5.jpg',
       descripcion: 'Consola de ultima generación de Sony.\n cuenta con los componentes mas modernos en el mercado actual.'
   }
]
const DOMmain = document.querySelector('#main');

function renderizarSpecs() {
    baseDeDatos.forEach((info)=> {
        //imagen de presentacion
        const Nodo = document.createElement('img');
        Nodo.classList.add('imagen');
        Nodo.setAttribute('src', info.imagen1);
        //descripcion
        const desc = document.createElement('p');
        desc.classList.add('descripcion');
        desc.textContent = `${info.descripcion}`;
        //div
        const div = document.createElement('div');
        div.setAttribute('id','contenedor')
        div.classList.add('div');
        //se agregan los nodos hijo
        desc.appendChild(Nodo)
        div.appendChild(desc);
        DOMmain.appendChild(div);
    });
}

renderizarSpecs();

});