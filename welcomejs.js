const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signInForm');
const signUpForm=document.getElementById('signupForm');

signUpButton.addEventListener('click',function(){
     signInForm.style.display="none";
     signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
     signInForm.style.display="block";
     signUpForm.style.display="none";
})

     //LOADING
     window.addEventListener("load", () => {
          const loader = document.querySelector(".loader");
          loader.classList.add("loader--hidden");
          loader.addEventListener("transitionend", () => {
          });
     });

     //FORGOT PASSWORD
     function mess(){
          alert("Contact the owner!")
     }


     document.addEventListener("DOMContentLoaded", function () {
          
          
          signUpForm.addEventListener("submit", function (event) {
               event.preventDefault();
           
               const fName = document.getElementById("fName").value;
               const lName = document.getElementById("lName").value;
               let email = document.getElementById("email").value.trim().toLowerCase();
               const password = document.getElementById("password").value;
               const emailError = document.getElementById("email-error");
               const passwordError = document.getElementById("password-error");
           
               // Enforce allowed email domains
               const allowedDomains = [
                   "@gmail.com", "@yahoo.com", "@outlook.com", 
                   "@hotmail.com", "@icloud.com", "@aol.com", 
                   "@protonmail.com", "@zoho.com"
               ];
           
               // Remove spaces & force lowercase (already done above)
               email = email.replace(/\s/g, "");
           
               // Check email format
               const emailParts = email.split("@");
               if (
                   emailParts.length !== 2 ||   // Ensure it has exactly one '@'
                   emailParts[0].length < 5 ||  // Ensure at least 5 letters before '@'
                   !/^[a-z]+$/.test(emailParts[0]) || // Ensure only lowercase letters before '@'
                   !allowedDomains.includes("@" + emailParts[1]) // Ensure allowed domain
               ) {
                   // Show error message
                   emailError.textContent = "Invalid email format!";
                   emailError.style.color = "red";
                   document.getElementById("email").style.borderColor = "red";
                   return;
               } else {
                   // Remove error if valid
                   emailError.textContent = "";
                   document.getElementById("email").style.borderColor = "#ccc";
               }
           
               const userSignUp = {
                   firstName: fName,
                   lastName: lName,
                   email: email,
                   password: password,
               };
           
               // Save user data to local storage
               localStorage.setItem("userSignUp", JSON.stringify(userSignUp));
           
               Swal.fire({
                   title: "Good job!",
                   text: "Sign Up Successfully! You can now sign in.",
                   icon: "success",
                   confirmButtonText: "OK"
               }).then(() => {
                   // Reset fields
                   document.getElementById("fName").value = "";
                   document.getElementById("lName").value = "";
                   document.getElementById("email").value = "";
                   document.getElementById("password").value = "";
           
                   // Reset password indicator
                   const passwordInput = document.querySelector("input[name='password']");
                   const showHide = document.querySelector(".show_hide");
                   const indicator = document.querySelector(".indicator");
                   const text = document.querySelector(".text");
           
                   passwordInput.value = "";
                   passwordInput.style.borderColor = "#757575";
                   text.textContent = "";
                   indicator.classList.remove("active");
                   showHide.style.color = "#757575";
                   showHide.style.visibility = "hidden";
           
                   // Show sign-in form
                   signInForm.style.display = "block";
                   signUpForm.style.display = "none";
               });
           });
           
               
          // Function to handle sign-in
          signInForm.addEventListener("submit", function (event) {
               event.preventDefault();
          
               const email = document.getElementById("secondEmail").value;
               const password = document.getElementById("secondPassword").value;
               
               const storedUser = JSON.parse(localStorage.getItem("userSignUp"));
               
               if (storedUser && storedUser.email === email && storedUser.password === password) {
                    Swal.fire({
                         title: "Good job!",
                         text: "Sign In Successfully!",
                         icon: "success",
                         confirmButtonText: "OK",
                         customClass: {
                              confirmButton: "swal-confirm-button"
                         }
                    }).then(() => {
                         window.location.href = "home.html";
                    });
               } else {
                    Swal.fire({
                         title: "Error!",
                         text: "The email or password you entered is incorrect. Please try again.",
                         icon: "error"
                    }).then(() => {
                         document.getElementById("secondEmail").value = "";
                         document.getElementById("secondPassword").value = "";
                    });
               }
          });
     });


     // SHOW OR HIDE PASSWORD
     const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('secondPassword');

let isPasswordVisible = false;

togglePassword.style.color = '#757575'; // Initial color when password is hidden
togglePassword.style.display = 'none';

togglePassword.addEventListener('click', function () {
    isPasswordVisible = !isPasswordVisible; // Toggle the password visibility state

     if (isPasswordVisible) {
        passwordInput.setAttribute('type', 'password'); // Show the password in the input field
        togglePassword.style.color = 'rgb(0, 255, 255)'; // Set color to blue when password is shown
     } else {
        passwordInput.setAttribute('type', 'text'); // Hide the password in the input field
        togglePassword.style.color = '#757575'; // Set color to gray when password is hidden
     }
});

passwordInput.addEventListener('input', function () {
    const passwordValue = this.value.trim(); // Trim any whitespace

     if (passwordValue !== '') {
        togglePassword.style.display = 'block'; // Show toggle icon if password is not empty
     } else {
        togglePassword.style.display = 'none'; // Hide toggle icon if password is empty
     }
});


     togglePassword.addEventListener('click', function () {
          const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
          passwordInput.setAttribute('type', type);
          this.classList.toggle('fa-eye-slash');
          this.classList.toggle('fa-eye');
     });



     // REGISTER PASSWORD STRONG!!
     document.addEventListener("DOMContentLoaded", () => {
          const input = document.querySelector("input[name='password']"),
               showHide = document.querySelector(".show_hide"),
               indicator = document.querySelector(".indicator"),
               iconText = document.querySelector(".icon-text"),
               text = document.querySelector(".text");
          
          // Regular expressions for password strength
          const alphabet = /[a-zA-Z]/, // Letter a to z and A to Z
              numbers = /[0-9]/, // Numbers 0 to 9
              scharacters = /[!@#$%^&*?_()-+=~]/; // Special characters
          
          // Function to update password strength indicator
          function updateStrengthIndicator() {
               let val = input.value;
               
               if (val.length === 0) {
               // Hide the eye icon and update indicator colors
               showHide.style.visibility = "hidden";
                  input.style.borderColor = "#757575"; // Reset border color
                  indicator.classList.remove("active"); // Remove active class
               } else if (val.length < 6) {
                    text.textContent = "Password is weak";
                    updateIndicatorColors("#FF6333");
               } else if (val.length < 8 || (!val.match(alphabet) || !val.match(numbers))) {
                    text.textContent = "Password is medium";
                    updateIndicatorColors("#cc8500");
               } else if (val.length >= 8 && val.match(alphabet) && val.match(numbers) && val.match(scharacters)) {
                    text.textContent = "Password is strong";
                    updateIndicatorColors("#22C32A");
               } else {
                    text.textContent = "";
                    indicator.classList.remove("active");
               }
          }
          
          // Function to update indicator colors based on strength
          function updateIndicatorColors(color) {
               input.style.borderColor = color;
               showHide.style.color = color;
               iconText.style.color = color;
               text.style.color = color;
               indicator.classList.add("active");
              showHide.style.visibility = "visible"; // Show the eye icon if it was hidden
          }
          
          // Event listener for toggling password visibility
          showHide.addEventListener("click", () => {
               input.type = input.type === "password" ? "text" : "password";
               showHide.classList.toggle("fa-eye-slash");
               showHide.classList.toggle("fa-eye");
          });
          
          // Event listener for keyup to check password strength
          input.addEventListener("keyup", updateStrengthIndicator);
          
          // Initial check for empty input
          updateStrengthIndicator();
     });