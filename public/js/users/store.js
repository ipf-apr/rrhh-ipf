const formNewUser = document.querySelector('#formNewUser');

formNewUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const lastName = document.querySelector('#lastName').value;
    const name = document.querySelector('#name').value;
    const username = document.querySelector('#username').value;
    const role = document.querySelector('#role').value;
    const password = 'password';

    const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lastName,
            name,
            username,
            password,
            role,
            
        }),
    });

    const respToJson = await response.json();
    
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
        title: 'Usuario creado Correctamente',
        text: respToJson.message,
    });

    formNewUser.reset();

    setTimeout(() => {
        window.location.href = '/users/'+ respToJson.id+'/show';
    }, 2000);

});