const checkNumber = /[0-9]/g;

function checkInputs() {
  checkFirstName();
  checkLastName();
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
  let lastname = document.getElementById('lastname').value;

  if (checkNumber.test(lastname)) {
    printError();
  } else {
    console.log(lastname);
  }
}

function printError() {
  console.error("Fatall Error!");
}
