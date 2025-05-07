let restaAddForm = document.getElementById('newRestaurantEntry');
let canAdd = true; // probably not very secure


document.addEventListener("DOMContentLoaded", (event) => {
    // set edit to invisible


});
restaAddForm.addEventListener("submit", function (e) {
    if (canAdd) {
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let inputName = document.getElementById("input-restaurant_Name");
        let inputPhone = document.getElementById("input-phone");
        let inputIsOpen = 0;
        if (document.getElementById('yesOpen').checked == true) {
            inputIsOpen = 1;
        }
    

        // Put our data we want to send in a javascript object
        let data = {
            restaurant_Name: inputName.value,
            phone: inputPhone.value,
            is_Open: inputIsOpen,
        }
        console.log(data);
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-restaurant-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let updatedData = JSON.parse(xhttp.response);

                // Add the new data to the table
                addRestaRowToTable(updatedData);
                confirm("Restauraunt added. Please refresh.");
                // Clear the input fields for another transaction
                inputRestaID.value = '';
                inputName.value = '';
                inputPhone.value = '';
                canAdd = false;
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    }
})

// DELETE EMPLOYEE
// Function to delete a row from the visit table
function deleteRestaRow(restaurant_Id) {
    // Ask for confirmation
    const deleteConfirmation = confirm("Are you sure you want to proceed?")
    if (!deleteConfirmation) {
        return
    }
    // Turn restaurant_Id ID into an object
    let data = {restaurant_Id: restaurant_Id};
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-restaurant-ajax", true)
    xhttp.setRequestHeader("Content-type", "application/json")

    // Tell AJAX how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Remove row if row exists
            let row = document.querySelector(`tr[data-value="${restaurant_Id}"]`)
            if (row) {
                row.remove();
            }
           
        } 
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error deleting the review");
        }
       
    }
     // Send the request and wait for response
     xhttp.send(JSON.stringify(data))
}

function addRestaRowToTable(data) {
    console.log(data);
    let table = document.getElementById('restarTable');
    let finalRow = data[data.length - 1];



    let newRow = document.createElement('TR');
    newRow.setAttribute("data-value", finalRow.restaurant_Id);
    newRow.innerHTML = `
    <td>${finalRow.restaurant_Name}</td>
    <td>${finalRow.phone}</td>
    <td>${finalRow.is_Open}</td>
        `
    // Add row to table
    table.appendChild(newRow)

}