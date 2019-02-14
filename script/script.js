const checkNumber = /[0-9]/g;
const checkMailUsername = /[^a-zA-Z0-9.]/g;
const checkMailDomain = /[^a-z.]/g;

function checkInputs() {
  checkFirstName();
  checkLastName();
  checkEmailAdress();
  compareEmails();

  console.log("\n");
}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;

  if (checkNumber.test(firstname)) {
    printError();
  } else {
    console.log("Fisrtname: " + firstname);
  }
}

function checkLastName() {
  let lastname = document.getElementById('lastname').value;

  if (checkNumber.test(lastname)) {
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

  if (checkUsername(username) && checkDomain(domain)) {
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

function compareEmails() {
  let mailAdress = document.getElementById('mailAdress').value;
  let repeatMailAdress = document.getElementById('repeatMailAdress').value;

  if (mailAdress === repeatMailAdress) {
    console.log("E-Mail Adresses are equal");
  } else {
    printError();
  }
}

function printError() {
  console.error("Fatal Error!");
}
