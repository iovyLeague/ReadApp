//
function loadUsernameReset() {
  const inputUsername = document.getElementById("input-username");
  const resetButton = document.querySelector(".username-reset-button");

  resetButton.addEventListener("click", function () {
    inputUsername.value = "";
  });
}

function togglePasswordVisibility() {
  const inputPassword = document.querySelector("#input-password");
  const visiblityButton = document.querySelector(".password-eye-button");

  visiblityButton.addEventListener("click", function () {
    const currentType = inputPassword.getAttribute("type");

    if (currentType === "password") {
      inputPassword.setAttribute("type", "text");
    } else {
      inputPassword.setAttribute("type", "password");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadUsernameReset();
  togglePasswordVisibility();
});
