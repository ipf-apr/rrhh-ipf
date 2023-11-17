const formNewEmployee = document.querySelector('#formNewEmployee');
const validationErrors = document.querySelector('#validationErrors');

formNewEmployee.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const lastName = document.querySelector('#lastName').value;
    const name = document.querySelector('#name').value;
    const dni = document.querySelector('#dni').value;
    const domicilio = document.querySelector('#domicilio').value;
    const dateBirthday = document.querySelector('#fechaNac').value;
    const phone = document.querySelector('#phone').value;
    const profileNro = document.querySelector('#nroLegajo').value;
    const dateIn = document.querySelector('#ingreso').value;

    const response = await fetch('http://localhost:8000/api/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lastName,
            name,
            dni,
            domicilio,
            dateBirthday,
            phone,
            profileNro,
            dateIn
        }),
    });
    //Manejo de las imagenes de los empleados
    const formData = new FormData;
    const imageRoute = document.querySelector('#imageRoute').files[0];
    formData.append('imageRoute', imageRoute);
    const respToJson = await response.json();
    const id = respToJson.id;
    const res = await fetch(`http://localhost:8000/api/employees/${id}/image`,{
        method: 'POST',
        body: formData
    });
    const text = respToJson.message

    validationErrors.innerHTML ='';
    
    if(response.status === 400) {
        validationErrors.innerHTML ='<p>Ops, tenemos estos errores de validación:</p>';
        respToJson.errors.forEach(error => {
            console.log(error)
            validationErrors.innerHTML += `
            <li>
                ${error.msg}
            </li>
        `;
        })
        return;
    }

    if(response.status !== 201 && response.status !== 200) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Empleado creado Correctamente',
        text: respToJson.message,
    });

    formNewEmployee.reset();

    setTimeout(() => {
        window.location.href = '/employees/'+ respToJson.id+'/show';
    }, 2000);

});