const formNewEmployee = document.querySelector('#formNewEmployee');

formNewEmployee.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const lastName = document.querySelector('#lastName').value;
    const name = document.querySelector('#name').value;
    const dni = document.querySelector('#dni').value;
    const domicilio = document.querySelector('#domicilio').value;
    const fechaNac = document.querySelector('#fechaNac').value;
    const phone = document.querySelector('#phone').value;
    const nroLegajo = document.querySelector('#nroLegajo').value;
    const ingreso = document.querySelector('#ingreso').value;

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
            fechaNac,
            phone,
            nroLegajo,
            ingreso
        }),
    });

    const respToJson = await response.json();

    console.log(respToJson);
    
    if(response.status !== 201 && response.status !== 200) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: respToJson.message,
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