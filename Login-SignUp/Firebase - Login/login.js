import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  googleProvider,
  GithubAuthProvider,
  githubProvider,
  FacebookAuthProvider,
  facebookProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  set,
  db,
  ref,
  push,
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
  // console.log("login");

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
      // console.log(user);
      if (user.emailVerified === false) {
        alert("Email not verified");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      window.location.pathname = "../";
      // ...
    })
    .catch((error) => {
      Swal.fire({
        title: "Error",
        text:
          "Your email or password was wrong. please re-enter your credentials",
        icon: "error",
      });
      console.error("ERROR: ", error);
    });
}

// Google Login :-

document
  .getElementById("google-login")
  .addEventListener("click", handleGoogleLogin);

function handleGoogleLogin() {
  // console.log("clicked on google anchor");
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      var userInfo = result.user;
      // console.log(userInfo);
      var userCollection = {
        name: userInfo.displayName,
        email: userInfo.email,
        isVerified: userInfo.emailVerified,
        uniqueId: userInfo.uid,
        role: "user",
      };
      const uniqueId = userInfo.uid;

      set(ref(db, `users/${uniqueId}`), userCollection)
        .then(() => {
          console.log("Successfully added usercollection");
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      // console.log(userCollection);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;

      localStorage.setItem("user", JSON.stringify(userInfo));
      window.location.pathname = "../";
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      console.error("ERROR: ", error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// Github Login :-

document
  .getElementById("github-login")
  .addEventListener("click", handleGithubLogin);

function handleGithubLogin() {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      var userInfo = result.user;
      // console.log(userInfo);
      var userCollection = {
        name: userInfo.displayName,
        email: userInfo.email,
        isVerified: userInfo.emailVerified,
        uniqueId: userInfo.uid,
        role: "user",
      };
      const uniqueId = userInfo.uid;

      set(ref(db, `users/${uniqueId}`), userCollection)
        .then(() => {
          console.log("Successfully added usercollection");
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      // console.log(userCollection);

      localStorage.setItem("user", JSON.stringify(user));
      window.location.pathname = "../";

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
}

document
  .getElementById("facebook-login")
  .addEventListener("click", handleFacebookLogin);

function handleFacebookLogin() {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      var userInfo = result.user;
      // console.log(userInfo);
      var userCollection = {
        name: userInfo.displayName,
        email: userInfo.email,
        isVerified: userInfo.emailVerified,
        uniqueId: userInfo.uid,
        role: "user",
      };
      const uniqueId = userInfo.uid;

      set(ref(db, `users/${uniqueId}`), userCollection)
        .then(() => {
          console.log("Successfully added usercollection");
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      // console.log(userCollection);

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      localStorage.setItem("user", JSON.stringify(user));
      window.location.pathname = "../";

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
}
