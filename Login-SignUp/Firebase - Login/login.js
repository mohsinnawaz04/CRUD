import {
  auth,
  signInWithEmailAndPassword,
} from "../Firebase/firebaseConfig.js";

var loginForm = document.getElementById("loginForm");
let email = document.querySelector("#floatingInput");
let password = document.querySelector("#floatingPassword");

(function () {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user !== null) {
    window.location.pathname = "../../index.html";
  }
})();

loginForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  console.log("login");

  if (email.value.trim() === "") {
    alert("Please Enter Email");
    return;
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      email.value = "";
      password.value = "";

      let user = userCredential.user;
      user.phoneNumber = "user";
      console.log(user);
      if (user.emailVerified === false) {
        alert("Email not verified");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      window.location.pathname = "../";
      // ...
    })
    .catch((error) => {
      console.error("ERROR: ", error);
    });
}
