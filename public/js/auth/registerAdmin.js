const formRegisterAdmin = document.getElementById('formRegisterAdmin');

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
            passwordConfirmation
        }),
    });


    if (!response.ok) {
        const { message } = await response.json();
        return Swal.fire('Error', message, 'error');
    }

    const { message } = await response.json();


    Swal.fire('Correcto', message, 'success');


    setTimeout(() => {
        window.location.href = '/';
    }, 2000);

});