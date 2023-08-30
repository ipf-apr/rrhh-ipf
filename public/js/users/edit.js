// Funcion para obtener los datos de la tarea cuando se carga la página
const formEditUser = document.querySelector('#formEditUser');

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM cargado");

    const userId = formEditUser.dataset.id;


    try {
        const response = await fetch(
            `http://localhost:8000/api/users/${userId}/show`
        );

        // Si hubo un error al obtener los datos de un usuario
        if (!response.ok) {
            throw {
                message: "Error al obtener datos del Empleado",
            };
        }

        // Se obtienen los datos de la respuesta (fetch)

        const {
            lastName,
            name,
            username,
            role,
            
        } = await response.json();

        const inputLastName = document.querySelector('#lastName');
        const inputName = document.querySelector('#name');
        const inputUsername = document.querySelector('#username');
        const inputRole = document.querySelector('#role');


        inputLastName.value = lastName;
        inputName.value = name;
        inputUsername.value = username;
        inputRole.value = role;

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
});




formEditUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = formEditUser.dataset.id;

    const formData = {
        lastName: e.target.lastName.value,
        name: e.target.name.value,
        username: e.target.username.value,
        role: e.target.role.value,
    }

    try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const responseJson = await response.json();

        console.log(responseJson);

        if (response.status !== 201 && response.status !== 200) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: responseJson.message,
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Muy bien!',
            text: responseJson.message,
        });

        formEditUser.reset();


        setTimeout(() => {
            window.location.href = '/users/' + responseJson.user.id + '/show';
        }, 2000);

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.message,
            timer: 2000,
        })
    }

});