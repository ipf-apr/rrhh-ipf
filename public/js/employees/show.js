// Funcion para obtener los datos de la tarea cuando se carga la página
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado");

  const employeeId = id.dataset.id;

  document.getElementById("btnEdit").href = `/employees/${employeeId}/edit`;

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
      fullName,
      dni,
      profileNro,
      age,
      address,
      phone,
      dateIn,
      antiquity,
      promotion,
    } = await response.json();

    console.log({
      fullName,
      dni,
      profileNro,
      age,
      address,
      phone,
      dateIn,
      antiquity,
      promotion,
    });

    const lfullName = document.querySelector("#fullName");
    const ldni = document.querySelector("#dni");
    const lprofileNro = document.querySelector("#profileNro");
    const lage = document.querySelector("#age");
    const laddress = document.querySelector("#address");
    const lphone = document.querySelector("#phone");
    const ldateIn = document.querySelector("#dateIn");
    const lantiquity = document.querySelector("#antiquity");
    const lpromotion = document.querySelector("#promotion");

    lfullName.innerHTML = fullName;
    ldni.innerHTML = dni;
    lprofileNro.innerHTML = profileNro;
    lage.innerHTML = age;
    laddress.innerHTML = address;
    lphone.innerHTML = phone;
    ldateIn.innerHTML = dateIn.split('T')[0].split('-')[2]+'/'+dateIn.split('T')[0].split('-')[1]+'/'+dateIn.split('T')[0].split('-')[0];
    lantiquity.innerHTML = antiquity;
    lpromotion.innerHTML = promotion == 1 ? 'Habilidato' : 'Inhabilitado';

  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
