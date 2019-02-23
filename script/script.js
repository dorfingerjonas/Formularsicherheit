const checkNumbers = /[0-9]/g;
const checkMailUsername = /[^a-zA-Z0-9.]/g;
const checkMailDomain = /[^a-z.]/g;
const checkTelnumber = /[^0-9.\/\-+\(\)\´\[\]]/g;
const checkLetters = /[a-zA-Z]/g;
const checkSpecialChars = /[^a-zA-Z0-9]/g;

let errorText;
let currPosition = 0;
let state = true;
let rptState = true;
let isEmpty = false;
let counter = 0;

function checkInputs() {

  errorText = "";

  resetBorderColor();

  // if (currPosition === 7 && !checkEmptiness()) {
  if (currPosition === 7) {
    checkFirstName();
    checkLastName();
    checkEmailAdress();
    checkPhonenumber();
    checkBirthdate();
    getGender();
    getTextToShow();
    checkPassword();
    checkAGB();
    checkNewsletter();

    if (errorText != "") {
      printErrors();
      // console.log(errorText);
      // document.getElementById('errorText').textContent = errorText;
    } else {
      console.log("\n");
    }
  }
}

function checkEmptiness() {

  isFirstNameEmpty();
  isLastNameEmpty();
  isMailEmpty();
  isRepeatMailEmpty();
  isPhonenumberEmpty();
  isBirthdateEmpty();
  isTextToShowEmpty();
  isPasswordEmpty();
  isRepeatPasswordEmpty();
  isAGBSelected();

  if (isEmpty) {
    return false;
  } else {
    console.log(errorText);
    document.getElementById('errorText').textContent = errorText;
    return true;
  }
}

function isFirstNameEmpty() {
  const firstname = document.getElementById('firstname');

  if (firstname.value === "") {
    errorText += "- firstname is empty\n";
    changeBorderColor(firstname);
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function isLastNameEmpty() {
  const lastname = document.getElementById('lastname');

  if (lastname.value === "") {
    errorText += "- lastname is empty\n";
    changeBorderColor(lastname);
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function isMailEmpty() {
  const mail = document.getElementById('mailAdress');

  if (mail.value === "") {
    if (counter === 0) {
      errorText += "- mail is empty\n";
      counter++;
    }
    changeBorderColor(mail);
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function isRepeatMailEmpty() {
  const rptmail = document.getElementById('repeatMailAdress');

  if (rptmail.value === "") {
    errorText += "- confirmed email is empty\n";
    changeBorderColor(rptmail);
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function isPhonenumberEmpty() {
  const phonenumber = document.getElementById('phonenumber');

  if (phonenumber.value === "") {
    errorText += "- phonenumber is empty\n";
    changeBorderColor(phonenumber);
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function isPasswordEmpty() {
  const password = document.getElementById('password');

  if (password.value === "") {
    errorText += "- password is empty\n";
    changeBorderColor(password);
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function isRepeatPasswordEmpty() {
  const rptPassword = document.getElementById('repeatPassword');

  if (rptPassword.value === "") {
    errorText += "- confirmed password is empty\n";
    changeBorderColor(rptPassword);
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function isAGBSelected() {
  const agb = document.getElementById('agb').checked;

  if (!agb) {
    errorText += "- Terms of Service are not accepted\n";
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;

  if (!isFirstNameEmpty() && checkNumbers.test(firstname)) {
    errorText += "- firstname is invalid\n";
    return false;
  } else {
    console.log("Firstname: " + firstname);
    return true;
  }
}

function checkLastName() {
  let lastname = document.getElementById('lastname').value;

  if (!isLastNameEmpty() && checkNumbers.test(lastname)) {
    errorText += "- lastname is invalid\n";
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

  isRepeatMailEmpty();

  if (!isMailEmpty() && checkUsername(username) && checkDomain(domain) && isEmailAdressLongEnough(mailAdress)) {
    console.log("E-Mail: " + mailAdress);
    compareEmails();
    return true;
  } else if (!isMailEmpty()) {
    errorText += "- email adress is invalid\n"
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

  if (!isRepeatMailEmpty() && !isMailEmpty() && repeatMailAdress === mailAdress) {
    console.log("e-mail adresses are equal");
    return true;
  } else {
    errorText += "- e-mail adresses aren't equal\n";
    return false;
  }
}

function checkPhonenumber() {
  let number = document.getElementById('phonenumber').value;

  console.log("Phonenumber length: " + number.length);

  if (!(checkTelnumber.test(number)) && isPhonenumberLongEnough(number) && !isPhonenumberEmpty()) {
    errorText += "- phonenumber is invalid\n";
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
  let dateOfBirth = document.getElementById('birthdate');

  if (dateOfBirth.value === "") {
    errorText += "- no birthdate selected\n";
    changeBorderColor(dateOfBirth);
    return false;
  } else {
    let age = getCurrentAge(dateOfBirth.value)
    if (age >= 14) {
      console.log("Age: " + age);
      return true;
    } else if (age <= 14 && age >= 0) {
      errorText += "- you are too young\n";
      changeBorderColor(dateOfBirth);
      return false;
    } else {
      errorText += "- not born yet\n";
      changeBorderColor(dateOfBirth);
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
  let text = document.getElementById('text');

  if (text.value === "" || text.value === " " || text.value.length < 4) {
    errorText += "- textToShow is invalid\n";
    changeBorderColor(text);
    return false;
  } else {
    console.log("Text: " + text.value);
    return true;
  }
}

function checkPassword() {
  let password = document.getElementById('password').value;

  isRepeatPasswordEmpty();

  if (!isPasswordEmpty() && isPasswordLongEnough(password) && includesLetters(password) && includesNumbers(password) && includesSpecialChars(password)) {
    console.log("Password: " + password);
    comparePasswords();
    return true;
  } else {
    return false;
  }

}

function isPasswordLongEnough(password) {
  if (password.length >= 8) {
    return true;
  } else {
    errorText += "- password isn't long enough\n"
    return false;
  }
}

function includesLetters(password) {
  if (!(checkLetters.test(password))) {
    errorText += "- password doesn't include letters\n"
    return false;
  } else {
    console.log("Password includes letters!");
    return true;
  }
}

function includesNumbers(password) {
  if (!(checkNumbers.test(password))) {
    errorText += "- password doesn't include numbers\n";
    return false;
  } else {
    console.log("Password includes numbers!");
    return true;
  }
}

function includesSpecialChars(password) {
  if (!(checkSpecialChars.test(password))) {
    errorText += "- password doesn't include special characters\n"
    return false;
  } else {
    console.log("Password includes special chars!");
    return true;
  }
}

function comparePasswords() {
  let password = document.getElementById('password').value;
  let repeatPassword = document.getElementById('repeatPassword').value;

  if (!isRepeatPasswordEmpty() && !isPasswordEmpty() && repeatPassword === password) {
    console.log("Passwords are equal\n");
    return true;
  } else {
    errorText += "- passwords aren't equal\n";
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
    errorText += "- Terms of Service are not accepted\n";
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

function printErrors() {
  let parts = errorText.split('\n');

  for (let i = 0; i < parts.length; i++) {
    console.log(parts[i]);
  }
}

function changeBorderColor(element) {
  element.style.borderColor = "red";
}

function resetBorderColor() {
  let inputs = document.getElementsByTagName('input');

  for (input of inputs) {
    input.style.borderColor = "darkgray";
  }
}
