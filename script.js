const userName = document.getElementById("name");
const userId = document.getElementById("uid");
const userEmail = document.getElementById("email");
const userContact = document.getElementById("contact");
const submitBtn = document.getElementById("submitBtn");
const tbody = document.getElementById("tbody");

// consuming student details from local storage if exist
let studentInfo = localStorage.getItem("studentInfo")
  ? JSON.parse(localStorage.getItem("studentInfo"))
  : [];
// creating a variable to store isEdit and editId
let editData = false,
  eId;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // validation starts here
  // it will not allow any input if there is only numbers
  let test = new RegExp("[a-zA-Z]");
  //
  if (
    userName.value == "" ||
    userId.value == "" ||
    userEmail.value == "" ||
    userContact.value == ""
  ) {
    alert("All Information must be filled Out");
    return false;
  } else if (userId.value < 1) {
    alert("User Id must be greater than 0 :(");
    return false;
  } else if (!userEmail.value.includes("@")) {
    alert("Invalid Email address entered");
    return false;
  } else if (!userName.value.match(test)) {
    alert("Name must be Alphabets.");
    return false;
  } else if (editData == true) {
    alert("User Updated :)");
  } else {
    alert("Registration Completed :)");
  }
  // validation starts here

  // creating a variable to store student data.
  const userDetails = {
    userName: userName.value,
    userId: userId.value,
    userEmail: userEmail.value,
    userContact: userContact.value,
  };

  if (!editData) {
    studentInfo.push(userDetails);
  } else {
    editData = false;
    studentInfo[eId] = userDetails;
  }

  // setting student data in localStorage
  localStorage.setItem("studentInfo", JSON.stringify(studentInfo));

  getTableData();

  // after submitting the input field will become empty
  userName.value = "";
  userId.value = "";
  userEmail.value = "";
  userContact.value = "";
  submitBtn.innerHTML = "Submit";
});

// delete user functionality
function deleteUser(i) {
  if (confirm("Are you sure you want to delete the user :(")) {
    studentInfo.splice(i, 1);
    localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
    getTableData();
  }
}

// update user functionality
function updateUser(i, Name, uId, Email, Contact) {
  editData = true;
  eId = i;
  userName.value = Name;
  userId.value = uId;
  userEmail.value = Email;
  userContact.value = Contact;
  submitBtn.innerHTML = "Update";
}

// displaying students information inside a tabel
function getTableData() {
  document
    .querySelectorAll(".userInformation")
    .forEach((data) => data.remove());
  studentInfo.forEach((element, index) => {
    let createElement = `
    <tr class="userInformation">
      <td style="width:20%">${element.userName}</td>
      <td style="width:15%">${element.userId}</td>
      <td style="width:40%">${element.userEmail}</td>
      <td style="width:20%">${element.userContact}</td>
      <td style="width:5%"><a href="#main"><button class="Btn" onclick="updateUser(${index},
        '${element.userName}',
        '${element.userId}',
        '${element.userEmail}',
        '${element.userContact}')"><i class="fa-solid fa-pen-to-square editIcon"></i></button></a></td>
      <td style="width:5%"><button class="Btn" onclick="deleteUser(${index})"><i class="fa-solid fa-trash-can deleteIcon"></i></button></td>
    </tr>`;
    tbody.innerHTML += createElement;
  });
}

getTableData();
