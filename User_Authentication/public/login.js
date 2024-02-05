const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", login);

async function login(e) {
  try {
    e.preventDefault();

    const loginDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(loginDetails);

    const response = await axios.post("/user/login", loginDetails);

    if (response.status === 200) {
      window.location.href = "/home";
      alert(response.data.message);
    } else {
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    document.getElementById("response-message").innerText =
      "Account creation could not be completed!";
  }
}
