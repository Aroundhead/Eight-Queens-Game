var reinasPorColocar = 8;
var reinasColocadas = 0;

function verificarFinJuego() {
  if(reinasColocadas == 8){
    alert("Has colocado las 8 reinas, has ganado");
  }
}

function cambiarColor(colorChosen){
  var celdas = document.getElementById("tabla").getElementsByTagName("td");
  reiniciar();
  for (let i = 0; i < celdas.length; i++) {
    let fila = Math.floor(i / 8);
    let columna = i % 8;
    if ((fila + columna) % 2 !== 0) {
      celdas[i].style.backgroundColor = colorChosen; // Cambia el color
    }
  }
}

function colocarReina(celda) {
  /*alert("Le dieron click a la celda"+celda);*/

  if (window.getComputedStyle(celda).backgroundImage == "none") {
    if (reinasColocadas < 8) {
      celda.style = "background-image: url(./img/reina.png); background-size:cover;";
      var renglon = celda.parentElement.rowIndex;
      var columna = celda.cellIndex;
      /* Bloqueamos renglon */
      var tablero = document.getElementById("tabla");
      //alert(renglon + " " + columna);
      for (let i = 0; i < 8; i++) {
        if (columna != i) {
          tablero.rows[renglon].cells[i].removeAttribute("onclick");
          tablero.rows[renglon].cells[i].style.backgroundColor = "#ff0000";
        }
        if (renglon != i) {
          tablero.rows[i].cells[columna].removeAttribute("onclick");
          tablero.rows[i].cells[columna].style.backgroundColor = "#ff0000";
        }
      }
      /* Recorremos diagonales */

      var r = renglon;
      var c = columna;

      while (r >= 0 && c < 8) {
        tablero.rows[r].cells[c].style.backgroundColor = "red";
        tablero.rows[r].cells[c].removeAttribute("onclick");
        r--;
        c++;
      }

      r = renglon;
      c = columna;

      while (c >= 0 && r < 8) {
        tablero.rows[r].cells[c].style.backgroundColor = "red";
        tablero.rows[r].cells[c].removeAttribute("onclick");
        r++;
        c--;
      }

      r = renglon;
      c = columna;

      while (r >= 0 && c >= 0) {
        tablero.rows[r].cells[c].style.backgroundColor = "red";
        tablero.rows[r].cells[c].removeAttribute("onclick");
        r--;
        c--;
      }

      r = renglon;
      c = columna;

      while (r < 8 && c < 8) {
        tablero.rows[r].cells[c].removeAttribute("onclick");
        tablero.rows[r].cells[c].style.backgroundColor = "red";
        r++;
        c++;
      }

      reinasPorColocar--;
      reinasColocadas++;
    }

  } else {
    celda.style = "background-image: none";
    var renglon = celda.parentElement.rowIndex;
    var columna = celda.cellIndex;
    /* Bloqueamos renglon */
    var tablero = document.getElementById("tabla");
    //alert(renglon + " " + columna);
    for (let i = 0; i < 8; i++) {
      tablero.rows[renglon].cells[i].setAttribute("onclick", "colocarReina(this)");
      tablero.rows[renglon].cells[i].style.backgroundColor = "";
      tablero.rows[i].cells[columna].setAttribute("onclick", "colocarReina(this)");
      tablero.rows[i].cells[columna].style.backgroundColor = "";
    }
    reinasPorColocar++;
    reinasColocadas--;
  }
  document.getElementById("reinasColoca").innerHTML = "Reinas por colocar: " + reinasPorColocar;
  document.getElementById("reinasColoca1").innerHTML = "Reinas Colocadas: " + reinasColocadas;
  verificarFinJuego();

}


function solucion1(valor) {

  var celdas = document.getElementById("tabla");
  reiniciar()
  switch (valor) {
    case "1":
      celdas.rows[0].cells[3].click();
      celdas.rows[1].cells[6].click();
      celdas.rows[2].cells[2].click();
      celdas.rows[3].cells[7].click();
      celdas.rows[4].cells[1].click();
      celdas.rows[5].cells[4].click();
      celdas.rows[6].cells[0].click();
      celdas.rows[7].cells[5].click();
      break;

    case "2":
      celdas.rows[0].cells[4].click();
      celdas.rows[1].cells[1].click();
      celdas.rows[2].cells[3].click();
      celdas.rows[3].cells[6].click();
      celdas.rows[4].cells[2].click();
      celdas.rows[5].cells[7].click();
      celdas.rows[6].cells[5].click();
      celdas.rows[7].cells[0].click();break;

    case "3":
      celdas.rows[0].cells[3].click();
      celdas.rows[1].cells[1].click();
      celdas.rows[2].cells[6].click();
      celdas.rows[3].cells[2].click();
      celdas.rows[4].cells[5].click();
      celdas.rows[5].cells[7].click();
      celdas.rows[6].cells[4].click();
      celdas.rows[7].cells[0].click();
      break;

    case "4":
      celdas.rows[0].cells[3].click();
      celdas.rows[1].cells[5].click();
      celdas.rows[2].cells[7].click();
      celdas.rows[3].cells[2].click();
      celdas.rows[4].cells[0].click();
      celdas.rows[5].cells[6].click();
      celdas.rows[6].cells[4].click();
      celdas.rows[7].cells[1].click();
      break;

    case "5":
      celdas.rows[0].cells[2].click();
      celdas.rows[1].cells[5].click();
      celdas.rows[2].cells[7].click();
      celdas.rows[3].cells[0].click();
      celdas.rows[4].cells[3].click();
      celdas.rows[5].cells[6].click();
      celdas.rows[6].cells[4].click();
      celdas.rows[7].cells[1].click();
      break;

    case "6":
      celdas.rows[0].cells[4].click();
      celdas.rows[1].cells[2].click();
      celdas.rows[2].cells[7].click();
      celdas.rows[3].cells[3].click();
      celdas.rows[4].cells[6].click();
      celdas.rows[5].cells[0].click();
      celdas.rows[6].cells[5].click();
      celdas.rows[7].cells[1].click();
      break;

    default:
      alert("Esa solucion no te la ando manejando");
      break;
  }
}



function isPlaced(){
  var celdas = document.getElementById("tabla");
  var reinaPlaced = false;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if(window.getComputedStyle(celdas.rows[i].cells[j]).backgroundImage != "none"){
        reinaPlaced = true;
      }
    }
  }
  return reinaPlaced;

}
function reiniciar() {
  var celdas = document.getElementById("tabla");
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      celdas.rows[i].cells[j].style = "background-image: none";
      celdas.rows[i].cells[j].setAttribute("onclick", "colocarReina(this)");
    }
  }
  reinasPorColocar = 8;
  reinasColocadas = 0;
  document.getElementById("reinasColoca").innerHTML = "Reinas por colocar: " + reinasPorColocar;
  document.getElementById("reinasColoca1").innerHTML = "Reinas Colocadas: " + reinasColocadas;
 
  

}
function cambiarTablero(value){
  var celdas = document.getElementById("tabla");
  reiniciar();
  switch(value){
    case "1":
      celdas.rows[0].cells[3].click();
      celdas.rows[1].cells[6].click();
      celdas.rows[2].cells[2].click();
      celdas.rows[3].cells[7].click();
      celdas.rows[4].cells[1].click();
      celdas.rows[5].cells[4].click();
      celdas.rows[6].cells[0].click();
      celdas.rows[7].cells[5].click();
      break;
    case "2":
      celdas.rows[0].cells[4].click();
      celdas.rows[1].cells[1].click();
      celdas.rows[2].cells[3].click();
      celdas.rows[3].cells[6].click();
      celdas.rows[4].cells[2].click();
      celdas.rows[5].cells[7].click();
      celdas.rows[6].cells[5].click();
      celdas.rows[7].cells[0].click();
      break;
    case "3":
      celdas.rows[0].cells[3].click();
      celdas.rows[1].cells[1].click();
      celdas.rows[2].cells[6].click();
      celdas.rows[3].cells[2].click();
      celdas.rows[4].cells[5].click();
      celdas.rows[5].cells[7].click();
      celdas.rows[6].cells[4].click();
      celdas.rows[7].cells[0].click();
      break;
    default:
      alert("No tengo esa opcion");
  }
}