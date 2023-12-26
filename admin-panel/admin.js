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
} from "../firebase/firebaseConfig.js";

(function () {
  let user = JSON.parse(localStorage.getItem("user"));
  const uniqueId = user.uid;
  if (user === null) {
    window.location.pathname = "../Login-SignUp/Firebase - Login/login.html";
  }

  //
  const dbRef = ref(db);
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

  //
})();

function handleRole(userData) {
  if (userData.role === "user") {
    window.location.pathname = "../index.html";
  }
}

//
let productsPageRedirect = document.getElementById("redirect");

productsPageRedirect.addEventListener("click", () => {
  window.location.pathname = "../index.html";
});

//

let form = document.getElementById("addProductsForm");
let name = document.getElementById("pName");
let price = document.getElementById("price");
let description = document.getElementById("description");
let productImage = document.getElementById("product-image");
let imageOfProduct = null;

let uniqueKeyOfProducts = null;

let tableDiv = document.getElementById("table-div");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  // console.log(name.value, price.value, description.value);

  var storage = getStorage();
  var profileRef = sref(storage, `productImages/${imageOfProduct.name}`);
  var uploadTask = uploadBytesResumable(profileRef, imageOfProduct);

  // imageURL = null;

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("first observer", snapshot);
    },
    (error) => {
      console.log("ERROR", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        let data = {
          name: name.value,
          price: price.value,
          description: description.value,
          productImage: downloadUrl,
        };

        let productsRef = ref(db, "products");
        var productsUniqueRef = push(productsRef);

        const uniqueKey = productsUniqueRef.key;
        uniqueKeyOfProducts = uniqueKey;

        set(ref(db, `products/${uniqueKey}`), data)
          .then(() => {
            console.log("Success");
            Swal.fire({
              title: "Success",
              text: `Your product has been added to database.`,
              icon: "success",
            });
            document
              .querySelectorAll("input")
              .forEach((inp) => (inp.value = ""));
            document.getElementById("card-image").src = "";
          })
          .catch((err) => {
            console.log("ERROR: ", err);
          });
        console.log("file available at: ", downloadUrl);
      });
    }
  );
}

productImage.onchange = function (e) {
  var files = e.target.files;
  var imageReader = new FileReader();

  imageOfProduct = files[0];

  let imageCard = document.getElementById("card-image");

  imageReader.readAsDataURL(files[0]);

  imageReader.onload = function () {
    imageCard.src = `${imageReader.result}`;
  };
};

const dbRef = ref(db);
const productsRef = child(dbRef, "products");

onValue(productsRef, (snapshot) => {
  if (snapshot.exists()) {
    const object = snapshot.val();
    const array = Object.values(object);

    let table = `<table id="table">
      <tr>
        <th>Product </th>
        <th>Price</th>
        <th>Description</th>
      </tr>
    </table>`;

    tableDiv.innerHTML = table;

    array.forEach((obj) => {
      const tr = document.createElement("tr");

      tr.innerHTML += `
        <td id="product-name">${obj.name}</td>
        <td id="product-price">${obj.price}</td>
        <td id="product-description">${obj.description}</td>
        <td><button type="button" class='btn btn-warning'>Update</button></td>
        <td><button type="button" class='btn btn-danger'>Delete</button></td>
      `;

      document.getElementById("table").appendChild(tr);
      let updateBtn = document.querySelector(".btn-warning");

      document.querySelectorAll(".btn-danger").forEach((button) => {
        button.addEventListener("click", handleDelete);
      });

      updateBtn.addEventListener("click", updateData);
    });
  } else {
    console.log("No products available");
  }
});

//
//

function handleDelete(e) {
  const clickedButton = e.currentTarget;
  const tableRow = clickedButton.parentElement.parentElement;
  description = tableRow.querySelector("#product-description").textContent;

  clickedButton.addEventListener("click", () => {
    const reference = ref(db, "products");
    const producstList = query(
      reference,
      orderByChild("description"),
      equalTo(description)
    );
    get(producstList)
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          remove(childSnapshot.ref);
          // console.log(childSnapshot);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  clickedButton.click();
}

//

function updateData() {
  let productName = document.getElementById("product-name");
  let productPrice = document.getElementById("product-price");
  let productDescription = document.getElementById("product-description");

  name.value = productName.textContent;
  price.value = productPrice.textContent;
  description.value = productDescription.textContent;
}
//

//
