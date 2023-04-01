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

// Cycles through each character type and prompts user whether to use each.
// If a type is selected, a random character of it is selected to be
// guaranteed to be used.  These characters are returned along with a
// complete pool of characters that the rest of the password can be
// generated from as an array.  At least one type must be selected.  If no
// types are selected, an error is show and the user will be prompted for
// each type again until that condition is satisfied.
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

// This is the helper for the previous method.  It is what actually  prompts
// the user for each character type, which is passed into it.  If a type is
// selected, an arbitrary character of that type along with the entire pool
// of characters of that type are returned as an array.  If that type is not
// selected, an array of empty strings is returned instead.
function confirmType(message, opts_list) {
  var userResponse = confirm(`Use ${message}?`);
  if (userResponse) {
    var guaranteed_char = opts_list.charAt(rand(opts_list.length));
    return [guaranteed_char,opts_list];
  }
  return ["",""];
}

// This prompts the user for password length.  It validates that user input
// is a number between 8 and 128.
function promptLength() {
  var userResponse = parseInt(prompt("How long should the password be? (8-128 characters)"), 10);
  while (isNaN(userResponse) || userResponse < 8 || userResponse > 128) {
    userResponse = parseInt(prompt("INVALID ENTRY: Try again.  How long should the password be? (8-128 characters)"), 10);
  }
  return userResponse;
}

// This actually builds the password.  It creates a string the same length
// as the final password populated only by spaces, replaces random spaces
// with the guaranteed characters, then replaces the remainging spaces with
// random characters from the provided pool.  The resulting string is
// returned as the password.
function buildPassword(length, chars, charOptions) {
  var passwordBuff = initPassword(length);
  passwordBuff = injectGuaranteedChars(chars, passwordBuff);
  return fillPasswordString(charOptions, passwordBuff);
}

// This is the helper that generates the initial blank password string.
function initPassword(length) {
  var password = "";
  for(i=0;i<length;i++){
    password += " ";
  }
  return password;
}

// This is the helper that replaces random spaces with the characters that
// are guaranteed to be in the final password result.  Checks are made to
// ensure that two or more of the characters aren't be inserted into the
// same spot (i.e. bumping each other out of the result).  The resulting
// string is returned.
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

// This is the helper that fills in any remaining spaces of the password
// string with arbitrary characters from the provided pools of characters.
// If a spot has already been filled, this helper simply skips it.  The
// resulting string is returned.
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

// This is simple helper that replaces a character in a string at a certain
// index with the provided character, then returns the new string.  If the
// provided index is invalid, the string is returned unchanged.
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
