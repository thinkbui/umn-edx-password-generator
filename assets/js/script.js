// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var optionString = confirmType(lowerCasePrompt, lowerCaseOptions)
                     + confirmType(upperCasePrompt, upperCaseOptions)
                     + confirmType(numberPrompt, numberOptions)
                     + confirmType(specialPrompt, specialOptions);

  return optionString;
}

const lowerCaseOptions = "abcdefghijklmnopqrstuvwxyz";
const upperCaseOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberOptions = "0123456789";
const specialOptions = "~!@#$%^&*?+=-_";

const lowerCasePrompt = "lower case letters";
const upperCasePrompt = "upper case letters";
const numberPrompt = "numeric characters";
const specialPrompt = "special characters";

function confirmType(message, opts_list) {
  var userResponse = confirm(`Use ${message}?`);
  if (userResponse) {
    return opts_list
  }
  return "";
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
