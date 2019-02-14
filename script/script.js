const checkNumbers = /[0-9]/g;
const checkMailUsername = /[^a-zA-Z0-9.]/g;
const checkMailDomain = /[^a-z.]/g;
const checkTelnumber = /[^0-9.\/\-+\(\)\´\[\]]/g;
const checkLetters = /[a-zA-Z]/g;
const checkSpecialChars = /[^a-zA-Z0-9]/g;

function checkInputs() {
  checkFirstName();
  checkLastName();
  checkEmailAdress();
  compareEmails();
  checkPhonenumber();
  checkBirthdate();
  getGender();
  getTextToShow();
  checkPassword();
  comparePasswords();
  checkAGB();
  checkNewsletter();

  console.log("\n");
}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;

  if (checkNumbers.test(firstname)) {
    printError();
  } else {
    console.log("Firstname: " + firstname);
  }
}

function checkLastName() {
  let lastname = document.getElementById('lastname').value;

  if (checkNumbers.test(lastname)) {
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

  if (checkUsername(username) && checkDomain(domain) && isEmailAdressLongEnough(mailAdress)) {
      console.log("E-Mail: " + mailAdress);
  }
}

function checkUsername(username) {

  if (checkMailUsername.test(username)) {
    printError();
  } else {
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

function isEmailAdressLongEnough(mailAdress) {
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

function getGender() {
  let male = document.getElementById('male')
  let female = document.getElementById('female');
  let notDefined = document.getElementById('notDefined');

  if (isMaleChecked(male)) {
    gender = male.value;
  } else if (isFemaleChecked(female)) {
    gender = female.value;
  } else if (isNotDefinedChecked(notDefined)) {
    gender = notDefined.value;
  }

  console.log("Gender: " + gender);
}

function isMaleChecked(male) {
  if (male.checked) {
    return true;
  } else {
    return false;
  }
}

function isFemaleChecked(female) {
  if (female.checked) {
    return true;
  } else {
    return false;
  }
}

function isNotDefinedChecked(notDefined) {
  if (notDefined.checked) {
    return true;
  } else {
    return false;
  }
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
  let password = document.getElementById('password').value;

  isPasswordLongEnough(password);
  includesLetters(password);
  includesNumbers(password);
  includesSpecialChars(password);
}

function isPasswordLongEnough(password) {
  if (password.length >= 8) {
    return true;
  } else {
    return false;
  }
}

function includesLetters(password) {
  if (!(checkLetters.test(password))) {
    printError();
  } else {
    console.log("Password includes letters!");
  }
}

function includesNumbers(password) {
  if (!(checkNumbers.test(password))) {
    printError();
  } else {
    console.log("Password includes numbers!");
  }
}

function includesSpecialChars(password) {
  if (!(checkSpecialChars.test(password))) {
    printError();
  } else {
    console.log("Password includes special chars!");
  }
}

function comparePasswords() {
  let password = document.getElementById('password').value;
  let repeatPassword = document.getElementById('repeatPassword').value;

  if (password === repeatPassword && isPasswordLongEnough(password)) {
    console.log("Passwords are equal");
  } else {
    printError();
  }
}

function checkAGB() {
  let agb = document.getElementById('agb');

  if (agb.checked) {
    console.log("AGBs accepted!");
  } else {
    printError();
  }
}

function checkNewsletter() {
  let newsLetter = document.getElementById('newsLetter');

  if (newsLetter.checked) {
    console.log("Newsletter requested!");
  }
}

function printError() {
  console.error("Fatal Error!");
}
