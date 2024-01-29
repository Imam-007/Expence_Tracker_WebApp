async function signup(e) {
  try {
    e.preventDefault();

    const signupDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(signupDetails);

    const response = await axios.post(
      "http://localhost:3000/user/signup",
      signupDetails
    );

    if (response.status === 201) {
      window.location.href = "../Login/login.html";
    } else {
      throw new Error("failed to login");
    }
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;">${err} <div>`;
  }
}
