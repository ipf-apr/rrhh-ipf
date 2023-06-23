const employeesList = document.querySelector("#employeesList");
const formSearch = document.querySelector("#formSearch");
const btnCleanSearch = document.querySelector("#btnCleanSearch");

const fetchEmployees = async (formData) => {


  const response = await fetch("http://localhost:8000/api/employees?" + new URLSearchParams({
    lastName : formData?.lastName ?? '%%',
    name : formData?.name ?? '%%'
  }), {
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

btnCleanSearch.addEventListener("click", async (e)=> {
  document.querySelector("#sLastName").value = '';
  document.querySelector("#sName").value = '';

  const lastName = '%';
  const name = '%';

  try {
    const employees = await fetchEmployees({ lastName, name });
    if (employees.length != 0) {
      employeesList.innerHTML = "";
      showEmployees(employees);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }

})

formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();

  const lastName = document.querySelector("#sLastName").value;
  const name = document.querySelector("#sName").value;
 
  try {
    const employees = await fetchEmployees({ lastName, name });
    if (employees.length != 0) {
      employeesList.innerHTML = "";
      showEmployees(employees);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});

const showEmployees = (employees) => {
  if (employees.length === 0) {
    employeesList.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay empleados registrados aún.</td>
        </tr>
    `;
    return;
  }

  employees.forEach((employee) => {
    employeesList.innerHTML += `
                <tr>
                    <th scope="row">
                      ${employee.id}
                    </th>
                    <td>
                      ${employee.lastName}
                    </td>
                    <td>
                      ${employee.name}
                    </td>
                    <td>
                      ${employee.age}
                    </td>
                    <td>Categoria 1</td>
                    <td>
                      <a href="/employees/${employee.id}/edit" class="btn btn-outline-success">Editar</a>
                      <a href="/employees/${employee.id}/show" class="btn btn-outline-primary">Ver</a>
                      <button onclick=deleteEmployee(event) class="btn btn-outline-danger" data-id="${employee.id}">Eliminar</button>
                    </td>
                 </tr>
            `;
  });
};

const deleteEmployee = async (event) => {
  const id = event.target.dataset.id;

  Swal.fire({
    title: "Estás seguro?",
    text: `Estás por eliminar a un empleado del sistema!`,
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
          `http://localhost:8000/api/employees/${id}/destroy`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();

        Swal.fire({
          icon: "success",
          title: "Empleado eliminado",
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
    const employees = await fetchEmployees();
    showEmployees(employees);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
