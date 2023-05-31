const heroes = JSON.parse(localStorage.getItem('heroes'));
mostrarHeroes(document.getElementById('cardHeroes'), heroes);



function mostrarHeroes(contenedor, listaHeroes){
    if(!contenedor) return null;
    listaHeroes.forEach((e)=>{
        crearHeroe(contenedor, e);
    });
}

function crearHeroe(contenedor, heroe){
    if(heroe==null) return null;
    const fieldset = document.createElement('fieldset');
    for (const key in heroe) {
        if(key == 'nombre'){
            fieldset.appendChild(crearTitulo(heroe[key]));
        }
        else if(key == 'alias' || key == 'editorial' ){
            fieldset.appendChild(crearParrafo(heroe[key]));
        }
        else if(key == 'fuerza'){
            fieldset.appendChild(crearSpan(heroe[key]));
        }
        else if(key == 'arma'){
            fieldset.appendChild(crearDivConImagenYTexto(heroe[key], './Imagenes/icono_'+key+'.jpeg'));
        }
    }
    contenedor.appendChild(fieldset);
}

function crearTitulo(contenido){
    const titulo = document.createElement('h2');
    titulo.textContent = contenido;
    return titulo;
}

function crearParrafo(contenido){
    const item = document.createElement('p');
    item.textContent = contenido;
    return item;
}

function crearDivConImagenYTexto(contenido, path){
    const div = document.createElement('div');
    const span = document.createElement('span');
    const img = document.createElement('img');
    img.setAttribute('src', path);
    span.textContent = contenido;
    div.appendChild(img);
    div.appendChild(span);
    return div;
}

function crearSpan(contenido){
    const span = document.createElement('span');
    span.textContent = contenido;
    return span;
}