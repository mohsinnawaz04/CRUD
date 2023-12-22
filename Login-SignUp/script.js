(function () {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    window.location.pathname = "../Login-SignUp/Firebase - Login/login.html";
  }
})();
