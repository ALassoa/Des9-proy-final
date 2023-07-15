const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnHamb = document.querySelector('.hamburguesa');
const btnRespon = document.querySelector('.responsive');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnHamb.addEventListener('click', function () {
    btnHamb.classList.toggle('isActive');
    btnRespon.classList.toggle('isActive');
});