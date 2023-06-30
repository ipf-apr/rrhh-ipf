// Funcion para obtener los datos de la tarea cuando se carga la página
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM cargado");
  
    const userId = id.dataset.id;
  
    document.getElementById("btnEdit").href = `/users/${userId}/edit`;
  
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
        fullName,
        name,
        username,
        role,        
    } = await response.json();
  
      console.log({
        fullName,
        name,
        username,
        role,
      });
  
      const lfullName = document.querySelector("#fullName");
      const lusername = document.querySelector("#username");
      const lrole = document.querySelector("#role");
  
      lfullName.innerHTML = fullName;
      lusername.innerHTML = username;
      lrole.innerHTML = role == 'admin' ? 'Administrador' : 'Usuario Normal';
  
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  });
  