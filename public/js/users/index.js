const usersList = document.querySelector("#usersList");

const fetchUsers = async () => {
  const response = await fetch("http://localhost:8000/api/users", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (response.status === 404) {
    return [];
  }

  const data = response.json();
  return data;
};

const showUsers = (users) => {
  if (users.length === 0) {
    usersList.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay usuarios registrados</td>
        </tr>
    `;
    return;
  }

  users.forEach((user, index) => {
    usersList.innerHTML += `
                <tr>
                    <th scope="row">
                      ${index + 1}
                    </th>
                    <td>
                      ${user.lastName}
                    </td>
                    <td>
                      ${user.name}
                    </td>
                    <td>
                      ${user.username}
                    </td>
                    <td>
                      ${user.role}
                    </td>
                    <td>
                      <a href="/users/${
                        user.id
                      }/edit" class="btn btn-outline-success">Editar</a>
                      <a href="/users/${
                        user.id
                      }/show" class="btn btn-outline-primary">Ver</a>
                      <button onclick=deleteUser(event) class="btn btn-outline-danger" data-id="${
                        user.id
                      }">Eliminar</button>
                    </td>
                 </tr>
            `;
  });
};

const deleteUser = async (event) => {
  const id = event.target.dataset.id;

  Swal.fire({
    title: "Estás seguro?",
    text: `Estás por eliminar a un usuario del sistema!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Estoy seguro!",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:8000/api/users/${id}/destroy`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
            method: "DELETE",
          }
        );

        const data = await res.json();

        console.log(data);

        if (data.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Acción no autorizada.",
            text: data.message,
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          text: data.message,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2200);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  try {
    const users = await fetchUsers();
    showUsers(users);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
