const formAddJobPositionToEmployee = document.querySelector('#formAddJobPositionToEmployee')

const selectJobPositions = document.querySelector("#selectJobPositions");
const validationErrorsAddJobPositions = document.querySelector('#validationErrorsAddJobPositions')

const modalAddJobPosition = new bootstrap.Modal(
    document.querySelector("#modalAddJobPositionToEmployee")
  );
  

  
  const addJobPositionToEmployee = async (event) => {
  
    const jobPositions = await fetchJobPositions();

    console.log(jobPositions);
  
    jobPositions.forEach(jobPosition => {
      selectJobPositions.innerHTML += `<option value="${jobPosition.id}">${jobPosition.position}</option>`
    })
  
    modalAddJobPosition.show()
  
  }
  
  const fetchJobPositions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/jobPositions", {
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
  
  
  formAddJobPositionToEmployee.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const jobPositionId = e.target.selectJobPositions.value;
  
    // /employees/:employeeId/categories/:categoryId/store
  
    url = `http://localhost:8000/api/employees/${employeeId}/jobPositions/${jobPositionId}/store`;
    method = "POST";
  
    console.log('FETCH formAddJobPositionToEmployee');
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      }
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
  
    validationErrorsAddJobPositions.innerHTML ='';
      
      if(response.status === 400) {
          validationErrorsAddJobPositions.innerHTML ='<p>Ops, tenemos estos errores de validación:</p>';
          respToJson.errors.forEach(error => {
              console.log(error)
              validationErrorsAddJobPositions.innerHTML += `
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
    modalAddJobPosition.hide();
    formAddJobPositionToEmployee.reset();
  
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  
  });