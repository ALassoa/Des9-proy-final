// INICIO VALIDAMOS UNA SESION ACTIVA
var sessionID = sessionStorage.getItem('sessionID');
var expTime = sessionStorage.getItem('expTime');

const patron = /^login.*/;

if ((sessionID ?? 0) === 0) { // Sin Session
    if (!patron.test(filename())) {
        location.href = '/login?logout=0';
    }
} else { //con sesion
    if ((diff_minutes(expTime, Date.now()) < 15)){ // sesion valida de 15 min
        if (!patron.test(filename())){ // dentro
            sessionStorage.setItem('expTime', Date.now()); //refrescar sesion activa
        } else { //fuera en login
            location.href = '/login?session=expired';
            sessionStorage.clear();
        }    
    } else if (!patron.test(filename())) {
        sessionStorage.clear();
        location.href = '/login?session=expired';
    }
}

function diff_minutes(dt2, dt1) {
    var diff = (dt2 - dt1) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

function filename() {
    var rutaAbsoluta = self.location.href;
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
    return rutaRelativa;
}
// FIN VALIDAMOS UNA SESION ACTIVA

// INICIO CREAMOS SESION ACTIVA (Ver con supabase en caso de requerirse)
function generateSession() {
    sessionStorage.setItem('sessionID', Math.floor(Math.random() * 100000000));
    sessionStorage.setItem('email', document.getElementById('correoLogin').value);
    sessionStorage.setItem('expTime', Date.now());
}
// FIN CREAMOS SESION ACTIVA

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnHamb = document.querySelector('.hamburguesa');
const btnRespon = document.querySelector('.responsive');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnHamb.addEventListener('click', function () {
    btnHamb.classList.toggle('isActive');
    btnRespon.classList.toggle('isActive');
});