const checkName = /[0-9]/g;
const checkMailUsername = /[^a-zA-Z0-9.]/g;
const checkMailDomain = /[^a-z.]/g;
const checkTelnumber = /[^0-9.\/\-+\(\)\´\[\]]/g

function checkInputs() {
  checkFirstName();
  checkLastName();
  checkEmailAdress();
  compareEmails();
  checkPhonenumber();
  checkBirthdate();

  console.log("\n");
}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;

  if (checkName.test(firstname)) {
    printError();
  } else {
    console.log("Fisrtname: " + firstname);
  }
}

function checkLastName() {
  let lastname = document.getElementById('lastname').value;

  if (checkName.test(lastname)) {
    printError();
  } else {
    console.log("Lastname: " + lastname);
  }
}

function checkEmailAdress() {
  let mailAdress = document.getElementById('mailAdress').value;
  let parts = mailAdress.split('@');
  let username = parts[0];
  let domain = parts[1];

  if (checkUsername(username) && checkDomain(domain) && isLongEnough(mailAdress)) {
      console.log("E-Mail: " + mailAdress);
  }
}

function checkUsername(username) {

  if (checkMailUsername.test(username)) {
    printError();
  } else {
    console.log("Username: " + username);
    return true;
  }
}

function checkDomain(domain) {

  let parts = domain.split('.');
  let provider = parts[0];
  let topLevelDomain = parts[1];

  if (checkMailDomain.test(domain) && istTLDValid(topLevelDomain)) {
    printError();
  } else {
    console.log("Domain: " + domain);
    return true;
  }
}

function istTLDValid(topLevelDomain) {

  if (topLevelDomain.length <= 3 && topLevelDomain.length >= 2) {
    return true;
  } else {
    return false;
  }
}

function isLongEnough(mailAdress) {
  if (mailAdress.length >= 7) {
    return true;
  } else {
    return false;
  }
}

function compareEmails() {
  let mailAdress = document.getElementById('mailAdress').value;
  let repeatMailAdress = document.getElementById('repeatMailAdress').value;

  if (mailAdress === repeatMailAdress) {
    console.log("E-Mail Adresses are equal");
  } else {
    printError();
  }
}

function checkPhonenumber() {
  let number = document.getElementById('phonenumber').value;

  if (!(checkTelnumber.test(number))) {
    printError();
  } else {
    console.log("Phonenumber: " + number);
  }
}

function checkBirthdate() {
let dateOfBirth = document.getElementById('birthdate').value;

  if (dateOfBirth === "") {
    printError();
  } else {
    let age = getCurrentAge(dateOfBirth)
    if (age >= 14) {
      console.log("Age: " + age);
    } else {
      console.log("Sorry, too young!");
    }
  }
}

function getCurrentAge(dateOfBirth) {
  const localDate = new Date();

  let date = dateOfBirth.split('-');

  dateOfBirth = new Date(parseInt(date[0]), parseInt(date[2] - 1), parseInt(date[2]));

  let currentAge = localDate.getFullYear() - dateOfBirth.getFullYear();

  if (isMonthLowerThan() || isMonthEqualTo() && isDayLowerThan() || isDayEqualTo()) {
    return currentAge - 1;
  }

  function isMonthLowerThan() {
    if (localDate.getMonth() < dateOfBirth.getMonth()) {
      return true;
    }
  }

  function isMonthEqualTo() {
    if (localDate.getMonth() === dateOfBirth.getMonth()) {
      return true;
    }
  }

  function isDayLowerThan() {
    if (localDate.getDay < dateOfBirth.getDay) {
      return true;
    }
  }

  function isDayEqualTo() {
    if (localDate.getDay === dateOfBirth.getDay) {
      return true;
    }
  }

}

function printError() {
  console.error("Fatal Error!");
}
