// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword() {
  var typeResponse = confirmAllTypes();
  var optionString = typeResponse[1];
  var guaranteedString = typeResponse[0];

  var passwordLength = promptLength();
  return buildPassword(passwordLength, guaranteedString, optionString);
  // return [guaranteedString, optionString, passwordLength];
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

function confirmAllTypes() {
  var optionString = "";
  var guaranteedString = "";
  while (guaranteedString.length == 0 || optionString.length == 0){
    for (i=0;i<promptData.length;i++){
      data = confirmType(promptData[i][0],promptData[i][1]);
      guaranteedString += data[0];
      optionString += data[1];
    }
    if (guaranteedString.length == 0 || optionString.length == 0) {
      alert("ERROR: You must select at least one character type.");
      optionString = "";  // Reset
      guaranteedString = "";  // Reset
    }
  }
  return [guaranteedString, optionString];
}

function confirmType(message, opts_list) {
  var userResponse = confirm(`Use ${message}?`);
  if (userResponse) {
    var guaranteed_char = opts_list.charAt(rand(opts_list.length));
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

function buildPassword(length, chars, charOptions) {
  var passwordBuff = initPassword(length);
  console.log(passwordBuff);
  passwordBuff = injectGuaranteedChars(chars, passwordBuff);
  console.log(passwordBuff);
  return fillPasswordString(charOptions, passwordBuff);
}

function initPassword(length) {
  var password = "";
  for(i=0;i<length;i++){
    password += " ";
  }
  return password;
}

function injectGuaranteedChars(chars,passwordString) {
  var stringBuff = passwordString;
  var rnd = rand(stringBuff.length);
  for(i=0;i<chars.length;i++){
    while (stringBuff.charAt(rnd) !== " ") {
      rnd = rand(stringBuff.length);
    }
    stringBuff = setCharAt(chars[i], rnd, stringBuff);
  }
  return stringBuff;
}

function fillPasswordString(charOptions, passwordString) {
  var stringBuff = passwordString;
  for(i=0;i<stringBuff.length;i++) {
    if (stringBuff.charAt(i) === " ") {
      var rnd = rand(charOptions.length);
      stringBuff = setCharAt(charOptions.charAt(rnd), i, stringBuff);
    }
  }
  return stringBuff;
}

function setCharAt (char, index, string) {
  if (index < 0 || index >= string.length) {
    return string;
  }
  return string.substring(0, index) + char + string.substring(index + 1, string.length);
}

// Returns a whole number less than ceil
function rand(ceil) {
  return Math.floor(Math.random() * ceil);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
