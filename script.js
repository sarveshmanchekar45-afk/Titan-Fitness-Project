document.addEventListener('DOMContentLoaded', () => {
  const errorMessage = document.getElementById('errorMessage');
  const params = new URLSearchParams(window.location.search);

  if (params.has('error')) {
    errorMessage.textContent = decodeURIComponent(params.get('error')).replace(/\+/g, ' ');
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      const password = document.getElementById('password').value;
      if (password.length < 6) {
        event.preventDefault();
        errorMessage.textContent = 'Password must be at least 6 characters.';
      }
    });
  }
});
