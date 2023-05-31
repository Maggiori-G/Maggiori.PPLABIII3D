import {updateTable} from './tabla.js'
import {SuperHeroe} from './heroe.js'


const tableSection = document.getElementById('table');
const $form = document.forms[0];
const heroes = JSON.parse(localStorage.getItem('heroes')) || [];
if(heroes.length) updateTable(tableSection, heroes);
let contador = 0;
const armas = ['Armadura', 'Espada', 'Martillo', 'Escudo', 'Arma de Fuego', 'Flechas'];
localStorage.setItem('armas', JSON.stringify(armas));
cargarSelectConArmas();
window.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.matches('td')){
        const id = e.target.parentElement.dataset.id;
        const heroeSeleccionado = heroes.find((anuncio)=>anuncio.id == id);
        loadForm($form, heroeSeleccionado);
        mostrarBotones();
        mostrarSpinner(500);
    }
    else if(e.target.matches('th')){
        contador++;
        ordenarPor(e.target.textContent, contador);
        updateTable(tableSection, heroes);
        actualizarStorage('heroes', heroes);
    }
    else if(e.target.matches('input[type="submit"]')){
        const {txtId, txtNombre, rdoEditorial, txtAlias, txtFuerza, txtArmas} = $form;
        if(txtId.value === ''){
            if(validarCampos(txtNombre.value, rdoEditorial.value, txtAlias.value, parseFloat(txtFuerza.value), txtArmas.value)){
                const nuevoAnuncio = new SuperHeroe(Date.now(), txtNombre.value, rdoEditorial.value, txtAlias.value, parseFloat(txtFuerza.value), txtArmas.value);
                crearAnuncio(nuevoAnuncio);
            }
            else{
                alert('Los campos no pueden ser vacios');
            }
        }
        else{
            if(validarCampos(txtNombre.value, rdoEditorial.value, txtAlias.value, parseFloat(txtFuerza.value), txtArmas.value)){
                const anuncioModificar = new SuperHeroe(Date.now(), txtNombre.value, rdoEditorial.value, txtAlias.value, parseFloat(txtFuerza.value), txtArmas.value);
                if(confirm('Realmente desea modificar el anuncio seleccionado?')){  
                    modificarAnuncio(anuncioModificar);
                }
                else{
                    alert('Modificación cancelada');
                }
            }
            else{
                alert('Los campos no pueden quedar vacios');
            }
        }
        mostrarSpinner(2000);
        resetForm();
        txtId.value = '';
    }
    else if(e.target.matches('input[value="Eliminar"]')){
        if(confirm('Realmente desea borrar el anuncio seleccionado?')){
            mostrarSpinner(1000);
            borrarAnuncio(parseInt($form.txtId.value));
            resetForm();
        }
        else{
            alert('Eliminación cancelada');
            resetForm();
        }
        $form.txtId.value = '';
    }
    else if(e.target.matches('input[value="Cancelar"]')){
        resetForm();
        $form.txtId.value = '';
    }
    else if(e.target.matches('input[value="Simular Heroes"]')){
        mostrarSpinner(1000);
        simularHeroes();
    }
    else if(e.target.matches('input[value="Buscar"]')){
        let titulo = prompt('Ingrese el titulo del anuncio que desea buscar...');
        if(validarStrings(titulo)){
            buscarAnuncio(titulo);
            mostrarBotones();
        }
        else{
            alert('El titulo no puede ser vacio');
        }
    }
});

function crearAnuncio(nuevoAnuncio){
    heroes.push(nuevoAnuncio);
    actualizarStorage('heroes', heroes);
    updateTable(tableSection, heroes);
}

function modificarAnuncio(anuncioModificar){
    let index = heroes.findIndex((heroes)=>heroes.id == anuncioModificar.id);
    heroes.splice(index, 1, anuncioModificar);
    actualizarStorage('heroes', heroes);
    updateTable(tableSection, heroes);
}

function borrarAnuncio(id){
    let index = heroes.findIndex((heroes)=>heroes.id == id);
    heroes.splice(index, 1);
    actualizarStorage('heroes', heroes);
    updateTable(tableSection, heroes);
}

function actualizarStorage(clave, data){
    localStorage.setItem(clave, JSON.stringify(data));
}

function loadForm($form, anuncio){
    $form.txtId.value = anuncio.id;
    $form.txtNombre.value = anuncio.nombre;
    $form.rdoEditorial.value = anuncio.editorial;
    $form.txtAlias.value = anuncio.alias;
    $form.txtFuerza.value = anuncio.fuerza;
    $form.txtArmas.value = anuncio.baños;
}

function validarCampos(nombre, editorial, alias, fuerza, arma){
    return validarStrings(nombre) && validarStrings(editorial) && validarStrings(alias) && esFlotante(fuerza) && validarStrings(arma) ? true : false;
}

function validarStrings(string){
    return string == undefined || string == '' ? false : true;
}

function esFlotante(float){
    return isNaN(float) || float == undefined ? false : true;
}

function esEntero(int){
    return isNaN(int) || int == undefined ? false : true;
}

function mostrarBotones(){
    document.getElementById('nuevo').value = 'Modificar';
    document.getElementById('cancelar').type = 'button';
    document.getElementById('eliminar').type = 'button';
}

function ocultarBotones(){
    document.getElementById('nuevo').value = 'Nuevo';
    document.getElementById('cancelar').type = 'hidden';
    document.getElementById('eliminar').type = 'hidden';
}

function resetForm(){
    $form.reset();
    ocultarBotones();
}

function simularHeroes(){
    heroes.push(new SuperHeroe(Date.now(), 'Tony Stark', 'Marvel', 'IronMan', 450, 'Arma de Fuego'));
    heroes.push(new SuperHeroe(Date.now()+1, 'Clark Kent', 'DC', 'SuperMan', 300, 'Espada'));
    updateTable(tableSection, heroes);
    actualizarStorage('heroes', heroes);
}

function mostrarSpinner(duracion){
    const spinner = document.getElementById('spinner');
    const main = document.getElementById('main');
    spinner.style.display = 'block';
    main.style.display = 'none';
    setTimeout(() =>{
        spinner.style.display = 'none';
        main.style.display = 'flex';
    }, duracion);
}

function buscarAnuncio(tituloBuscar){
    const anuncio = heroes.find((heroes)=>heroes.titulo == tituloBuscar);
    loadForm($form, anuncio);
}

function ordenarPor(criterio, contador){
    for (let i = 0; i < heroes.length -1; i++) {
        for(let j = i+1; j < heroes.length; j++){
            if((heroes[i][criterio] < heroes[j][criterio] && contador % 2 == 0) || (heroes[i][criterio] > heroes[j][criterio] && contador % 2 == 1)){
                let aux = null;
                aux = heroes[i];
                heroes[i] = heroes[j];
                heroes[j] = aux;

            }
        }
    }
}

function cargarSelectConArmas(){
    const armasCargadas = JSON.parse(localStorage.getItem('armas'));
    const select = document.getElementById('seleccionArmas');
    
    for (const key in armasCargadas) {
        let opcion = document.createElement('option');
        opcion.textContent = armasCargadas[key];
        select.appendChild(opcion);
    }
}
