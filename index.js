let listaCompleta = document.querySelector("#listaDeTareas");
listaCompleta.addEventListener("submit", guardarTarea);

class Tarea {

    constructor(tarea, dia, categoria) {
        this.tarea = tarea;
        this.dia = dia;
        this.categoria = categoria;
    }

};

function cargarTarea() {

    let listaDeTareas = JSON.parse(localStorage.getItem('listaDeTareas'));

    if (listaDeTareas == null) {

        return [];

    }

    return listaDeTareas;

}

function guardarTarea(e) {

    e.preventDefault();

    let tarea = document.querySelector("#tarea").value;
    let dia = document.querySelector("#dia").value;
    let categoria = document.querySelector("#categoria").value;

    let listaDeTareas = cargarTarea();

    listaDeTareas.push(new Tarea(tarea, dia, categoria));

    localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas));
    mostrarLista(listaDeTareas);

    document.querySelector("#listaDeTareas").reset();


}

function agruparTareas(Tarea) {

    const lista = document.createElement("div");
    lista.setAttribute("class","mi-lista");

    const check = document.createElement("input");
    check.setAttribute("class", "check-list");
    check.type = "checkbox"
     
     lista.appendChild(check);


    const nameTarea = document.createElement("h3");
    nameTarea.setAttribute("class","titulo-tarea");
    nameTarea.textContent = `${Tarea.tarea}`;
    lista.appendChild(nameTarea);

    const diaFinal = moment(Tarea.dia).format(' dddd D  MMMM YYYY HH:mm');

    const nuevoDia = document.createElement("div");
    nuevoDia.setAttribute("class","fecha");
    nuevoDia.textContent = `Día: ${diaFinal}`;
    lista.appendChild(nuevoDia);

    let hoy = moment();
    let dia = moment(Tarea.dia);
    const diferencia = dia.diff(hoy, 'days')


    const diferenciaEnFechas = document.createElement("div");
    diferenciaEnFechas.setAttribute("class","fecha-dif");
    diferenciaEnFechas.textContent = `Días restantes: ${diferencia}`
    lista.appendChild(diferenciaEnFechas);

    const namecategoria = document.createElement("div");
    namecategoria.setAttribute("class","categoria");
    namecategoria.textContent = `Categoria: ${Tarea.categoria}`;
    lista.appendChild(namecategoria);

    const boton = document.createElement("input");
    boton.setAttribute("class","btn-eliminar");
    boton.type = "button";

    boton.id = `${Tarea.tarea}`;
    boton.value = "Borrar Tarea";

    boton.addEventListener("click", borrarTarea,);

    lista.appendChild(boton);

 

    return lista;

}

function borrarTarea(btn) {

    let listaDeTareas = cargarTarea();

    listaDeTareas.forEach((elemento, index) => {

        if (btn.target.id === elemento.tarea) {
            listaDeTareas.splice(index, 1);
            console.log(index);

        }

    });

    localStorage.setItem("listaDeTareas", JSON.stringify(listaDeTareas));
    mostrarLista(listaDeTareas);

    document.querySelector("#listaDeTareas").reset();

}

function mostrarLista(listaDeTareas) {

    let listado = document.querySelector("#listado");

    listado.textContent = "";

    listaDeTareas.forEach(elemento => {
        listado.appendChild(agruparTareas(elemento));
    });


}

function noOcultar() {
    let sinlistado = document.querySelector("#listado").style.display = 'block';
    sinlistado.textContent = "";
}

mostrarLista(cargarTarea());



