let registerForm = document.getElementById('registerAcc');
let loginForm = document.getElementById('loginAcc');
let canRegister = true;

registerForm.addEventListener("submit", function (e) {
    if (canRegister == true) {
        e.preventDefault();
        canRegister = false;
        let inputUsername = document.getElementById("input-registerUser");
        let inputPasskey = document.getElementById("input-registerpassKey");
        let data = {
        username: inputUsername.value,
        passkey: inputPasskey.value
    }
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let updatedData = JSON.parse(xhttp.response);

            // Add the new data to the table
            showRegisteredAcc(updatedData);
            confirm("New account created.");
            // Clear the input fields for another transaction
            inputUsername.value = '';
            inputPasskey.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");

        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    }


    
})


loginForm.addEventListener("submit", function (e) {

        e.preventDefault();
        canRegister = false;
        let inputUsername = document.getElementById("input-loginUser");
        let inputPasskey = document.getElementById("input-loginpassKey");
        let data = {
        username: inputUsername.value,
        passkey: inputPasskey.value
    }
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let updatedData = JSON.parse(xhttp.response);

            // Add the new data to the table
            showRegisteredAcc(updatedData);
            confirm("Successfully now logged in.");
            // Clear the input fields for another transaction
            document.getElementById("LoginName").innerText = "Currently logged in as: " + inputUsername.value;

            inputUsername.value = '';
            inputPasskey.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            confirm("Bad password/account does not exist!");
            inputUsername.value = '';
            inputPasskey.value = '';
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    


    
})
function showRegisteredAcc(data){


}