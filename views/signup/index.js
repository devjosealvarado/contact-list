const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const formBtn = document.querySelector('#form-btn');

let emailValidation = false;
let passwordValidation = false;
let passwordMatchValidation = false;

const validation = (input, regexValidation) => {
    formBtn.disabled = !emailValidation || !passwordValidation || !passwordMatchValidation ? true : false;
    if (!regexValidation && input.value !== '') {
        input.classList.remove('border-2', 'border-green-500');
        input.classList.add('border-2', 'border-rose-500');
    } else if (regexValidation) {
        input.classList.remove('border-2', 'border-rose-500');
        input.classList.add('border-2', 'border-green-500');
    } else if (input.value === '') {
        input.classList.remove('border-2', 'border-rose-500');
        input.classList.remove('border-2', 'border-green-500');
    }
}

emailInput.addEventListener('input', e => {
    const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(emailInput, emailValidation);
});

passwordInput.addEventListener('input', e => {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    passwordMatchValidation = e.target.value === matchInput.value && e.target.value !== '';
    validation(passwordInput, passwordValidation);
    validation(matchInput, passwordMatchValidation);
});

matchInput.addEventListener('input', e => {
    passwordMatchValidation = passwordInput.value === e.target.value && e.target.value !== '';
    validation(matchInput, passwordMatchValidation);
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newUser = {
            email: emailInput.value,
            password: passwordInput.value
        }
        await axios.post('/api/users', newUser);
        window.location.pathname = '/login';
    }   catch (error) {
            console.log(error.response.data.error);
            alert('El email ya existe')
    }
    
    
});