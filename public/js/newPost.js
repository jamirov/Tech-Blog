console.log("new post");
const createNewPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    // const user_id 
  
    if (title && content) {
      const response = await fetch('/newPost', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
     
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert( await response.statusText);
      }
    }
};


document.querySelector('#createtbtn').addEventListener("click", createNewPost);
