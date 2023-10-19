const createEditJobPositionForm = document.querySelector(
  "#createEditJobPositionForm"
);

const positionForm = document.querySelector("#position");
const permanencyForm = document.querySelector("#permanency");
const isCreating = document.querySelector("#isCreating");
const myModal = new bootstrap.Modal(
  document.querySelector("#modalJobPositionCreate")
);

const createJobPosition = async (event) => {
  myModal.show();
};

const editJobPosition = async (event) => {
  const { id, position } = event.target.dataset;
  positionForm.value = position;
  isCreating.value = id;
  myModal.show();
};

const deleteJobPosition = async (event) => {
  const id = event.target.dataset.id;

  Swal.fire({
    title: "Estás seguro?",
    text: `Estás por eliminar un puesto laboral del sistema!`,
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
          `http://localhost:8000/api/jobPositions/${id}/destroy`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();

        Swal.fire({
          icon: "success",
          title: "Puesto Laboral eliminado",
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

createEditJobPositionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    position: positionForm.value,
  };

  let url, method;

  if (!isCreating.value) {
    url = "http://localhost:8000/api/jobPositions";
    method = "POST";
  } else {
    url = `http://localhost:8000/api/jobPositions/${isCreating.value}/update`;
    method = "PUT";
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const respToJson = await response.json();

  console.log(respToJson);

  if (response.status !== 201 && response.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: respToJson.message,
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Muy Bien!",
    text: respToJson.message,
  });

  myModal.hide();
  createEditJobPositionForm.reset();


  if (!isCreating.value) {
    jobPositionsList.innerHTML += `
        <tr>
            <th scope="row">
              ${respToJson.jobPosition.id}
            </th>
            <td>
              ${respToJson.jobPosition.position}
            </td>
            <td>
              <button onclick=editJobPosition(event) class="btn btn-outline-success" data-position="${respToJson.jobPosition.position}">Editar</button>
              <button onclick=deleteJobPosition(event) class="btn btn-outline-danger" data-id="${respToJson.jobPosition.id}">Eliminar</button>
            </td>
        </tr>
      `;
  } else {
    setTimeout(() => {
      window.location.reload();
    }, 2200);
  }
});
