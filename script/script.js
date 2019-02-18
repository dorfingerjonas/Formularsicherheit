const checkNumbers = /[0-9]/g;
const checkMailUsername = /[^a-zA-Z0-9.]/g;
const checkMailDomain = /[^a-z.]/g;
const checkTelnumber = /[^0-9.\/\-+\(\)\´\[\]]/g;
const checkLetters = /[a-zA-Z]/g;
const checkSpecialChars = /[^a-zA-Z0-9]/g;

let output = "";

function checkInputs() {

  output = "";

  if (!checkEmptiness()) {
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
  }

  if (output != "") {
    // let outputhtml = document.getElementById('output').textContent;
    console.log(output);

    console.log("empty");

    outputhtml = output;
  } else {
    outputhtml = "everything correct";

    console.log("everything correct");
  }

  console.log("\n");
}

function checkEmptiness() {

  if (isFirstNameEmpty() && isLastNameEmpty() && isMailEmpty() && isRepeatMailEmpty() &&
  isPhonenumberEmpty() && isBirthdateEmpty() && isTextToShowEmpty() && isPasswordEmpty() && isRepeatPasswordEmpty() && isAGBSelected()) {
    // console.log("returned false");
    return false;
  } else {
    // console.log("returned true");
    return true;
  }
}

function isFirstNameEmpty() {
  const firstname = document.getElementById('firstname').value;

  if (firstname === "") {
    console.log("firstname");
    return false;
  } else {
    return true;
  }
}

function isLastNameEmpty() {
  const lastname = document.getElementById('lastname').value;

  if (lastname === "") {
    console.log("lastname");
    return false;
  } else {
    return true;
  }
}

function isMailEmpty() {
  const mail = document.getElementById('mailAdress').value;

  if (mail === "") {
    return false;
    console.log("mail");
  } else {
    return true;
  }
}

function isRepeatMailEmpty() {
  const rptmail = document.getElementById('repeatMailAdress').value;

  if (rptmail === "") {
    console.log("rptmail");
    return false;
  } else {
    return true;
  }
}

function isPhonenumberEmpty() {
  const phonenumber = document.getElementById('phonenumber').value;

  if (phonenumber === "") {
    console.log("phonenumber");
    return false;
  } else {
    return true;
  }
}

function isBirthdateEmpty() {
  const birthdate = document.getElementById('birthdate').value;

  if (birthdate === "") {
    console.log("birthdate");
    return false;
  } else {
    return true;
  }
}

function isTextToShowEmpty() {
  const text = document.getElementById('text').value;

  if (text === "") {
    console.log("text");
    return false;
  } else {
    return true;
  }
}

function isPasswordEmpty() {
  const password = document.getElementById('password').value;

  if (password === "") {
    console.log("password");
    return false;
  } else {
    return true;
  }
}

function isRepeatPasswordEmpty() {
  const rptPassword = document.getElementById('repeatPassword').value;

  if (rptPassword === "") {
    console.log("rptPassword");
    return false;
  } else {
    return true;
  }
}

function isAGBSelected() {
  const agb = document.getElementById('agb').checked;

  if (agb) {
    return true;
  } else {
    console.log("agb");
    return false;
  }
}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;

  if (checkNumbers.test(firstname)) {
    output += "- firstname is invalid\n";
    return false;
  } else {
    console.log("Firstname: " + firstname);
    return true;
  }
}

function checkLastName() {
  let lastname = document.getElementById('lastname').value;

  if (checkNumbers.test(lastname)) {
    output += "- lastname is invalid\n";
    return false;
  } else {
    console.log("Lastname: " + lastname);
    return true;
  }
}

function checkEmailAdress() {
  let mailAdress = document.getElementById('mailAdress').value;
  let parts = mailAdress.split('@');
  let username = parts[0];
  let domain = parts[1];

  if (checkUsername(username) && checkDomain(domain) && isEmailAdressLongEnough(mailAdress)) {
    console.log("E-Mail: " + mailAdress);
    return true;
  } else {
    output += "- email adress is invalid\n"
    return false;
  }
}

function checkUsername(username) {
  if (checkMailUsername.test(username)) {
    return false;
  } else {
    return true;
  }
}

function checkDomain(domain) {

  let parts = domain.split('.');
  let provider = parts[0];
  let topLevelDomain = parts[1];

  if (checkMailDomain.test(domain) && istTLDValid(topLevelDomain)) {
    return false;
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
    return true;
  } else {
    return false;
  }
}

function checkPhonenumber() {
  let number = document.getElementById('phonenumber').value;

  if (!(checkTelnumber.test(number))) {
    output += "- phonenumber is invalid\n"
    return false;
  } else {
    console.log("Phonenumber: " + number);
    return true;
  }
}

function checkBirthdate() {
  let dateOfBirth = document.getElementById('birthdate').value;

  if (dateOfBirth === "") {
    return false;
  } else {
    let age = getCurrentAge(dateOfBirth)
    if (age >= 14) {
      console.log("Age: " + age);
      return true;
    } else if (age <= 14 && age >= 1) {
      console.log("Sorry, too young!");
      output += "- you are too young\n"
      return false;
    } else {
      console.log("not born yet");
      output += "- not born yet\n";
      return false;
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
    if (localDate.getDate() < dateOfBirth.getDate()) {
      return true;
    }
  }

  function isDayEqualTo() {
    if (localDate.getDate() === dateOfBirth.getDate()) {
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

  return true;
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
  output += "test";
}

function getTextToShow() {
  let text = document.getElementById('text').value;
  if (text === "") {
    output += "- textToShow is invalid\n"
    return false;
  } else {
    console.log("Text: " + text);
    return true;
  }
}

function checkPassword() {
  let password = document.getElementById('password').value;
  console.log(password);

  if (isPasswordLongEnough(password)) {
    includesLetters(password);
    includesNumbers(password);
    includesSpecialChars(password);
    return true;
  } else {
    return false;
  }

}

function isPasswordLongEnough(password) {
  if (password.length >= 8) {
    return true;
  } else {
    output += "- password isn't long enough\n"
    return false;
  }
}

function includesLetters(password) {
  if (!(checkLetters.test(password))) {
    output += "- password doesn't include letters\n"
    return false;
  } else {
    console.log("Password includes letters!");
    return true;
  }
}

function includesNumbers(password) {
  if (!(checkNumbers.test(password))) {
    output += "- password doesn't include numbers\n";
    return false;
  } else {
    console.log("Password includes numbers!");
    return true;
  }
}

function includesSpecialChars(password) {
  if (!(checkSpecialChars.test(password))) {
    output += "- password doesn't include special characters\n"
    return false;
  } else {
    console.log("Password includes special chars!");
    return true;
  }
}

function comparePasswords() {
  let password = document.getElementById('password').value;
  let repeatPassword = document.getElementById('repeatPassword').value;

  if (password === repeatPassword) {
    console.log("Passwords are equal");
    return true;
  } else {
    output += "- passwords aren't equal\n"
    return false;
  }
}

function checkAGB() {
  let agb = document.getElementById('agb');

  if (agb.checked) {
    console.log("AGBs accepted!");
    return true;
  } else {
    output += "-agbs aren't selected\n";
    return false;
  }
}

function checkNewsletter() {
  let newsletter = document.getElementById('newsLetter');

  if (newsletter.checked) {
    console.log("Newsletter requested!");
    return true;
  }
}

function printError() {
  console.error("Fatal Error!");
}
