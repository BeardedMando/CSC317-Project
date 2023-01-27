
//Testing code here
var anotherName = document.getElementById("index_username").value;
var i_name = document.getElementById("index_username").addEventListener('change', 
    function(ev){
        console.log(anotherName);
        console.log("another one");
});



//This has a purpose
function ValidateThis() {
    var name = document.getElementById("username").value;
    var password = document.getElementById("pass").value;
    var passValid = document.getElementById("passValidation").value;
    var screen_message = document.getElementById("message");
    var err_message = "";  
    var isPassValid = false;
    var isNameValid = false;
  
    var theAlphaNum = /^[a-z0-9]+$/;

    if (("A" > name[0] || name[0] > "Z") && ("a" > name[0] || name[0] > "z")){
      err_message += "Username must begin with either a-z or A-Z.<br>";
    }
    else if (!theAlphaNum.test(name) || name.length < 3 ) {
      err_message += "Username must have atleast 3 Alphanumeric Characters.<br>";
    } else {
     isNameValid = true;
    }
  
    var specialChar_regex = /[/*-+!@#$^&*]/;
    var num_regex = /[0-9]/;
    var uppCase_regex = /[A-Z]/;



    if (!uppCase_regex.test(password)) {
        err_message += "Password must have at leastone Uppercase Letter.";
    }
    else if (password.length < 8) {
      err_message += "Password must be atleast 8 characters.<br>";
    }
    else if (!num_regex.test(password)) {
      err_message += "Password must have atleast one number.<br>";
    }
    else if (!specialChar_regex.test(password)) {
      err_message += "Password must have atleast one special character.<br>";
    }
    else if (password !== passValid) {
      err_message += "Passwords must match!";
    } else {
      isPassValid = true;
    }
  
    if (isPassValid && isNameValid) {
      document.getElementById("regForm").submit();
    } else {
      screen_message.innerHTML = err_message;
      screen_message.style.color = "red";
    }
  }

