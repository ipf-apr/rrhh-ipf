const createEditCategoryForm = document.querySelector("#createEditCategoryForm");

const nameForm = document.querySelector("#name");
const permanencyForm = document.querySelector("#permanency");
const isCreating = document.querySelector("#isCreating");
const myModal = new bootstrap.Modal(document.querySelector('#modalCategoryCreate'));

const validationErrors = document.querySelector('#validationErrors')

const createCategory = async (event) => {

    myModal.show();
  
  }
  
  const editCategory = async (event) => {
    const { id, name, permanency } = event.target.dataset;
    nameForm.value = name;
    permanencyForm.value = permanency;
    isCreating.value = id;
    myModal.show();
  
  }
  
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
  
  createEditCategoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
  
    const formData = {
      name: nameForm.value,
      permanency: permanencyForm.value
    }
  
    let url, method;
  
    if (!isCreating.value) {
      url = 'http://localhost:8000/api/categories'
      method = 'POST'
    } else {
      url = `http://localhost:8000/api/categories/${isCreating.value}/update`
      method = 'PUT'
    }
  
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    const respToJson = await response.json();
  
    console.log(respToJson);
  
    validationErrors.innerHTML ='';
    
    if(response.status === 400) {
        validationErrors.innerHTML ='<p>Ops, tenemos estos errores de validación:</p>';
        respToJson.errors.forEach(error => {
            console.log(error)
            validationErrors.innerHTML += `
            <li>
                ${error.msg}
            </li>
        `;
        })
        return;
    }
  
    Swal.fire({
      icon: 'success',
      title: 'Muy Bien!',
      text: respToJson.message,
    });
  
    myModal.hide();
    createEditCategoryForm.reset();
  
    if (!isCreating.value) {
      categoriesList.innerHTML += `
        <tr>
            <th scope="row">
              ${respToJson.category.id}
            </th>
            <td>
              ${respToJson.category.name}
            </td>
            <td>
              ${respToJson.category.permanency} años
            </td>
            <td>
              <button onclick=editCategory(event) class="btn btn-outline-success" data-name="${respToJson.category.name}" data-permanency="${respToJson.category.permanency}">Editar</button>
              <button onclick=deleteCategory(event) class="btn btn-outline-danger" data-id="${respToJson.category.id}">Eliminar</button>
            </td>
        </tr>
      `;
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 2200);
    }
  
  
  })