const jobPositionsList = document.querySelector("#jobPositionsList");
const formSearch = document.querySelector("#formSearch");
const btnCleanSearch = document.querySelector("#btnCleanSearch");

btnCleanSearch.addEventListener("click", async (e) => {
  const position = document.querySelector("#sName").value;

  try {
    const jobPositions = await fetchJobPositions({ position });
    if (jobPositions.length != 0) {
      jobPositionsList.innerHTML = "";
      showJobPositions(jobPositions);
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

  const position = document.querySelector("#sName").value;

  try {
    const jobPositions = await fetchJobPositions({ position });
    if (jobPositions.length != 0) {
      jobPositionsList.innerHTML = "";
      showJobPositions(jobPositions);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});


const fetchJobPositions = async (formData) => {

  const searchParams = {
    position: formData?.name ?? '%'
  };


  const response = await fetch("http://localhost:8000/api/job-positions?" + new URLSearchParams(searchParams), {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (response.status === 404) {
    return [];
  }

  const data = await response.json();
  console.log(data);
  return data;
};

const showJobPositions = (jobPositions) => {
  if (jobPositions.length === 0) {
    jobPositionsList.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay puestos laborales registradas aún.</td>
        </tr>
    `;
    return;
  }

  jobPositions.forEach((jobPosition, index) => {
    jobPositionsList.innerHTML += `
                <tr>
                    <th scope="row">
                      ${index + 1}
                    </th>
                    <td>
                      ${jobPosition.position}
                    </td>
                    <td>
                      <button onclick=editJobPosition(event) class="btn btn-outline-success" data-id="${jobPosition.id}" data-position="${jobPosition.position}">Editar</button>
                      <button onclick=deleteJobPosition(event) class="btn btn-outline-danger" data-id="${jobPosition.id}">Eliminar</button>
                    </td>
                 </tr>
            `;
  });
};


document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Cargado");

  try {
    const jobPositions = await fetchJobPositions();
    showJobPositions(jobPositions);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
});
