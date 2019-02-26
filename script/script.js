const checkNumbers = /[0-9]/g;
const checkMailUsername = /[^a-zA-Z0-9.]/g;
const checkMailDomain = /[^a-z.]/g;
const checkTelnumber = /[^0-9.\/\-+\(\)\´\[\]]/g;
const checkLetters = /[a-zA-Z]/g;
const checkSpecialChars = /[^a-zA-Z0-9]/g;
const checkAt = /[@]/g;

let errorText;
let currPosition = 0;
let state = true;
let rptState = true;
let counter = 0;

function checkInputs() {

  errorText = "";

  resetBorderColor();

  if (currPosition === 7) {
    checkFirstName();
    checkLastName();
    checkEmailAdress();
    checkConfirmedEmailAdress()
    checkPhonenumber();
    checkBirthdate();
    getGender();
    getTextToShow();
    checkPassword();
    checkConfirmedPassword();
    comparePasswords();
    isAGBSelected();
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
}

function isFirstNameEmpty() {
  const firstname = document.getElementById('firstname');
  let fn = document.getElementById('fn');

  if (firstname.value.length === 0) {
    fn.style.color = "#ff4f4f"
    fn.textContent = "empty";
    changeBorderColor(firstname);
    return  true;
  }
}

function isLastNameEmpty() {
  const lastname = document.getElementById('lastname');
  let ln = document.getElementById('ln');

  if (lastname.value.length === 0) {
    ln.style.color = "#ff4f4f"
    ln.textContent = "empty";
    changeBorderColor(lastname);
    return true;
  }
}

function isMailEmpty() {
  const mail = document.getElementById('mailAdress');
  let em = document.getElementById('em');

  if (mail.value === "") {
    if (counter === 0) {
      em.style.color = "#ff4f4f"
      em.textContent = "empty";
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
  let cem = document.getElementById('cem');

  if (rptmail.value === "") {
      cem.style.color = "#ff4f4f"
      cem.textContent = "empty";
    changeBorderColor(rptmail);
    isEmpty = true;
    return true;
  } else {
    return false;
  }
}

function isPhonenumberEmpty() {
  const phonenumber = document.getElementById('phonenumber');
  let pn = document.getElementById('pn');

  if (phonenumber.value.length === 0) {
    pn.style.color = "#ff4f4f"
    pn.textContent = "empty";
    changeBorderColor(phonenumber);
    return false;
  } else {
    return true;
  }
}

function isPasswordEmpty() {
  const password = document.getElementById('password');
  let pw = document.getElementById('pw');

  if (password.value.length === 0) {
    pw.style.color = "#ff4f4f"
    pw.textContent = "empty";
    changeBorderColor(password);
    return false;
  } else {
    return true;
  }
}

function isRepeatPasswordEmpty() {
  const rptPassword = document.getElementById('repeatPassword');
  let cpw = document.getElementById('cpw');

  if (rptPassword.value.length === 0) {
    cpw.style.color = "#ff4f4f"
    cpw.textContent = "empty";
    changeBorderColor(rptPassword);
    return false;
  } else {
    return true;
  }
}

function isAGBSelected() {
  const agb = document.getElementById('agb').checked;
  let tos = document.getElementById('tos');

  if (!agb) {
    tos.style.color = "#ff4f4f";
    tos.textContent = "not accepted";
  } else {
    tos.style.color = "black";
    tos.textContent = "accepted";
  }
}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;
  let fn = document.getElementById('fn');

  if (!isFirstNameEmpty() && checkNumbers.test(firstname)) {
    fn.style.color = "#ff4f4f"
    fn.textContent = "invalid";
  } else if (!isFirstNameEmpty()) {
    fn.style.color = "black"
    fn.textContent = firstname;
  }
}

function checkLastName() {
  let lastname = document.getElementById('lastname').value;
  let ln = document.getElementById('ln');

  if (!isLastNameEmpty() && checkNumbers.test(lastname)) {
    ln.style.color = "#ff4f4f"
    ln.textContent = "invalid";
  } else if (!isLastNameEmpty()) {
    ln.style.color = "black";
    ln.textContent = lastname;
  }
}

function checkEmailAdress() {
  let mailAdress = document.getElementById('mailAdress').value;
  let em = document.getElementById('em');

  if (!isMailEmpty() && containsAt(mailAdress)) {
    let parts = mailAdress.split('@');
    let username = parts[0];
    let domain = parts[1];

    compareEmails();
    isRepeatMailEmpty();

    if (checkUsername(username) && checkDomain(domain) && isEmailAdressLongEnough(mailAdress)) {
      em.style.color = "black"
      em.textContent = mailAdress;
      return true;
    } else if (!isMailEmpty()) {
      em.style.color = "#ff4f4f"
      em.textContent = "invalid";
      return false;
    }
  }
}

function checkConfirmedEmailAdress() {
  let rptMail = document.getElementById('repeatMailAdress').value;
  let cem = document.getElementById('cem');

  if (!isRepeatMailEmpty() && containsAt(rptMail)) {
    let parts = rptMail.split('@');
    let username = parts[0];
    let domain = parts[1];

    if (checkUsername(username) && checkDomain(domain) && isEmailAdressLongEnough(rptMail)) {
      cem.style.color = "black"
      cem.textContent = rptMail;
    } else if (!isRepeatMailEmpty()) {
      cem.style.color = "#ff4f4f"
      cem.textContent = "invalid";
    }
  } else {
    cem.style.color = "#ff4f4f"
    cem.textContent = "invalid";
  }
}

function containsAt(mail) {
   if (checkAt.test(mail)) {
     return true;
   } else {
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
  if (topLevelDomain.length >= 2) {
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
  let coem = document.getElementById('coem');

  if (!isRepeatMailEmpty() && !isMailEmpty()) {
    if (repeatMailAdress === mailAdress) {
      coem.style.color = "black";
      coem.textContent = "equal";
    } else {
      coem.style.color = "#ff4f4f";
      coem.textContent = "not equal";
    }
  }
}

function checkPhonenumber() {
  let number = document.getElementById('phonenumber').value;
  let pn = document.getElementById('pn');

  if (isPhonenumberEmpty()) {
    if (checkTelnumber.test(number) && isPhonenumberLongEnough(number)) {
      document.getElementById('pn').style.color = "black";
      document.getElementById('pn').textContent = number;
    } else {
      document.getElementById('pn').style.color = "#ff4f4f";
      document.getElementById('pn').textContent = "invalid";
    }
  }
}

function isPhonenumberLongEnough(number) {
  if (number.length >= 12) {
    return true;
  } else {
    return false;
  }
}

function checkBirthdate() {
  let dateOfBirth = document.getElementById('birthdate');
  let bd = document.getElementById('bd');

  if (dateOfBirth.value === "") {
    bd.style.color = "#ff4f4f";
    bd.textContent = "empty";
    changeBorderColor(dateOfBirth);
  } else {
    let age = getCurrentAge(dateOfBirth.value)
    if (age >= 14) {
      let parts = dateOfBirth.value.split('-');
      bd.style.color = "black";
      bd.textContent = parts[2] + "." + parts[1] + "." + parts[0];
    } else if (age <= 14 && age >= 0) {
      bd.style.color = "#ff4f4f";
      bd.textContent = "too young";
      changeBorderColor(dateOfBirth);
    } else {
      bd.style.color = "#ff4f4f";
      bd.textContent = "invalid";
      changeBorderColor(dateOfBirth);
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
  let gn = document.getElementById('gn');

  if (isMaleChecked(male)) {
    gender = male.value;
  } else if (isFemaleChecked(female)) {
    gender = female.value;
  } else if (isNotDefinedChecked(notDefined)) {
    gender = notDefined.value;
  }
  gn.style.color = "black";
  gn.textContent = gender;
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
  let txt = document.getElementById('txt');

  if (text.value === "" || text.value === " " || text.value.length < 4) {
    txt.style.color = "#ff4f4f";
    txt.textContent = "empty";
    changeBorderColor(text);
  } else {
    txt.style.color = "black";
    txt.textContent = text.value;
  }
}

function checkPassword() {
  let password = document.getElementById('password').value;
  let pw = document.getElementById('pw');
  let out = "";

  if (isPasswordEmpty()) {
    if (isPasswordLongEnough(password) && includesLetters(password)
        && includesNumbers(password) && includesSpecialChars(password)) {
      pw.style.color = "black";
      for (let i = 0; i < password.length; i++) {
        out += "*";
      }
      pw.textContent = out;
    } else {
      pw.style.color = "#ff4f4f";
      pw.textContent = "invalid";
    }
  }
}

function checkConfirmedPassword() {
  let repeatPassword = document.getElementById('repeatPassword').value;
  let cpw = document.getElementById('cpw');
  let output = "";

  if (isRepeatPasswordEmpty()) {
    if (isPasswordLongEnough(repeatPassword) && includesLetters(repeatPassword)
        && includesNumbers(repeatPassword) && includesSpecialChars(repeatPassword)) {
      cpw.style.color = "black";
      for (let i = 0; i < repeatPassword.length; i++) {
        output += "*";
      }
      cpw.textContent = output;
    } else {
      cpw.style.color = "#ff4f4f";
      cpw.textContent = "invalid";
    }
  }
}

function isPasswordLongEnough(password) {
  if (password.length >= 8) {
    return true;
  } else {
    return false;
  }
}

function includesLetters(password) {
  let letter = checkLetters.test(password);

  if (letter) {
    return true;
  } else {
    return false;
  }
}

function includesNumbers(password) {
  let num = checkNumbers.test(password);

  if (num) {
    return true;
  } else {
    return false;
  }
}

function includesSpecialChars(password) {
  let special = checkSpecialChars.test(password);

  if (special) {
    return true;
  } else {
    return false;
  }
}

function comparePasswords() {
  let password = document.getElementById('password').value;
  let rptPassword = document.getElementById('repeatPassword').value;
  let copw = document.getElementById('copw');

  if (isRepeatPasswordEmpty() && isPasswordEmpty()) {
    if (rptPassword === password) {
      copw.style.color = "black";
      copw.textContent = "equal";
    } else {
      copw.style.color = "#ff4f4f";
      copw.textContent = "not equal";
    }
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

function changeBorderColor(element) {
  element.style.borderColor = "red";
}

function resetBorderColor() {
  let inputs = document.getElementsByTagName('input');

  for (input of inputs) {
    input.style.borderColor = "darkgray";
  }
}
