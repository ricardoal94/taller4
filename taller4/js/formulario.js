const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{10,20}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{5,25}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{5,25}$/, // Letras y espacios, pueden llevar acentos.
	direccion: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{15,20}$/, // 15 a 20 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,10}$/, // 7 a 10 numeros.
	pais: /^[a-zA-Z0-9\_\-]{3,12}$/
}

const campos = {
	usuario: false,
	nombre: false,
	apellido: false,
	direccion: false,
	password: false,
	correo: false,
	telefono: false,
	pais: false
}

const validarFormulario = (e) => {
	switch(e.target.name) {
		case "usuario":
			validarcampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarcampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarcampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "pais":
			validarcampo(expresiones.pais, e.target, "pais");
		break;
		case "password":
			validarcampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarcampo(expresiones.correo, e.target, 'correo');
		break;
		case "direccion":
			validarcampo(expresiones.direccion, e.target, 'direccion');
		break;
		case "telefono":
			validarcampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarcampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;	
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if (inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[password] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[password] = true;
	}
} 

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('keyup', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');

	if(campos.usuario && campos.nombre && campos.apellido && campos.direccion && campos.password && campos.telefono && campos.correo &&campos.pais && terminos.checked){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	}else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});