const adminRole = document.querySelector('#admin-role')

document.addEventListener("DOMContentLoaded", async () => {

    const rol = localStorage.getItem('rol')

    console.log(rol);

    if (rol != 'admin') {
        adminRole.classList.add('visually-hidden');
    }


});