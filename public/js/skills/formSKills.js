const btnSaveSkill = document.getElementById('btnSaveSkill');
const listSkills = document.getElementById('listSkills');

const listSkill = async ()=>{
  try {
    const url = window.location.href;
    const parts = url.split("/");
    const id = parts[parts.length - 2];
    let skills = await fetch(`/api/employee/${id}/skills`);
    skills = await skills.json();

    if(!skills){
      return [];
    }
    skills = skills.data;
    listSkills.innerHTML = '';
    skills.forEach((skill) => {
      listSkills.innerHTML += `
        <li>${skill.nameSkill}</li>
      `;
    });

  } catch (error) {
    console.log(error);
  }
};




const skillShow = async () => {
    try {
      const response = await fetch('/api/skills');
      if (!response.ok) {
        throw new Error('No se pudo cargar la lista de habilidades');
      }
  
      const skills = await response.json();

  
      const selectSkills = document.getElementById('selectSkills');
      selectSkills.innerHTML = ''; 
  
      skills.forEach((skill, index) => {
        selectSkills.innerHTML += `
          <option value="${index + 1}">${skill.nameSkill}</option>
        `;
      });
    } catch (error) {
      console.error(error);
    }
  };

  btnSaveSkill.addEventListener('click',async(e)=>{
    e.preventDefault();
    const selectSkills = document.getElementById('selectSkills').value;
    console.log('Opcion elegida: ',selectSkills);
    const url = window.location.href;
    const parts = url.split("/");
    const id = parts[parts.length - 2];
    formData = {
        skillId:selectSkills
    }
    const response = await fetch(`/api/employee/${id}/skills/${selectSkills}/store`, {
        method:'POST',
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
      };
    
      Swal.fire({
        icon: "success",
        title: "Muy Bien!",
        text: respToJson.message,
      });
      listSkill();
      myModal.hide();
      console.log('isCreating.value');
      console.log(isCreating.value);
})

document.addEventListener('DOMContentLoaded',()=>{
    skillShow();
    listSkill();
})
