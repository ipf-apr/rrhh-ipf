const createEditSkillForm = document.querySelector("#createEditSkillForm");

const nameSkillForm = document.querySelector("#nameSkill");
const permanencyForm = document.querySelector("#permanency");
const isCreating = document.querySelector("#isCreating");
const myModal = new bootstrap.Modal(
  document.querySelector("#modalSkillCreate")
);

const createSkill = async (event) => {
  myModal.show();
};

const editSkill = async (event) => {
  const { id, nameskill } = event.target.dataset;
  console.log(event.target.dataset)
  nameSkillForm.value = nameskill;
  isCreating.value = id;
  myModal.show();
};

const deleteSkill = async (event) => {
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
          `http://localhost:8000/api/job-positions/${id}/destroy`,
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

createEditSkillForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    nameSkill: nameSkillForm.value,
  };

  let url, method;

  if (!isCreating.value) {
    url = "http://localhost:8000/api/skills";
    method = "POST";
  } else {
    url = `http://localhost:8000/api/skills/${isCreating.value}/update`;
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
  createEditSkillForm.reset();
  console.log('isCreating.value');
  console.log(isCreating.value);
  if (!isCreating.value) {
    skillsList.innerHTML += `
          <tr>
              <th scope="row">
                ${respToJson.skill.idSkill}
              </th>
              <td>
                ${respToJson.skill.nameSkill}
              </td>
              <td>
                <button onclick=editSkill(event) class="btn btn-outline-success" data-id="${respToJson.skill.id}" data-position="${respToJson.skill.nameSkill}">Editar</button>
                <button onclick=deleteSkill(event) class="btn btn-outline-danger" data-id="${respToJson.skill.id}">Eliminar</button>
              </td>
          </tr>
        `;
  } else {
    setTimeout(() => {
      window.location.reload();
    }, 2200);
  }
});
