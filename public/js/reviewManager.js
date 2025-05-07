let reviewAddForm = document.getElementById('newReviewEntry');
let canAdd = true; // probably not very secure

console.log("Found me");
// Modify the objects we need


document.addEventListener("DOMContentLoaded", (event) => {
    // set edit to invisible


});
reviewAddForm.addEventListener("submit", function (e) {
    if (canAdd) {
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let inputRestaID = document.getElementById("input-review_Place");
        let inputName = document.getElementById("input-review_Name");
        let inputRating = document.getElementById("input-rating");
        let inputComments = document.getElementById("input-comments");

        // Get the values from the form fields


        // Put our data we want to send in a javascript object
        let data = {
            restaurant_Id: inputRestaID.value,
            rating: inputRating.value,
            reviewer: inputName.value,
            comments: inputComments.value
        }
        console.log(data);
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-review-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let updatedData = JSON.parse(xhttp.response);

                // Add the new data to the table
                addReviewRowToTable(updatedData);

                // Clear the input fields for another transaction
                inputRating.value = '';
                inputName.value = '';
                inputComments.value = '';
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
function deleteReviewRow(review_Id) {
    // Ask for confirmation
    const deleteConfirmation = confirm("Are you sure you want to proceed?")
    if (!deleteConfirmation) {
        return
    }
    // Turn visit ID into an object
    let data = {review_Id: review_Id};
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-review-ajax", true)
    xhttp.setRequestHeader("Content-type", "application/json")

    // Tell AJAX how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Remove row if row exists
            let row = document.querySelector(`tr[data-value="${review_Id}"]`)
            if (row) {
                row.remove()
            }
           
        } 
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error deleting the review");
        }
       
    }
     // Send the request and wait for response
     xhttp.send(JSON.stringify(data))
}
function addReviewRowToTable(data) {
    console.log(data);
    let table = document.getElementById('reviewTable');
    let finalRow = data[data.length - 1];



    let newRow = document.createElement('TR');
    newRow.setAttribute("data-value", finalRow.review_Id);
    newRow.innerHTML = `
    <td>${finalRow.reviewer}</td>
    <td>${finalRow.comments}</td>
    <td>${finalRow.rating} out of 5</td>
    <td><button onclick="deleteReviewRow({{this.review_Id}})" , class="deleteData">Delete</button></td>
        `
    // Add row to table
    table.appendChild(newRow)

}