const skillsList = document.querySelector("#skillsList");
const formSearch = document.querySelector("#formSearch");
const btnCleanSearch = document.querySelector("#btnCleanSearch");

btnCleanSearch.addEventListener("click", async (e) => {
  const nameSkill = document.querySelector("#sName").value = '';
  try {
    const skills = await fetchSkills({ nameSkill });
    if (skills.length != 0) {
      skillsList.innerHTML = "";
      showSkills(skills);
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

  const nameSkill = document.querySelector("#sName").value;
  try {
    const skills = await fetchSkills({ nameSkill });
    if (skills.length != 0) {
      skillsList.innerHTML = "";
      showSkills(skills);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});


const fetchSkills = async (formData) => {

  const searchParams = {
    position: formData?.position ?? '%'
  };


  const response = await fetch("http://localhost:8000/api/skills", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (response.status === 404) {
    return [];
  }

  const data = await response.json();
  return data;
};

const showSkills = (skills) => {
    console.log(skills);
  if (skills.length === 0) {
    skillsList.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay habilidades registradas aún.</td>
        </tr>
    `;
    return;
  }

  skills.forEach((skill, index) => {
    skillsList.innerHTML += `
                <tr>
                    <th scope="row">
                      ${index + 1}
                    </th>
                    <td>
                      ${skill.nameSkill}
                    </td>
                    <td>
                      <button onclick=editSkill(event) class="btn btn-outline-success" data-id="${skill.idSkill}" data-nameSkill="${skill.nameSkill}">Editar</button>
                      <button onclick=deleteSkill(event) class="btn btn-outline-danger" data-id="${skill.idSkill}">Eliminar</button>
                    </td>
                 </tr>
            `;
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  try {
    const skills = await fetchSkills();
    showSkills(skills);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
