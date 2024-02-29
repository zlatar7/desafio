const google = document.getElementById("google");
google.addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/google", opts);
    response = await response.json();
    alert(response.message)
  } catch (error) {
    alert(error.message);
    console.log(error)
  }
});

const github = document.querySelector("#github");
github.addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/github", opts);
    response = await response.json();
    console.log(response);
    //alert(response.message);
  } catch (error) {
    alert(error.message);
  }
});