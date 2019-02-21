const checkNumbers = /[0-9]/g;
const checkMailUsername = /[^a-zA-Z0-9.]/g;
const checkMailDomain = /[^a-z.]/g;
const checkTelnumber = /[^0-9.\/\-+\(\)\´\[\]]/g;
const checkLetters = /[a-zA-Z]/g;
const checkSpecialChars = /[^a-zA-Z0-9]/g;

let output;
let currPosition = 0;
let state = true;
let rptState = true;

function checkInputs() {

  output = "";

  if (!checkEmptiness() && currPosition === 7) {
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

    if (output != "") {
      console.log(output);
      document.getElementById('output').textContent = output;
    } else {
      console.log(output);
      document.getElementById('output').textContent = output;
    }
  }
  console.log("\n");
}

function checkEmptiness() {
  if (isFirstNameEmpty() && isLastNameEmpty() && isMailEmpty() && isRepeatMailEmpty() &&
    isPhonenumberEmpty() && isBirthdateEmpty() && isTextToShowEmpty() && isPasswordEmpty() && isRepeatPasswordEmpty() && isAGBSelected()) {
    return false;
  } else {
    console.log(output);
    document.getElementById('output').textContent = output;
    return true;
  }
}

function isFirstNameEmpty() {
  const firstname = document.getElementById('firstname').value;

  if (firstname === "") {
    output += "- firstname is empty\n";
    return false;
  } else {
    return true;
  }
}

function isLastNameEmpty() {
  const lastname = document.getElementById('lastname').value;

  if (lastname === "") {
    output += "- lastname is empty\n";
    return false;
  } else {
    return true;
  }
}

function isMailEmpty() {
  const mail = document.getElementById('mailAdress').value;

  if (mail === "") {
    output += "- mail is empty\n";
    return false;
  } else {
    return true;
  }
}

function isRepeatMailEmpty() {
  const rptmail = document.getElementById('repeatMailAdress').value;

  if (rptmail === "") {
    output += "- repeat email is empty\n";
    return false;
  } else {
    return true;
  }
}

function isPhonenumberEmpty() {
  const phonenumber = document.getElementById('phonenumber').value;

  if (phonenumber === "") {
    output += "- phonenumber is empty\n";
    return false;
  } else {
    return true;
  }
}

function isBirthdateEmpty() {
  const birthdate = document.getElementById('birthdate').value;

  if (birthdate === "") {
    output += "- birthdate is not selected\n";
    return false;
  } else {
    return true;
  }
}

function isTextToShowEmpty() {
  const text = document.getElementById('text').value;

  if (text === "") {
    output += "- text field is empty\n";
    return false;
  } else {
    return true;
  }
}

function isPasswordEmpty() {
  const password = document.getElementById('password').value;

  if (password === "") {
    output += "- password is empty\n";
    return false;
  } else {
    return true;
  }
}

function isRepeatPasswordEmpty() {
  const rptPassword = document.getElementById('repeatPassword').value;

  if (rptPassword === "") {
    output += "- repeat password is empty\n";
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
    output += "Terms of Service are not accepted\n";
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

  console.log("Phonenumber length: " + number.length);

  if (!(checkTelnumber.test(number)) &&isPhonenumberLongEnough(number)) {
    output += "- phonenumber is invalid\n";
    console.log("number too short");
    return false;
  } else {
    console.log("Phonenumber: " + number);
    return true;
  }
}

function isPhonenumberLongEnough(number) {
  if (number.length < 12) {
    return true;
  } else {
    return false;
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

  if (isPasswordLongEnough(password) && includesLetters(password) && includesNumbers(password) && includesSpecialChars(password)) {
    console.log("Password: " + password);
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

function viewPassword() {
  let password = document.getElementById('password');
  let stateTrue = document.getElementById('stateTrue');
  let stateFalse = document.getElementById('stateFalse');

  if (state) {
    password.type = "text";
    state = false;
    stateTrue.style.display = "none";
    stateFalse.style.display = "inline-block";
  } else if (!state) {
    password.type = "password";
    state = true;
    stateTrue.style.display = "inline-block";
    stateFalse.style.display = "none";
  }
  console.log("type changed!");
}

function viewRepeatPassword() {
  let rptPassword = document.getElementById('repeatPassword');
  let rptStateTrue = document.getElementById('rptStateTrue');
  let rptStateFalse = document.getElementById('rptStateFalse');

  if (rptState) {
    rptPassword.type = "text";
    rptState = false;
    rptStateTrue.style.display = "none";
    rptStateFalse.style.display = "inline-block";
  } else if (!rptState) {
    rptPassword.type = "password";
    rptState = true;
    rptStateTrue.style.display = "inline-block";
    rptStateFalse.style.display = "none";
  }
  console.log("repeat type changed!");
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

function next() {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let birthday = document.getElementById('birthday')
  let gender = document.getElementById('gender');
  let textToShow = document.getElementById('textToShow');
  let passwordField = document.getElementById('passwordField');
  let checkboxes = document.getElementById('checkboxes');

  activatePreviousButton();
  activateNextButton();
  deactivateSubmitButton();

  if (currPosition === 0) {
    name.style.display = "none";
    email.style.display = "block";
    currPosition++;
  } else if (currPosition === 1) {
    email.style.display = "none";
    phone.style.display = "block";
    currPosition++;
  } else if (currPosition === 2) {
    phone.style.display = "none";
    birthday.style.display = "block";
    currPosition++;
  } else if (currPosition === 3) {
    birthday.style.display = "none";
    gender.style.display = "block";
    currPosition++;
  } else if (currPosition === 4) {
    gender.style.display = "none";
    textToShow.style.display = "block";
    currPosition++;
  } else if (currPosition === 5) {
    textToShow.style.display = "none";
    passwordField.style.display = "block";
    currPosition++;
  } else if (currPosition === 6) {
    passwordField.style.display = "none";
    checkboxes.style.display = "block";
    deactivateNextButton();
    activateSubmitButton();
    currPosition++;
  } else {
    deactivateNextButton();
    activateSubmitButton();
  }
  console.log(currPosition);
}

function previous() {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let birthday = document.getElementById('birthday')
  let gender = document.getElementById('gender');
  let textToShow = document.getElementById('textToShow');
  let passwordField = document.getElementById('passwordField');
  let checkboxes = document.getElementById('checkboxes');

  activatePreviousButton();
  activateNextButton();
  deactivateSubmitButton();

  if (currPosition === 7) {
    passwordField.style.display = "block";
    checkboxes.style.display = "none";
    currPosition--;
  } else if (currPosition === 6) {
    textToShow.style.display = "block";
    passwordField.style.display = "none";
    currPosition--;
  } else if (currPosition === 5) {
    gender.style.display = "block";
    textToShow.style.display = "none";
    currPosition--;
  } else if (currPosition === 4) {
    birthday.style.display = "block";
    gender.style.display = "none";
    currPosition--;
  } else if (currPosition === 3) {
    phone.style.display = "block";
    birthday.style.display = "none";
    currPosition--;
  } else if (currPosition === 2) {
    email.style.display = "block";
    phone.style.display = "none";
    currPosition--;
  } else if (currPosition === 1) {
    name.style.display = "block";
    email.style.display = "none";
    deactivatePreviousButton();
    currPosition--;
  } else {
    deactivatePreviousButton();
  }
  console.log(currPosition);
}

function deactivateSubmitButton() {
    let submit = document.getElementById('submit');

    submit.style.cursor = "not-allowed";
    submit.style.opacity = "0.5";
    submit.classList.remove("buttonHover");
}

function activateSubmitButton() {
    let submit = document.getElementById('submit');

    submit.style.cursor = "pointer";
    submit.style.opacity = "1";
    submit.classList.add("buttonHover");
}

function deactivateNextButton() {
    let nextBtn = document.getElementById('nextBtn');

    nextBtn.style.cursor = "not-allowed";
    nextBtn.style.opacity = "0.5";
    nextBtn.classList.remove("buttonHover");
}

function activateNextButton() {
  let nextBtn = document.getElementById('nextBtn');

  nextBtn.style.cursor = "pointer";
  nextBtn.style.opacity = "1";
  nextBtn.classList.add("buttonHover");
}

function activatePreviousButton() {
  let previousBtn = document.getElementById('previousBtn');

  previousBtn.style.cursor = "pointer";
  previousBtn.style.opacity = "1";
  previousBtn.classList.add("buttonHover");
}

function deactivatePreviousButton() {
  let previousBtn = document.getElementById('previousBtn');

  previousBtn.style.cursor = "not-allowed";
  previousBtn.style.opacity = "0.5";
  previousBtn.classList.remove("buttonHover");
}
