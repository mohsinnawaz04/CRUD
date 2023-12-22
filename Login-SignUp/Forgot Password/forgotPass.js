import { auth, sendPasswordResetEmail } from "../Firebase/firebaseConfig.js";

let forgotPassForm = document.getElementById("forgotPass");
let email = document.getElementById("floatingInput");

forgotPassForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  if (email.value.trim() === "") {
    alert("Email cannot be empty");
    return;
  }
  console.log("Success");
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      // Password reset email sent!
      // ..
      email.value = "";
      alert("CHECK YOUR EMAIL");
      window.location.pathname = "/";
    })
    .catch((error) => {
      console.error("ERROR: ", error);
    });
}
