const formRegisterAdmin = document.getElementById('formRegisterAdmin');

const validationErrors = document.querySelector('#validationErrors')

formRegisterAdmin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const lastName = document.getElementById('lastName').value;
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('passwordConfirmation').value;

    const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lastName,
            name,
            username,
            password,
            passwordConfirmation,
            
        }),
    });


    if (!response.ok) {
        if (response.status === 400) {

            const { errors } = await response.json();

            showErrors(errors);

            return;
        }
        const resp = await response.json();
        return Swal.fire('Error', resp.message, 'error');
    }

    const { message, token } = await response.json();


    Swal.fire('Correcto', message, 'success');

    // Se almacena el token en el local storage
    localStorage.setItem('token', token);

    setTimeout(() => {
        window.location.href = '/';
    }, 2000);

});

const showErrors = (errors) => {

    validationErrors.innerHTML = '';
    validationErrors.innerHTML = '<div class="fw-medium" >Errores de validación</div>';

    if (errors.length != 0) {
        errors.forEach(error => {
            console.log(error);
            validationErrors.innerHTML += `<li> ${error.msg} </li>`
        });
    }


};