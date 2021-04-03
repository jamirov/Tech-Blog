

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#exampleInputUsername').value.trim();
    const password = document.querySelector('#exampleInputPassword').value.trim();
  
    if (name && password) {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
     
  
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert( await response.statusText);
      }
    }
};


document.querySelector('#signupbtn').addEventListener('submit', signupFormHandler);
