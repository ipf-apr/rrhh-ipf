
const formAddCategoryToEmployee = document.querySelector('#formAddCategoryToEmployee')

const selectCategories = document.querySelector("#selectCategories");
const validationErrorsAddCategories = document.querySelector('#validationErrorsAddCategories')

const myModal = new bootstrap.Modal(
  document.querySelector("#modalAddCategoryToEmployee")
);



  
  const addCategoryToEmployee = async (event) => {
  
    const categories = await fetchCategories();
  
    categories.forEach(category => {
      selectCategories.innerHTML += `<option value="${category.id}">${category.name}</option>`
    })
  
    myModal.show()
  
  }
  
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/categories", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
      );
  
      if (response.status === 404) {
        return [];
      }
  
      const data = response.json();
  
      return data;
  
    } catch (error) {
      console.log(error)
    }
  }
  
  
  formAddCategoryToEmployee.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const selectedCategoryId = e.target.selectCategories.value;
    const datePromotion = e.target.datePromotion.value;
  
    // /employees/:employeeId/categories/:categoryId/store
  
    url = `http://localhost:8000/api/employees/${employeeId}/categories/${selectedCategoryId}/store`;
    method = "POST";
  
    console.log('FETCH');
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ datePromotion }),
    });
  
    const respToJson = await response.json();
  
    console.log(respToJson);
  
    if (response.status === 500 ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: respToJson.message,
      });
      return;
    }
  
    validationErrorsAddCategories.innerHTML ='';
      
      if(response.status === 400) {
          validationErrorsAddCategories.innerHTML ='<p>Ops, tenemos estos errores de validación:</p>';
          respToJson.errors.forEach(error => {
              console.log(error)
              validationErrorsAddCategories.innerHTML += `
              <li>
                  ${error.msg}
              </li>
          `;
          })
          return;
      }
  
    Swal.fire({
      icon: "success",
      title: "Muy Bien!",
      text: respToJson.message,
    });
    myModal.hide();
    formAddCategoryToEmployee.reset();
  
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  
  });