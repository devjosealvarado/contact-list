const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');

form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const credentials = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    const { data } = await axios.post('/api/login/', credentials);
    window.location.pathname = `/app/${data}`;
  } catch (error) {
    console.log(error.response.data.error);
    
    alert('El email o contraseña son invalidos')
  }
});
