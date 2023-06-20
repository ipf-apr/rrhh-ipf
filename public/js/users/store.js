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

    const responseJson = await response.json();
    
    if(response.status !== 201 && response.status !== 200) {
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

    formNewUser.reset();

    setTimeout(() => {
        window.location.href = '/users/'+ responseJson.user.id+'/show';
    }, 2000);

});