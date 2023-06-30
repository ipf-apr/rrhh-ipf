const categoriesList = document.querySelector("#categoriesList");
const formSearch = document.querySelector("#formSearch");
const btnCleanSearch = document.querySelector("#btnCleanSearch");

const fetchCategories = async (formData) => {

  const searchParams = {
    name : formData?.name ?? ''
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

btnCleanSearch.addEventListener("click", async (e)=> {
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

  const lastName = document.querySelector("#sLastName").value;
  const name = document.querySelector("#sName").value;
 
  try {
    const categories = await fetchCategories({ lastName, name });
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
                      <a href="/categories/${category.id}/edit" class="btn btn-outline-success">Editar</a>
                      <a href="/categories/${category.id}/show" class="btn btn-outline-primary">Ver</a>
                      <button onclick=deleteCategory(event) class="btn btn-outline-danger" data-id="${category.id}">Eliminar</button>
                    </td>
                 </tr>
            `;
  });
};

const deleteCategory = async (event) => {
  const id = event.target.dataset.id;

  Swal.fire({
    title: "Estás seguro?",
    text: `Estás por eliminar una categoría del sistema!`,
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
          `http://localhost:8000/api/categories/${id}/destroy`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();

        Swal.fire({
          icon: "success",
          title: "Categoría eliminada",
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
