// This code adds a login and signup form to the site

// The login form
var loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the username and password from the form
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Send a request to the server to login the user
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "login.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("username=" + username + "&password=" + password);

  // Handle the response from the server
  xhr.onload = function() {
    if (xhr.status === 200) {
      // The user logged in successfully
      window.location.href = "index.php";
    } else {
      // The user did not log in successfully
      var error = document.getElementById("login-error");
      error.innerHTML = xhr.responseText;
    }
  };
});

// The signup form
var signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the username, email, and password from the form
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  // Check if the passwords match
  if (password !== confirmPassword) {
    // The passwords do not match
    var error = document.getElementById("signup-error");
    error.innerHTML = "As senhas não conferem.";
    return;
  }

  // Send a request to the server to signup the user
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "signup.php");