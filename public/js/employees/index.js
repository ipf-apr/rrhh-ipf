const employeesList = document.querySelector("#employeesList");

const fetchEmployees = async () => {
  const response = await fetch("http://localhost:8000/api/employees", {
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
const showEmployees = (employees) => {
  if (employees.length === 0) {
    employeesList.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay employees registradas</td>
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
