const input_text = document.querySelector('#nombre-text');
const input_numero = document.querySelector('#numero');
const form = document.querySelector('#formulario');
const lista = document.querySelector('#lista');
const deletedBtn = document.querySelector('.btn-deleted')
const editBtn = document.querySelector('.btn-edit')
const logoutBtn = document.querySelector('#btn-logout')
let validationInput = false;

logoutBtn.addEventListener('click', async e => {
	await axios.get('/api/logout');
	window.location.pathname ='/';
})

form.addEventListener ('submit', async e => {
    e.preventDefault();
	let PHONE_REGEX = /^([0-9]){3}-[0-9]{7}$/;
	let isValid = PHONE_REGEX.test(input_numero.value);
    if (input_numero.value === '') {
		alert('Complete el campo');
			input_numero.classList = 'invalidNumber';
    } else if (isValid == true) {
        const { data } = await axios.post('/api/contactos', {text: input_text.value, telefono: input_numero.value}, {
            withCredentials: true
        });
	
		const nombre = input_text.value;
		const numero = input_numero.value;
		const contacto = document.createElement('li');
		contacto.innerHTML =`
			<li class="contacto-item" id="${data.id}">
				<p>${nombre}</p>
				<p class="number">${numero}</p>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
			</li>
		`;
		
		lista.append(contacto);
		input_text.value = '';
		input_numero.value = '';
		
		
		
		validationInput = false;
		input_numero.classList = '';

    }
})

// EVENTO PARA ELIMINAR CONTACTO

lista.addEventListener('click',async e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.id;
		e.target.parentElement.remove();
        await axios.delete(`/api/contactos/${id}`)
        
    
    }
})

// EVENTO PARA OBTENER CONTACTOS DESDE LA BASE DE DATOS (MONGO DB)

const getContactos = async () => {
    const { data } = await axios.get('/api/contactos', {text: input_text.value, telefono: input_numero.value}, {
        withCredentials: true
    });
	// console.log(data);
    data.forEach(contacto => {
        const lisItem = document.createElement('li');
        lisItem.innerHTML = `
        <li class="contacto-item" id="${contacto.id}">
            <p>${contacto.text}</p>
            <p class="number">${contacto.telefono}</p>
            <button class="btn-edit">✎</button>
			<button class="btn-deleted">✖</button>
        </li>
        `;
        lista.append(lisItem);
    })
}

// EVENTO PARA EDITAR CONTACTOS

lista.addEventListener('click', async e => {
	if (e.target.classList.contains('btn-edit')) {
		
		const id = e.target.parentElement.id;
		const lisItem = e.target.parentElement
		lisItem.innerHTML = `
        
            <input type="text" class="name-edit" value="${e.target.parentElement.children[0].innerHTML}">
			<input type="text" class="number-edit" maxlength="11" value="${e.target.parentElement.children[1].innerHTML}">
			<button class="btn-editing">✔</button>
        
        `;	
	}
	else if (e.target.classList.contains('btn-editing')) {
		const lisItem = e.target.parentElement
		const id = e.target.parentElement.id;
		const name = document.querySelector('.name-edit');
		const number = document.querySelector('.number-edit');
		let PHONE_REGEX = /^([0-9]){3}-[0-9]{7}$/;
		let isValid = PHONE_REGEX.test(number.value);
		if (isValid == true) {
			lisItem.innerHTML = `
        
            <p>${name.value}</p>
            <p class="number">${number.value}</p>
            <button class="btn-edit">✎</button>
			<button class="btn-deleted">✖</button>
        `;

        await axios.patch(`/api/contactos/${id}`, {text: name.value, telefono: number.value})
		}
	}
})

getContactos();



input_numero.addEventListener('input', e=> {
	const PHONE_REGEX = /^([0-9]){3}-[0-9]{7}$/;
	const isValid = PHONE_REGEX.test(e.target.value);
	if(isValid == true) {
		input_numero.setAttribute('class','validNumber' )
		console.log(input_numero.value.split('').length);
		} else {
		validationInput = false;
		input_numero.setAttribute('class', 'invalidNumber' )
		console.log(input_numero.value.split('').length);
	}
})

// input_numero.addEventListener ('input', e => {
//     const PHONE_REGEX = /^([0-9]){3}-[0-9]{7}$/;
//     const isValid = PHONE_REGEX.test(e.target.value);
    

//     if(isValid == true) {
//         input_numero.setAttribute('class','validNumber' )
//         validationInput = true;
//     } else {
//         validationInput = false;
//         input_numero.setAttribute('class', 'invalidNumber' )

//     }
//    })


// const memory = () => {
//     lista.innerHTML = localStorage.getItem('lista');
//     const array = [...contacto.children];
//     array.forEach(li => {
//         li.children[0].addEventListener('click', e => {
//             e.target.parentElement.remove();
//             localStorage.setItem('lista', lista.innerHTML);
//         })
//     })
// }

// ----------------- ----------------------

