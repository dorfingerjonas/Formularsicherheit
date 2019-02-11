function checkInputs() {
  checkFirstName();

}

function checkFirstName() {
  let firstname = document.getElementById('firstname').value;

  let criterion = /[o]/g;
  let result = firstname.match(criterion);

  console.log(result);

}
