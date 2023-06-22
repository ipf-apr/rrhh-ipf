// Funcion para obtener los datos de la tarea cuando se carga la página
const formEditEmployee = document.querySelector('#formEditEmployee');

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM cargado");

    const employeeId = formEditEmployee.dataset.id;


    try {
        const response = await fetch(
            `http://localhost:8000/api/employees/${employeeId}/show`
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
            dni,
            profileNro,
            dateBirthday,
            address,
            phone,
            dateIn,
            promotion,
        } = await response.json();

        const inputLastName = document.querySelector('#lastName');
        const inputName = document.querySelector('#name');
        const inputDni = document.querySelector('#dni');
        const inputProfileNro = document.querySelector('#nroLegajo');
        const inputAddress = document.querySelector('#domicilio');
        const inputDateBirthday = document.querySelector('#fechaNac');
        const inputPhone = document.querySelector('#phone');
        const inputdateIn = document.querySelector('#ingreso');
        const inputRadioHabilitado = document.querySelector("#habilitado");
        const inputRadioInhabilitado = document.querySelector("#inhabilitado");


        inputLastName.value = lastName;
        inputName.value = name;
        inputDni.value = dni;
        inputProfileNro.value = profileNro;
        inputAddress.value = address;
        inputDateBirthday.value = dateBirthday.split('T')[0];
        inputPhone.value = phone;
        inputdateIn.value = dateIn.split('T')[0];
        promotion == 1 ? inputRadioHabilitado.checked  = true : inputRadioInhabilitado.checked = true;

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
});




formEditEmployee.addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeId = formEditEmployee.dataset.id;

    const formData = {
        lastName: e.target.lastName.value,
        name: e.target.name.value,
        dni: e.target.dni.value,
        profileNro: e.target.nroLegajo.value,
        address: e.target.domicilio.value,
        dateBirthday: e.target.fechaNac.value,
        phone: e.target.phone.value,
        dateIn: e.target.ingreso.value,
        promotion: e.target.promotion.value
    }

    try {
        const response = await fetch(`http://localhost:8000/api/employees/${employeeId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const respToJson = await response.json();

        console.log(respToJson);

        if (response.status !== 201 && response.status !== 200) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: respToJson.message,
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Empleado se editó Correctamente',
            text: respToJson.message,
        });

        formEditEmployee.reset();

        setTimeout(() => {
            window.location.href = '/employees/' + respToJson.id + '/show';
        }, 2000);

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.message,
            timer: 2000,
        })
    }

});