const nameCriterion = /[0-9]/g;
const usernnameCriterion = /[^a-zA-Z0-9.]/g;
const domainCriterion = /[^a-z.]/g;
const phoneCriterion = /[^0-9.\/\-+\(\)\´\[\]]/g
const passwordCriterion =

function submit() {
  checkFirstName();
  checkLastName();
  checkEmailAdress();
  compareEmails();
  checkPhonenumber();
  checkBirthdate();
  getTextToShow();
  checkPassword();

  console.log("\n");
}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;

  if (nameCriterion.test(firstname)) {
    printError();
  } else {
    console.log("Firstname: " + firstname);
  }
}

function checkLastName() {
  let lastname = document.getElementById('lastname').value;

  if (nameCriterion.test(lastname)) {
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

  if (usernnameCriterion.test(username)) {
    printError();
  } else {
    return true;
  }
}

function checkDomain(domain) {

  let parts = domain.split('.');
  let provider = parts[0];
  let topLevelDomain = parts[1];

  if (domainCriterion.test(domain) && istTLDValid(topLevelDomain)) {
    printError();
  } else {
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

  if (!(phoneCriterion.test(number))) {
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

function getGender() {

}

function getTextToShow() {
  let text = document.getElementById('text').value;
  if (text === "") {
    printError();
  } else {
    console.log("Text: " + text);
  }
}

function checkPassword() {

}

function printError() {
  console.error("Fatal Error!");
}
