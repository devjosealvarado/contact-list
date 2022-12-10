const menuMobile = document.querySelector('#menu-mobile');
const menuBar = document.querySelector('#menu-bar');
const menuIcon = document.querySelector('#menu-icon');

menuIcon.addEventListener('click', e => {
    console.log('yes');
    menuBar.classList.toggle('hidden')
    menuMobile.classList.toggle('show');
});