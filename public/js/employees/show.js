const formAddCategoryToEmployee = document.querySelector('#formAddCategoryToEmployee')

const lfullName = document.querySelector("#fullName");
const ldni = document.querySelector("#dni");
const lprofileNro = document.querySelector("#profileNro");
const lage = document.querySelector("#age");
const laddress = document.querySelector("#address");
const lphone = document.querySelector("#phone");
const ldateIn = document.querySelector("#dateIn");
const lantiquity = document.querySelector("#antiquity");
const lpromotion = document.querySelector("#promotion");

const ljobPosition = document.querySelector("#jobPosition");


const myModal = new bootstrap.Modal(
  document.querySelector("#modalAddCategoryToEmployee")
);



const employeeId = id.dataset.id;
// Funcion para obtener los datos de la tarea cuando se carga la página
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM cargado");


  document.getElementById("btnEdit").href = `/employees/${employeeId}/edit`;
  try {
    const employee = await fetchEmployee(employeeId);
    showEmployeeData(employee);

    //ESTE MÉTODO ESTÁ EN SU RESPECTIVO ARCHIVO.
    const categories = await fetchEmployeeCategories(employeeId);
    showEmployeeCategories(categories.data);
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Mmmh...",
      text: error.message,
    });
  }
});


const fetchEmployee = async (employeeId) => {
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
  return await response.json();
}

const showEmployeeData = (employee) => {



  lfullName.innerHTML = employee.fullName;
  ldni.innerHTML = employee.dni;
  lprofileNro.innerHTML = employee.profileNro;
  lage.innerHTML = employee.age;
  laddress.innerHTML = employee.address;
  lphone.innerHTML = employee.phone;
  ldateIn.innerHTML = transformDate(employee.dateIn);
  lantiquity.innerHTML = employee.antiquity;
  lpromotion.innerHTML = employee.promotion == 1 ? 'Habilidato' : 'Inhabilitado';

}




const transformDate = (date) => {

  if (typeof date != 'string') {
    return '';
  }

  return date.split('T')[0].split('-')[2] + '/' + date.split('T')[0].split('-')[1] + '/' + date.split('T')[0].split('-')[0]
}
