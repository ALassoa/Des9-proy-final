const calend = document.getElementById("calendario");

var cont = 0;

function muestraCalendario() {
    calend.style.display = "block";
}

function cerrarCalendario() {
    calend.style.display = "none";
}

function pasarPago(){
    window.open("/pasarela", "/pasarela", "width=400,height=400");
    cerrarCalendario();
}