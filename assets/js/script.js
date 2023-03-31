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
  var guaranteedString = "";
  for (i=0;i<promptData.length;i++){
    data = confirmType(promptData[i][0],promptData[i][1]);
    guaranteedString += data[0];
    optionString += data[1];
  }
  var passwordLength = promptLength();
  return passwordLength;
}

const lowerCaseOptions = "abcdefghijklmnopqrstuvwxyz";
const upperCaseOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberOptions = "0123456789";
const specialOptions = "~!@#$%^&*?+=-_";

const lowerCasePrompt = "lower case letters";
const upperCasePrompt = "upper case letters";
const numberPrompt = "numeric characters";
const specialPrompt = "special characters";

const promptData = [[lowerCasePrompt,lowerCaseOptions],[upperCasePrompt,upperCaseOptions],[numberPrompt,numberOptions],[specialPrompt,specialOptions]];

function confirmType(message, opts_list) {
  var userResponse = confirm(`Use ${message}?`);
  if (userResponse) {
    var guaranteed_char = opts_list.charAt(Math.floor(Math.random() * opts_list.length));
    return [guaranteed_char,opts_list];
  }
  return ["",""];
}

function promptLength() {
  var userResponse = parseInt(prompt("How long should the password be? (8-128 characters)"), 10);
  while (isNaN(userResponse) || userResponse < 8 || userResponse > 128) {
    userResponse = parseInt(prompt("INVALID ENTRY: Try again.  How long should the password be? (8-128 characters)"), 10);
  }
  return userResponse;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
