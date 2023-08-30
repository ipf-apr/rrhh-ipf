const categoriesList = document.querySelector("#categoriesList");
const formSearch = document.querySelector("#formSearch");
const btnCleanSearch = document.querySelector("#btnCleanSearch");

btnCleanSearch.addEventListener("click", async (e) => {
  document.querySelector("#sName").value = '';

  const name = '%';

  try {
    const categories = await fetchCategories({ name });
    if (categories.length != 0) {
      categoriesList.innerHTML = "";
      showCategories(categories);
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

  const name = document.querySelector("#sName").value;

  try {
    const categories = await fetchCategories({ name });
    if (categories.length != 0) {
      categoriesList.innerHTML = "";
      showCategories(categories);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});


const fetchCategories = async (formData) => {

  const searchParams = {
    name: formData?.name ?? ''
  };


  const response = await fetch("http://localhost:8000/api/categories?" + new URLSearchParams(searchParams), {
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

const showCategories = (categories) => {
  if (categories.length === 0) {
    categoriesList.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay categorías registradas aún.</td>
        </tr>
    `;
    return;
  }

  categories.forEach((category) => {
    categoriesList.innerHTML += `
                <tr>
                    <th scope="row">
                      ${category.id}
                    </th>
                    <td>
                      ${category.name}
                    </td>
                    <td>
                      ${category.permanency} años
                    </td>
                    <td>
                      <button onclick=editCategory(event) class="btn btn-outline-success" data-id="${category.id}" data-name="${category.name}" data-permanency="${category.permanency}">Editar</button>
                      <button onclick=deleteCategory(event) class="btn btn-outline-danger" data-id="${category.id}">Eliminar</button>
                    </td>
                 </tr>
            `;
  });
};


document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  try {
    const categories = await fetchCategories();
    showCategories(categories);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
