const loginFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const name = document.querySelector("#exampleInputUsername").value.trim();
    const password = document.querySelector("#exampleInputPassword").value.trim();

    if (name && password) {
        // Send a POST request to the API endpoint
        const response = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace("/profile");
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector("#loginbtn").addEventListener("click", loginFormHandler);
