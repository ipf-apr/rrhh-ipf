const ljobPosition = document.querySelector("#jobPosition");

const fetchEmployeeJobPosition = async (employeeId) => {
  const response = await fetch(
    `http://localhost:8000/api/employees/${employeeId}/jobPositions`
  );

  // Si hubo un error al obtener los datos de un usuario
  if (!response.ok) {
    throw {
      message: "Error al obtener el puesto del Empleado",
    };
  }
  // Se obtienen los datos de la respuesta (fetch)
  return await response.json();
};

const showEmployeeJobPosition = (jobPositions) => {
  ljobPosition.innerHTML = "";

  if (jobPositions.length == 0) {
    ljobPosition.innerHTML =
      "<span>No hay puesto registrado para este empleado.</span>";
  }

  jobPositions.forEach((jobPosition) => {
    ljobPosition.innerHTML += `<li>${jobPosition.position}</li>`;
  });
};
