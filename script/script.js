const checkNumber = /[0-9]/g;

function checkInputs() {
  checkFirstName();
  checkLastName();
  checkEmailAdress();
}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;

  let checkNumber = /[0-9]/g;

  if (checkNumber.test(firstname)) {
    printError();
  } else {
    console.log(firstname);
  }
}

function checkLastName() {
  let lastname = document.getElementById('lastname').value;

  if (checkNumber.test(lastname)) {
    printError();
  } else {
    console.log(lastname);
  }
}


function checkEmailAdress() {
  let mail = document.getElementById('emailAdress').value;
  let parts = mail.split('@');
  let username = parts[0];
  let provider = parts[1];

  checkUsername();

}

function checkUsername() {
  const checkUsername = /-/g;
  let mail = document.getElementById('emailAdress').value;
  let parts = mail.split('@');
  let username = parts[0];

  if (checkUsername.test(username) && !(checkNumber.test(username))) {
    printError();
  } else {
    console.log(username);
  }
}

function printError() {
  console.error("Fatal Error!");
}
