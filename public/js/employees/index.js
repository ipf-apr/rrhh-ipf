const employeesList = document.querySelector("#employeesList");
const formSearch = document.querySelector("#formSearch");
const btnCleanSearch = document.querySelector("#btnCleanSearch");

const fetchEmployees = async (formData) => {
  

  let url = 'http://localhost:8000/api/employees';
  const searchParams = {
    lastName : formData?.lastName ?? '',
    name : formData?.name ?? '',
    promotion : formData?.promotion ?? ''
  };

  if(formData)
  {
    url = "http://localhost:8000/api/employees?" + new URLSearchParams(searchParams);
  }

   
  const response = await fetch(url, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  
  if (response.status === 404) {
    return [];
  }
  
  const data = await response.json();
  
  return data;
};

btnCleanSearch.addEventListener("click", async (e)=> {
  document.querySelector("#sLastName").value = '';
  document.querySelector("#sName").value = '';
  document.querySelector("#sPromotion").value = '';

  try {
    const employees = await fetchEmployees();
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
  const promotion = document.querySelector("#sPromotion").value;
 
  try {
    const employees = await fetchEmployees({ lastName, name, promotion });
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
            <td colspan="8" class="text-center">No hay empleados registrados aún.</td>
        </tr>
    `;
    return;
  }

  employees.forEach((employee, index) => {
    // console.log(employee);
    const dateIn = employee.Categories[0]?.CategoryEmployee.datePromotion;
    let date;
    if (dateIn) {
      date = dateIn?.split('T')[0].split('-')[2]+'/'+dateIn?.split('T')[0].split('-')[1]+'/'+dateIn?.split('T')[0].split('-')[0];      
    }
    employeesList.innerHTML += `
                <tr>
                    <th scope="row">
                      ${index+1}
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
                    <td>${employee.Categories[0]?.name ?? 'No asignado'}</td>
                    <td>${date ?? '-'}</td>
                    <td>
                      ${employee.promotion ? 'Habilitado' : ' Inhabilitado'}
                    </td>
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
