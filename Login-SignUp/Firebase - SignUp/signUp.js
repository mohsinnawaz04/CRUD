import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  set,
  db,
  ref,
  push,
} from "../Firebase/firebaseConfig.js";

var signUpForm = document.getElementById("signUpFormer");
let name = document.querySelector("#floatingName");
let email = document.querySelector("#floatingInput");
let password = document.querySelector("#floatingPassword");
let Confirmpassword = document.querySelector("#floatingPassword2");
let submitBtn = document.getElementById("submitBtn");

signUpForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  console.log("SignUp");

  if (email.value.trim() === "") {
    alert("Please Enter Email");
    return;
  }
  if (password.value !== Confirmpassword.value) {
    alert("Passwords do not match");
    return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      email.value = "";
      password.value = "";
      Confirmpassword.value = "";
      var userInfo = userCredential.user;
      var userCollection = {
        name: name.value,
        email: userInfo.email,
        isVerified: userInfo.emailVerified,
        uniqueId: userInfo.uid,
        role: "user",
      };
      const uniqueId = userInfo.uid;
      // console.log(userCollection);

      // let userCollectionRef = ref(db, "users");
      // var usersUniqueRef = push(userCollectionRef);

      // const uniqueKey = usersUniqueRef.key;

      set(ref(db, `users/${uniqueId}`), userCollection)
        .then(() => {
          name.value = "";
          console.log("Successfully added usercollection");
        })
        .catch((err) => {
          console.log("ERROR: ", err);
        });
      console.log(userCollection);
      sendVerificationToEmail(userCredential.user);
    })
    .catch((error) => {
      console.error("ERROR: ", error);
    });
}
function sendVerificationToEmail(user) {
  sendEmailVerification(user).then(() => {
    // Email verification sent!
    // ...
  });
}
