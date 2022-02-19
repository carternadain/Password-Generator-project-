// Assignment code here

// declare global variables
var minLength = 8;
var maxLength = 128;
var password = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var lowerCaseLetters = alphabet.split('');
var upperCaseLetters = alphabet.toUpperCase();
upperCaseLetters = upperCaseLetters.split('');
var numbers = '0123456789'.split('');
var specialCharacters = "'`~!@#$%^&*()_-=+<>,./?[]{}\|;:".split('');

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// prompt for how long of a password is desired
var inputPasswordLength = function() {
  // prompt user for desired password length and store as variable
  var passwordLength = window.prompt("How long would you like your password to be? Please enter between 8 and 128 characters.");
  // quick math check, if any remainder then it will be nonzero. Or if a string will be NaN.
  var decimalCheck = (passwordLength - Math.floor(passwordLength));

  // validation logic for password length
  // Preventing null entries
  if (passwordLength === null) {
    window.alert("You need to provide a valid response! Please enter a whole number between 8 and 128.");
    return inputPasswordLength();
  }
  // setting range to 8-128
  else if (passwordLength < minLength || passwordLength > maxLength) {
    window.alert("You have entered a number outside the acceptable range. Please enter a whole number between 8 and 128.");
    return inputPasswordLength();
  }
  // preventing decimals and string entries
  else if (decimalCheck !== 0 || decimalCheck === NaN) {
    window.alert("You have entered a decimal or text, please enter a whole number between 8 and 128!")
    return inputPasswordLength();
  }
  // If all seems good store password length in localStorage
  else {
    localStorage.setItem("passwordLength", passwordLength);
  }
};

// function to gather character specifications
var inputCharacters = function() {
  // using a confirm approach. Ok provides true and Cancel provides false.
  // lowercase confirm
  var confirmLower = window.confirm("Do you want LOWERCASE CHARACTERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // uppercase confirm
  var confirmUpper = window.confirm("Do you want UPPERCASE CHARACTERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // numbers confirm
  var confirmNumber = window.confirm("Do you want NUMBERS in your password? Select 'Ok' if so, if you do not then select 'Cancel'");
  // special characters confrim
  var confirmSpecial = window.confirm("Do you want SPECIAL CHARACTERS? Select 'Ok' if so, if you do not then select 'Cancel'");

  // validation to prevent no entry from user
  if (!confirmLower && !confirmUpper && !confirmNumber && !confirmSpecial) {
    window.alert("You must choose at least one option. Try again!")
    inputCharacters();
    // return needed here or booleans overwritten to false
    return;
  }

  // store user character desires in local storage. IMPORTANT: These will become strings once in localStorage and need to be changed back to boolean after retrieval
  localStorage.setItem("confirmLower", confirmLower);
  localStorage.setItem("confirmUpper", confirmUpper);
  localStorage.setItem("confirmNumber", confirmNumber);
  localStorage.setItem("confirmSpecial", confirmSpecial);
};

// Function for random characters
var characterGeneration = function(characterArray) {
  var arrayMultiplier = Math.random();
  var characterIndex = Math.floor(arrayMultiplier*characterArray.length);
  var randomCharacter = characterArray[characterIndex];
  localStorage.setItem("randomCharacter", randomCharacter);
};

// Function for 3 characters desired from user
var threePrompts = function(firstConfirm, secondConfirm, thirdConfirm, varOne, varTwo, varThree) {
  var charSelector = Math.random();

  if(firstConfirm && charSelector <= 0.33) {
    characterGeneration(varOne);
  } 
  else if (secondConfirm && charSelector > 0.33 && charSelector <= 0.66) {
    characterGeneration(varTwo);
  } 
  else if(thirdConfirm && charSelector > 0.66) {
    characterGeneration(varThree);
  } 
};

// function for two characters desired from user
var twoPrompts = function(firstConfirm, varOne, varTwo) {
  var charSelector = Math.random();

  if(firstConfirm && charSelector <=0.5) {
    characterGeneration(varOne);
  }
  else {
    characterGeneration(varTwo);
  }
};

// function for all four prompts desired, felt cleaner to separate this if from the remainder in the generation below
var allFourPrompts = function() {
  var charSelector = Math.random();

  if(charSelector <= 0.25) {
    characterGeneration(lowerCaseLetters);
  } 
  else if (charSelector > 0.25 && charSelector <= 0.50) {
    characterGeneration(upperCaseLetters);
  } 
  else if(charSelector > 0.50 && charSelector <= 0.75) {
    characterGeneration(numbers);
  } 
  else if (charSelector > 0.75) {
    characterGeneration(specialCharacters);
  }
}

// Password generation function
var passwordGeneration = function() {
  // declare empty array to prevent errors upon page refresh
  var password = [];
  // import passwword length input from local storage
  var passwordLength = localStorage.getItem("passwordLength");

  // import character choices from local storage and convert back to boolean values
  var confirmLower = localStorage.getItem("confirmLower");
  const lowerBool = confirmLower === 'true';
  var confirmUpper = localStorage.getItem("confirmUpper");
  const upperBool = confirmUpper === 'true';
  var confirmNumber = localStorage.getItem("confirmNumber");
  const numberBool = confirmNumber === 'true';
  var confirmSpecial = localStorage.getItem("confirmSpecial");
  const specialBool = confirmSpecial === 'true';

  // initiate for loop for password generation 
  for (var i = 0; i < passwordLength; i++) {
    if(lowerBool && upperBool && numberBool && specialBool) {
      allFourPrompts();
    }
    // no numbers
    else if(lowerBool && upperBool && specialBool) {
      threePrompts(lowerBool, upperBool, specialBool, lowerCaseLetters, upperCaseLetters, specialCharacters);
    }
    // no special
    else if(lowerBool && upperBool && numberBool) {
      threePrompts(lowerBool, upperBool, numberBool, lowerCaseLetters, upperCaseLetters, numbers);
    }
    // no upper
    else if(lowerBool && numberBool && specialBool) {
      threePrompts(lowerBool, numberBool, specialBool, lowerCaseLetters, numbers, specialCharacters);
    }
    // no lower
    else if(upperBool && numberBool && specialBool) {
      threePrompts(upperBool, numberBool, specialBool, upperCaseLetters, numbers, specialCharacters);
    }
    // lower and upper only
    else if(lowerBool && upperBool) {
      twoPrompts(lowerBool, lowerCaseLetters, upperCaseLetters);
    }
    // lower and number only
    else if(lowerBool && numberBool) {
      twoPrompts(lowerBool, lowerCaseLetters, numbers);
    }
    // lower and special only
    else if(lowerBool && specialBool) {
      twoPrompts(lowerBool, lowerCaseLetters, specialCharacters);
    }
    // upper and special only
    else if(upperBool && specialBool) {
      twoPrompts(upperBool, upperCaseLetters, specialCharacters);
    }
    // upper and number only
    else if(upperBool && numberBool) {
      twoPrompts(upperBool, upperCaseLetters, numbers);
    }
    // number and special only
    else if(numberBool && specialBool) {
      twoPrompts(numberBool, numbers, specialCharacters);
    }
    // If only lower desired
    else if (lowerBool) {
      characterGeneration(lowerCaseLetters);
    }
    // If only upper desired
    else if (upperBool) {
      characterGeneration(upperCaseLetters);
    }
    // If only numbers desired
    else if (numberBool) {
      characterGeneration(numbers);
    }
    // If only special characters desired
    else if (specialBool) {
      characterGeneration(specialCharacters);
    }
    // retrieve randomCharacter from the localStorage
    var randomCharacter = localStorage.getItem("randomCharacter");

    // push character to password array
    password.push(randomCharacter);

    // convert password array to string so to store with localStorage but as a new variable
    var passwordString = password.join('');
    localStorage.setItem("passwordString", passwordString);
  }
};

// Write password to the #password input
function writePassword() {
  var passwordText = document.querySelector("#password");
  var password = [];
  // run prompt functions for user input
  inputPasswordLength();
  inputCharacters();

  // run password generation
  passwordGeneration();

  // retrieve passwordString from local storage and set as password string. Display to user
  password = localStorage.getItem("passwordString");
  passwordText.value = password;
  localStorage.removeItem("passwordString");
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);