let arreglo = [];
let arregloPrueba = [];

/*--NUEVO: VARIABLES--*/
/*var consumoElec = 0;*/
/*var horasConsumoElec = 0;*/
var tarifa50Kwh = 4.4147;
var tarifaRestnt = 5.7447;
var consumoDiario = 0;
var consumoMes = 0;
const prim50Kwh = 50;
var desp50Kwh = 0;
var totalConsumo = 0;
//var horasConsumo = 1;

function crearCategoria() {
  $("#exampleModal").modal('show'); 
}

/*
function prueba() {
      $("#exampleModal").modal('show'); 
      document.getElementById("prueba").style.display = "block";
  
  }
*/

/*Funciones para el drag and drop*/

function allowDrop(ev){
    ev.preventDefault();
}

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
    ev.effectAllowed = "copyMove"

    var id = ev.dataTransfer.getData("text")
    //var classe = document.getElementById(id).className;
    var padre = document.getElementById(id).parentNode.id;
    //console.log(ev.target.id);

}

function drop(ev){
    ev.preventDefault();

    var id = ev.dataTransfer.getData("text");
    //console.log(id);
    if (id >= 1 ){
        

       // console.log("icono principal")

        var nodeCopy = document.getElementById(id).cloneNode(true);
        var correctionY = ev.clientY - 20 ;
        var correctionX = ev.clientX - 20 ;
        nodeCopy.setAttribute("style","position:absolute; top:" + correctionY +"px; left:" + correctionX  + "px;");
        nodeCopy.style.width ="45px";
        nodeCopy.setAttribute("id", Math.random());
        ev.target.appendChild(nodeCopy);

        /*NUEVO*/
        let modelo = document.getElementById(id + "-modelo").textContent;
        let consumo = document.getElementById(id + "-consumo").textContent;
        let horasConsumo = document.getElementById(id + "-Hora").textContent;

        
        console.log(consumo);
        console.log(horasConsumo);

        arreglo.push(consumo);
        /*-----------Obtener el tipo de electrodomestico, consumo y tiempo-----------------*/
        listElectSelecto(modelo, consumo, horasConsumo);
        //console.log(arreglo);   

    } else {

      //  console.log("icono segundario")

        var correctionY = ev.clientY - 20 ;
        var correctionX = ev.clientX - 20 ;
        document.getElementById(id).setAttribute("style","position:absolute; top:" + correctionY +"px; left:" + correctionX  + "px;");
        document.getElementById(id).style.width ="45px";
        //document.getElementById(id).className = "card-img-top"
        ev.target.appendChild(document.getElementById(id));

    }


}




/*Modal de ajustes*/

/*
  <button id="btn-modal" type="button" class="btn btn-outline-secondary">Encender todo</button>
  <button id="btn-modal" type="button" class="btn btn-outline-secondary">Apagar todo</button>
*/
function ajustes() {
  $('#modalinf').modal('show');
  document.getElementById('modal-titulo').innerHTML = 'Ajustes';
  document.getElementById('modalBody').innerHTML = '';
  document.getElementById('modalBody').innerHTML += 
  `<button id="btn-modal" type="button" class="btn btn-outline-secondary" onclick="cambiarPrecio()">Cambiar precio kwh</button>

  <button id="btn-modal" type="button" class="btn btn-outline-secondary" onclick="refrescarTodo()">Quitar todo</button>`;
}

/*Modal de informacion*/
function informacion(){
  $('#modalinf').modal('show');
  document.getElementById('modalBody').innerHTML = '';
  document.getElementById('modalBody').innerHTML += 
  `<p>Proyecto Final de Teoria de la Simulacion sección 1700 <br>Tercer Periodo 2022</p>
  <table class="table">
      <thead>
          <tr>
              <th scope="col"><center>Cuenta</center></th>
              <th scope="col">Integrante</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>20141012365</td>
              <td>Yonny Joel López Rodas</td>
          </tr>
          <tr>
              <td>20191000311</td>
              <td>German Luis Machado Mejía</td>
          </tr>
          <tr>
              <td>20191004388</td>
              <td>Raúl Enrrique Ramos Gómez</td>
          </tr>
          <tr>
              <td>20191900052</td>
              <td>Gustavo David Chavarría Rivas</td>
          </tr>
      </tbody>
  </table>`;
}

function Manual(){
    $('#modalManual').modal('show');
}

/*Modal de cambio de precio */
function cambiarPrecio(){
  $('#modalOpcAjustes').modal('show');
  document.getElementById('titulo').innerHTML = '';
  document.getElementById('titulo').innerHTML += 'Cambiar Precio kwh';
  document.getElementById('Body').innerHTML = '';
  document.getElementById('Body').innerHTML += 
  `<p>Ahora mismo, la CREE ha establecido la tarifa para usuarios residenciales en dos etapas.</p>
  <div>
      <p>Primeros 50 kWh/mes:</p>
      <input class="form-control my-2" type="text" id="primeros50kwh" value="4.4147">
      <p> HNL</p>
  </div>
  <div>
      <p>A partir de los 50 kWh/mes:</p>
      <input class="form-control my-2" type="text" id="despues50kwh" value="5.7447">
      <p> HNL</p>
  </div>
  <!--<button id="btn-modal" type="button" class="btn btn-primary" onclick="tarifa()">Guardar Cambios</button>-->`;
}

function obtenerConsumo(consumo){
    //console.log(consumo);
   // arreglo.push(consumo);
}

function seleccionarConsumo(idPrimario,consumo, modelo,idConsumo){
    //document.getElementById("noneSelect").setAttribute("id", consumo);
    ChangeColor(idConsumo+"-menuModelos");
    let horasConsumidas = document.getElementById(idConsumo+"-selectHoras").value;
    document.getElementById(idPrimario).setAttribute("draggable", "true");
    document.getElementById(idPrimario+"-card-body").innerHTML = '';
    document.getElementById(idPrimario+"-card-body").innerHTML +=
    `
    <li class="list-group-item" id="${idPrimario}-modelo">${modelo}</li>
    <li id="${idPrimario}-consumo" class="list-group-item">${consumo}</li>
    <li id="${idPrimario}-Hora" class="list-group-item" style = "display:none">${horasConsumidas}</li>
    `;    
   //console.log(x);
    //console.log(consumo);
}
/*Modal Tipos de electrodomesticos*/

/*
function modelos(){
  $('#modalinf').modal('show');
  document.getElementById('modal-titulo').innerHTML = 'Menú ......';
  document.getElementById('modalBody').innerHTML = '';
  document.getElementById('modalBody').innerHTML += 
  `<table class="table">
      <thead>
          <tr>
              <th scope="col">Tipo de electrodomestico</th>
              <th scope="col">Consumo</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>Modelo 1</td>
              <td>0.08 KWH</td>
          </tr>
          <tr>
              <td>Modelo 2</td>
              <td>0.11 KWH</td>
          </tr>
          <tr>
              <td>Modelo 3</td>
              <td>0.06 KWH</td>
          </tr>
      </tbody>
  </table>`;
} */

function ChangeColor(id){
    let elemento = document.getElementsByClassName("modelosClasse");
    for (let i = 0; i < elemento.length; i++) {
        elemento[i].style.backgroundColor = "#a9a9a9";
    }
    //console.log(elemento);
    document.getElementById(id).style.backgroundColor = '#646363';
}


function modelos(id_M){
    $('#modalModelos').modal('show');
    document.getElementById('Tipo_elec').innerHTML = '';
    document.getElementById('tiposModelos').innerHTML = '';
    electrodomesticos.forEach(function(electrodomestico){
        if(electrodomestico.id==id_M){
            document.getElementById('Tipo_elec').innerHTML += `
            <h5 class="modal-title">${electrodomestico.nombre}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModalOpc()"></button>`;
            electrodomestico.modelos.forEach(function(modelo){
                document.getElementById('tiposModelos').innerHTML += 
                `
                <div id="modelosElectrodomesticos">
                <tr class="modelosClasse" id="${modelo.m_icono}-menuModelos" onclick="seleccionarConsumo(${electrodomestico.id} , ${modelo.consumo_diario}, '${modelo.modelo}','${modelo.m_icono}');">
                    <td >${modelo.marca}</td>
                    <td >${modelo.modelo}</td>
                    <td >${modelo.consumo_diario} KWH</td>
                    <td >
                        <div class="form-group">
                            <select id="${modelo.m_icono}-selectHoras">
                                <option value="1" selected="selected">1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                                <option value="6" >6</option>
                                <option value="7" >7</option>
                                <option value="8" >8</option>
                                <option value="9" >9</option>
                                <option value="10" >10</option>
                                <option value="11" >11</option>
                                <option value="12" >12</option>
                                <option value="13" >13</option>
                                <option value="14" >14</option>
                                <option value="15" >15</option>
                                <option value="16" >16</option>
                                <option value="17" >17</option>
                                <option value="18" >18</option>
                                <option value="19" >19</option>
                                <option value="20" >20</option>
                                <option value="21" >21</option>
                                <option value="22" >22</option>
                                <option value="23" >23</option>
                                <option value="24" >24</option>
                            </select>
                        </div>
                    </td>    
                </tr> 
                </div>`;
            });
        }
    });
}

function verElectrodomesticos(){
    document.getElementById('areaElectrodomesticos').innerHTML = '';
    electrodomesticos.forEach(function(electrodo, i){
        //console.log(electrodo.id, electrodo.nombre, i);
        document.getElementById('areaElectrodomesticos').innerHTML += `
        <div class="electrodomesticos">
            <div class="col">
                <div class="card" id="" onclick="modelos(${electrodo.id})">
                    <img src="img/Electrodomesticos/${electrodo.icono}" id="${electrodo.id}" class="card-img-top" alt="..." draggable="false" ondragstart="drag(event)" >
                    <ul id="${electrodo.id}-card-body"
                    class="list-group list-group-flush"  style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" 
                    unselectable="on"
                    onselectstart="return false;" 
                    onmousedown="return false;">


                        
                </div>
            </div>
        </div>`;
    });
}

verElectrodomesticos()

/*NUEVO: Agregar electrodomestico al array de elementos seleccionados*/
function listElectSelecto(modelo, consumo, horasconsumo){
    cons = parseFloat(consumo);
    hrsCons = parseInt(horasconsumo);
    ttCons = cons*hrsCons;
    /*console.log(cons)*/
    newElectrodo = {
        'modelo': modelo,
        'consumo': cons,
        'horasConsumo': hrsCons,
        'totalConsumo': ttCons
    }

    arregloPrueba.push(newElectrodo);
    //console.log(arregloPrueba);
    ConsumoMensual();
}

function refrescarTodo(){
    window.location.reload();
}

/*NUEVO: Obtener los valores de la tarifa*/
function tarifa(){
    tarifa50Kwh = document.getElementById('primeros50kwh').value;
    tarifaRestnt = document.getElementById('despues50kwh').value;
    /*console.log(tarifa50Kwh);*/

    cerrarModalPrecios();
}



/*NUEVO: Calculo*/
function ConsumoMensual() {
    
    /*--Calculos--*/
    consumoDiario = 0;
    arregloPrueba.forEach(function(arreglo, indice){
        console.log(arreglo.totalConsumo);
        consumoDiario += arreglo.totalConsumo;
    });

    consumoMes = consumoDiario*30;

    if(consumoMes > 50){
        desp50Kwh = consumoMes - prim50Kwh;
        totalConsumo = (prim50Kwh * tarifa50Kwh) + (desp50Kwh * tarifaRestnt);
    }
    else{
        totalConsumo = (consumoMes * tarifa50Kwh)
    }

    /*--Mostrar Detalles--*/
    document.getElementById('TablaMostarDatos').innerHTML ='';
    document.getElementById("ConsumoKWH").innerHTML= consumoMes.toFixed(4)+" Kwh";
    document.getElementById("TarifaLmp").innerHTML= (totalConsumo).toFixed(2)+" Lps."

    //document.getElementById("TarifaLmp")
    //console.log('consumo diario ', consumoDiario);
    console.log('consumo mensual ', consumoMes);
    console.log('Tarifa total mes ', totalConsumo);

    /*Mostrar datos en Tabla */
    arregloPrueba.forEach(function(elect){
        document.getElementById('TablaMostarDatos').innerHTML += `
        <tr>
            <th scope="row">${elect.modelo}</th>
            <td>${elect.consumo}</td>
            <td>${elect.horasConsumo}</td>
            <td>${elect.totalConsumo}</td>
            <td>${elect.totalConsumo*30}</td>
        </tr>
        `;
    });
}

/*Cerrar Modal principal*/

function cerrarModalPrecios(){
    $('#modalOpcAjustes').modal('hide');
}

function cerrarModal(){
    $('#modalinf').modal('hide');
  }
  
  /*Cerrar Modal de cambio de precio*/
  function cerrarModalOpc(){
    $('#modalOpcAjustes').modal('hide');
  }

  function cerrarModalModelos(){
    $('#modalModelos').modal('hide');
  }