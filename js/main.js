// Get college name from URL
const params = new URLSearchParams(window.location.search); // creates a URLSearchParams object that reads everything after the ? in the URL.
const collegeName = params.get("collegeName");

if (collegeName) {
  const collegeText = document.getElementById("collegeDisplay")
  collegeText.innerHTML = `<i class="bi bi-building"></i> ${collegeName}`;
  if(collegeName==="Alpha") {
    collegeText.classList.add("text-bg-danger");
  }
  else if(collegeName==="Beta") {
    collegeText.classList.add("text-bg-info");
  }
  else if(collegeName==="Gamma") {
    collegeText.classList.add("text-bg-success");
  }
  else if(collegeName==="Nr") {
    collegeText.innerHTML = `<i class="bi bi-building"></i> Non-Resident`;
    collegeText.classList.add("text-bg-warning");
  }
}

function submitForm(event) {
  event.preventDefault(); // prevent normal form submission
  
  const form = document.getElementById('myform'); // get the form element

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Update phone number to +60...
  const phoneInput = document.getElementById("inputPhoneNum");
  phoneInput.value = "+60" + phoneInput.value;

  // Show the loading animation
  document.getElementById("loadingOverlay").style.display = "flex";

  const data = new FormData(form); // make object of FormData which collect all input from form    

  // Add collegeName manually to form data because currently formdata only have inputs at myform
  if (collegeName) {    
    data.append("collegeName", collegeName);      
  }

  const action = form.action;

  // Sends the form data to google apps script
  // action = apps script, method = post because we give data to them, body = what content we will send which is the formdata
  fetch(action, {
    method: 'POST',
    body: data,
  })

  .then(() => {
    // Hide the loading animation
    document.getElementById("loadingOverlay").style.display = "none";

    // Show success alert
    swal("Success!", "Your form was submitted successfully!", "success");
    form.reset();
  })
  .catch((error) => {
    document.getElementById("loadingOverlay").style.display = "none";
    swal("Oops!", "Something went wrong: " + error.message, "error");
  });
}
  