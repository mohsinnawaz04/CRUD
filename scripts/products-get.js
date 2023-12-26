import {
  db,
  set,
  ref,
  get,
  child,
  update,
  push,
  remove,
  getStorage,
  sref,
  uploadBytesResumable,
  getDownloadURL,
  onChildAdded,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  query,
  orderByChild,
  equalTo,
  onValue,
  signOut,
} from "../firebase/firebaseConfig.js";
let uniqueId = null;

(function () {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    window.location.pathname = "../Login-SignUp/Firebase - Login/login.html";
  }
  uniqueId = user.uid;
  // if (user.phoneNumber === "admin") {
  //   document.getElementById("redirect").textContent = "Go to Admin Panel";
  // } else {
  //   document.getElementById("redirect").style.display = "none";
  // }
})();

//
// console.log(uniqueId);
//

//
// var adminPanelRedirect = document.getElementById("redirect");

// adminPanelRedirect.addEventListener("click", () => {
//   window.location.pathname = "../admin-panel/admin.html";
// });

//

// Defining variables`

let cardImage = document.querySelector(".card-img-top");
let cardTitle = document.querySelector(".card-title");
let cardDescription = document.querySelector(".card-text");

let productsRow = document.getElementById("products-row");

const dbRef = ref(db);
const productsRef = child(dbRef, "products");
const usersRef = child(dbRef, "users");

onValue(productsRef, (snapshot) => {
  if (snapshot.exists()) {
    const object = snapshot.val();
    // console.log(object);
    const array = Object.values(object);

    array.forEach((obj) => {
      let card = `
    <div class="card col-2 py-3">
    <img
      src="${obj.productImage}"
      class="card-img-top"
      alt="${obj.description}"
      style="object-fit: cover; aspect-ratio: 10/10"
    />
    <div class="card-body">
      <h5 class="card-title">${obj.name}</h5>
      <p class="card-text">${obj.description}</p>
      <a href="#" class="btn btn-primary px-3">${obj.price}</a>
    </div>
  </div>
    `;
      productsRow.innerHTML += card;
    });
  } else {
    alert("no products available");
  }
});

// console.log(usersRef);

get(child(dbRef, `users/${uniqueId}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      handleRole(snapshot.val());
      // console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

function handleRole(userData) {
  if (userData.role === "admin") {
    var adminPanelRedirect = document.createElement("button");

    adminPanelRedirect.classList.add("btn", "btn-primary", "m-3");
    adminPanelRedirect.id = "redirect";
    adminPanelRedirect.type = "button";

    adminPanelRedirect.textContent = "Go to admin panel";

    var mainContainer = document.getElementById("main-container");
    mainContainer.insertBefore(adminPanelRedirect, productsRow);

    adminPanelRedirect.addEventListener("click", () => {
      window.location.pathname = "../admin-panel/admin.html";
    });
    document.getElementById("redirect").textContent = "Go to Admin Panel";
  }
}

//SIGN OUT FUNCTIONALITY
let signOutDiv = document.getElementById("signOut");

signOutDiv.addEventListener("click", userSignOut);
//

function userSignOut() {
  // console.log(auth);
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "You are now logged out",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
}
