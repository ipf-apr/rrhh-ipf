const lcategories = document.querySelector("#categories");

const fetchEmployeeCategories = async (employeeId) => {
  const response = await fetch(
    `http://localhost:8000/api/employees/${employeeId}/categories`
  );
  // Si hubo un error al obtener los datos de un usuario
  if (!response.ok) {
    throw {
      message: "Error al obtener categorías del Empleado",
    };
  }
  // Se obtienen los datos de la respuesta (fetch)
  return await response.json();
};

const showEmployeeCategories = (categories) => {
  lcategories.innerHTML = '';
  
  if (categories.length == 0) {
      lcategories.innerHTML = '<span>No hay categorías registradas para este empleado.</span>';
      
  }

  categories.forEach((category) => {
    lcategories.innerHTML += `<li>${category.name} - fecha: ${transformDate(
      category.CategoryEmployee.datePromotion
    )}</li>`;
  });
};
