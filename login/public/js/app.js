let departamentOption = document.getElementById('selecDepartamento');

departamentOption.addEventListener('change',()=>{
    let valorSelect = document.getElementById('selecDepartamento').value;
    let selecLocal = document.getElementById('selecLocalidad')
    let opcionFormosa = `
    <option value="1">Formosa</option>
    <option value="2">Colonia Pastoril</option>
    <option value="3">Gran Guardia</option>
    <option value="4">San Hilario</option>
    <option value="5">Mariano Boedo</option>
    <option value="6">Villa del Carmen</option>`
    

    let opcionPilcomayo = `
    <option selected disabled>Pilcomayo</option>
    <option value="7">Clorinda</option>
    <option value="8">Laguna Naick Neck</option>
    <option value="9">Riacho He He</option>
    <option value="10">Monte Lindo Chico</option>`

    let opcionPilagas = `
    <option selected disabled>Pilagás</option>
    <option value="15">Misión Tacaagle</option>
    <option value="16">Laguna Gallo</option>
    <option value="17">Tres Lagunas</option>
    <option value="18">El Espinillo</option>`

    let opcionLaishi = `
    <option selected disabled>Laishí</option>
    <option value="11">San F. Laishi</option>
    <option value="12">Gral. Mansilla</option>
    <option value="13">Herradura</option>
    <option value="14">Yatai</option>`
    
    let opcionPirane = `
    <option selected disabled>Pirané</option>
    <option value="19">Pirané</option>
    <option value="20">El Colorado</option>
    <option value="21">Villa Dos Trece</option>
    <option value="22">Mayor Villafañe</option>
    <option value="23">Palo Santo</option>`

    let opcionPatino = `
    <option selected disabled>Patiño</option>
    <option value="24">Las Lomitas</option>
    <option value="25">Comandante Fontana</option>
    <option value="26">Villa Gral Guemes</option>
    <option value="27">Estanislao Del Campo</option>
    <option value="28">Pozo Del Tigre</option>
    <option value="29">Gral Belgrano</option>
    <option value="30">San Martin I</option>
    <option value="31">San Martin II</option>
    <option value="32">Fortin Lugones</option>
    <option value="33">Subteniente Perin</option>
    <option value="34">Posta Cambio Zalazar</option>
    <option value="35">Colonia Sarmiento</option>
    <option value="36">Juan G. Bazan</option>
    <option value="37">Bartolomé De Las Casas</option>
    <option value="38">El Recreo</option>
    <option value="39">Juan G. Bazan</option>
    <option value="40">Fortin Sargento 1ro Leyes</option>`

    let opcionBermejo = `
    <option selected disabled>Bermejo</option>
    <option value="41">Fortin Soledad</option>
    <option value="42">Guadalcazar</option>
    <option value="43">Lamadrid</option>
    <option value="44">La Rinconada</option>
    <option value="45">Los Chiriguanos</option>
    <option value="46">Pozo de Maza</option>
    <option value="47">Pozo del Mortero</option>
    <option value="48">Vaca Perdida</option>`
    
    let opcionRamonLista = `
    <option selected disabled>Ramon Lista</option>
    <option value="49">Gral Mosconi</option>
    <option value="50">El Potrillo</option>`

    let opcionMatacos = `
    <option selected disabled>Matacos</option>
    <option value="51">Ing. Juarez</option>`

    if(valorSelect == 1){
       selecLocal.innerHTML = "";
       selecLocal.insertAdjacentHTML("beforeend",opcionFormosa); 
    }
    else if(valorSelect == 2){
        selecLocal.innerHTML = "";
        selecLocal.insertAdjacentHTML("beforeend",opcionPilcomayo); 
    }
    else if(valorSelect == 3){
        selecLocal.innerHTML = "";
        selecLocal.insertAdjacentHTML("beforeend",opcionPilagas);
    }
    else if(valorSelect == 4){
        selecLocal.innerHTML = "";
        selecLocal.insertAdjacentHTML("beforeend",opcionLaishi);
    }
    else if(valorSelect == 5){
        selecLocal.innerHTML = "";
        selecLocal.insertAdjacentHTML('beforeend',opcionPirane);
    }
    else if(valorSelect == 6){
        selecLocal.innerHTML = "";
        selecLocal.insertAdjacentHTML('beforeend',opcionPatino);
    }
    else if(valorSelect == 7){
        selecLocal.innerHTML = "";
        selecLocal.insertAdjacentHTML('beforeend',opcionBermejo);
    }
    else if(valorSelect == 8){
        selecLocal.innerHTML = "";
        selecLocal.insertAdjacentHTML('beforeend',opcionRamonLista);
    }
    else if(valorSelect == 9){
        selecLocal.innerHTML = "";
        selecLocal.insertAdjacentHTML('beforeend',opcionMatacos);
    }
    else{
        alert("Error: Por favor, elija un Departamento de la lista!")
    }
})