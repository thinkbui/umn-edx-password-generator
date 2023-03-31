// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var optionString = "";
  optionString += confirmLowerCase();
  optionString += confirmUpperCase();
  optionString += confirmNumber();
  optionString += confirmSpecial();

  return optionString;
}

function confirmLowerCase() {
  var userResponse = confirm("Use lower case letters?");
  if (userResponse) {
    return "abcdefghijklmnopqrstuvwxyz";
  }
  return "";
}

function confirmUpperCase() {
  var userResponse = confirm("Use upper case letters?");
  if (userResponse) {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  return "";
}

function confirmNumber() {
  var userResponse = confirm("Use numeric characters?");
  if (userResponse) {
    return "0123456789";
  }
  return "";
}

function confirmSpecial() {
  var userResponse = confirm("Use special characters?");
  if (userResponse) {
    return "~!@#$%^&*?+=-_";
  }
  return "";
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
