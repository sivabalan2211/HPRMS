const jsonString = '{"key": "value"}';
try {
    const parsedData = JSON.parse(jsonString);
    // Handle the parsed data here
} catch (error) {
    console.error('Error parsing JSON:', error);
}
let patientRecords = [];
let modified_patientRecords = [];

function addPatientRecord(event) {
    // Get input values
    event.preventDefault();
    var id = document.getElementById('id').value;
    var date = document.getElementById('date').value;
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var address = document.getElementById('address').value;
    var history = document.getElementById('history').value;
    var prescriptions = document.getElementById('prescriptions').value;
    var testresults = document.getElementById('testresults').value;

    // Validate input (you can add more validation as needed)

    if (!id || !date || !name || !age || !address || !history || !prescriptions || !testresults) {
        document.getElementById('status').innerHTML = 'Please fill in all fields.';
        return;
    }

    // Construct the patient object
    var patient = {
        id: id,
        date: date,
        name: name,
        age: age,
        address: address,
        history: history,
        prescriptions: prescriptions,
        testresults: testresults
    };
       patientRecords.push(patient);

       // Send the patient object to the server
       fetch('http://127.0.0.1:3000/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Reset the form and display success message
        document.getElementById('patientForm').reset();
        document.getElementById('status').innerHTML = 'Patient Record added successfully.';
    })
    .catch((error) => {
        console.error('Error:', error);
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            document.getElementById('status').innerHTML = 'Error connecting to the server.';
        } else {
            document.getElementById('status').innerHTML = 'Error adding patient record. Please try again.';
        }
    });
}
// Function to display all patients
function displayAllPatients() {
    fetch('http://localhost:3000/patients')
        .then(response => response.json())
        .then(data => {
            // Process fetched data, e.g., update the UI
            console.log('Fetched patient data:', data);

            // Example: Update the UI with the fetched data
            const patientListContainer = document.getElementById('patientList');

            // Create the table element
            const table = document.createElement('table');
            table.innerHTML = `<tr>
                                  <th>ID</th>
                                  <th>Date</th>
                                  <th>Name</th>
                                  <th>Age</th>
                                  <th>Address</th>
                                  <th>Medical History</th>
                                  <th>Prescriptions</th>
                                  <th>Test Results</th>
                                  <th>Action</th>
                              </tr>`;

            // Populate the table with patient data
            data.forEach(patient => {
                const row = table.insertRow();
                row.innerHTML = `<td>${patient.id}</td>
                                 <td>${patient.date}</td>
                                 <td>${patient.name}</td>
                                 <td>${patient.age}</td>
                                 <td>${patient.address}</td>
                                 <td>${patient.history}</td>
                                 <td>${patient.prescriptions}</td>
                                 <td>${patient.testresults}</td>`;

                // Add a modification button to each row
                // const modifyButton = document.createElement('button');
                // modifyButton.innerText = 'Modify';
                // modifyButton.addEventListener('click', () => openModifyModal(patient));
                // const actionCell = row.insertCell(); // Add a cell for the action button
                // actionCell.appendChild(modifyButton);
            });

            // Append the table to the container
            patientListContainer.innerHTML = ''; // Clear previous content
            patientListContainer.appendChild(table);
        })
        .catch(error => console.error('Error fetching patient data:', error));
}

// Example: Attach the function to a button click event
const displayButton = document.getElementById('displayButton');
displayButton.addEventListener('click', displayAllPatients);

// Function to clear the form
function clearForm(event) {
    event.preventDefault();
    // Get the form element
    var patientForm = document.getElementById('patientForm');

    // Reset the form fields
    patientForm.reset();

    // Clear the status message
    document.getElementById('status').innerHTML = '';
}

// Example: Attach the clearForm function to the "Clear Form" button click event
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearForm);

// Your existing JavaScript code

// Function to open the modification modal
function openModal(event) {
    event.preventDefault();
    var modifyModal = document.getElementById('modifyModal');
    modifyModal.style.display = 'block';
}

// Function to close the modification modal
function closeModifyModal() {
    var modifyModal = document.getElementById('modifyModal');
    modifyModal.style.display = 'none';
}
// Function to modify patient record
// Other functions and event listeners

// Example: Attach the openModal function to a button click event
const openModalButton = document.getElementById('openModalButton');
openModalButton.addEventListener('click', openModal);

// Example: Attach the closeModal function to a button click event within the modal
const closeModalButton = document.getElementById('closeModalButton');
closeModalButton.addEventListener('click', closeModal);

// Add your existing JavaScript code, including openModal, closeModal, and other functions
function openModifyModal(patient) {
    // Display patient information in the modification form/modal
    document.getElementById('modifyId').value = patient.id;
    document.getElementById('modifydate').value = patient.date;
    document.getElementById('modifyName').value = patient.name;
    document.getElementById('modifyAge').value = patient.age;
    document.getElementById('modifyAddress').value = patient.address;
    document.getElementById('modifyHistory').value = patient.history;
    document.getElementById('modifyPrescriptions').value = patient.prescriptions;
    document.getElementById('modifyTestResults').value = patient.testresults;

    // Open the modification modal
    openModal();
}
function modifyPatientRecord(event) {
    event.preventDefault();
  // Get the ID of the patient to be modified
  var idToModifyElement = document.getElementById('modifyId');
    
  // Check if the element exists before accessing its value property
  if (!idToModifyElement) {
      console.error('Element with ID "modifyId" not found.');
      return;
  }

  var idToModify = idToModifyElement.value;

  // Validate input
  if (!idToModify) {
      document.getElementById('modifyStatus').innerHTML = 'Please enter the ID of the patient to modify.';
      return;
  }

    // Get input values for modification
    // var modifiedid =document.getElementById('modifiedid').value;
    var modifieddate =document.getElementById('modifydate').value;
    var modifiedName = document.getElementById('modifyName').value;
    var modifiedAge = document.getElementById('modifyAge').value;
    var modifiedAddress = document.getElementById('modifyAddress').value;
    var modifiedHistory = document.getElementById('modifyHistory').value;
    var modifiedPrescriptions = document.getElementById('modifyPrescriptions').value;
    var modifiedTestResults = document.getElementById('modifyTestResults').value;
//   console.log(modifieddate,modifiedName,modifiedAge,modifiedAddress,modifiedHistory,modifiedPrescriptions,modifiedTestResults)
    // Create the modified patient object
    var modifiedPatient = {
        // id:modifiedid,
        date:modifieddate,
        name: modifiedName,
        age: modifiedAge,
        address: modifiedAddress,
        history: modifiedHistory,
        prescriptions: modifiedPrescriptions,
        testresults: modifiedTestResults,
    };

    modified_patientRecords.push(modifiedPatient)
    
    const index = patientRecords.findIndex(patient => patient.id === idToModify);
    if (index !== -1) {
        patientRecords[index] = Object.assign({}, patientRecords[index], modifiedPatient);
    }
    fetch(`http://localhost:3000/patients/${idToModify}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedPatient),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Success:', data.message);
            // Reset the form and display success message
            document.getElementById('modifyForm').reset();
            document.getElementById('modifyStatus').innerHTML = 'Patient Record modified successfully.';

            // Close the modification modal after modification
            closeModal();
        } else {
            console.error('Error:', data.error);
            document.getElementById('modifyStatus').innerHTML = 'Error modifying patient record. Please try again.';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('modifyStatus').innerHTML = 'Error modifying patient record. Please try again.';
    });
}


// function modifyPatientRecord(event) {
//     event.preventDefault();

//     // Get the ID of the patient to be modified
//     var idToModify = document.getElementById('modifyId').value;

//     // Validate input
//     if (!idToModify) {
//         document.getElementById('modifyStatus').innerHTML = 'Please enter the ID of the patient to modify.';
//         return;
//     }

//     // Get input values for modification
//     var modifiedName = document.getElementById('modifyName').value;
//     var modifiedAge = document.getElementById('modifyAge').value;
//     var modifiedAddress = document.getElementById('modifyAddress').value;
//     var modifiedHistory = document.getElementById('modifyHistory').value;
//     var modifiedPrescriptions = document.getElementById('modifyPrescriptions').value;
//     var modifiedTestResults = document.getElementById('modifyTestResults').value;

//     // Create the modified patient object
//     var modifiedPatient = {
//         name: modifiedName,
//         age: modifiedAge,
//         address: modifiedAddress,
//         history: modifiedHistory,
//         prescriptions: modifiedPrescriptions,
//         testresults: modifiedTestResults,
//     };

//     // Send the modified patient object to the server
//     fetch(`http://localhost:3000/patients/${idToModify}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(modifiedPatient),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         // Reset the form and display success message
//         document.getElementById('modifyForm').reset();
//         document.getElementById('modifyStatus').innerHTML = 'Patient Record modified successfully.';

//         // Close the modification modal after modification
//         closeModal();
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         document.getElementById('modifyStatus').innerHTML = 'Error modifying patient record. Please try again.';
//     });
// }

// // Your other functions and event listeners

// // Example: Attach the openModal function to a button click event
// const openModalButton = document.getElementById('openModalButton');
// openModalButton.addEventListener('click', openModal);

// // Example: Attach the closeModal function to a button click event within the modal
// const closeModalButton = document.getElementById('closeModalButton');
// closeModalButton.addEventListener('click', closeModal);
