const google = document.querySelector("#google");
google.addEventListener("click", async () => {
  try {
    console.log("funciona")
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/google", opts);
    response = await response.json();
    alert(response)
  } catch (error) {
    console.log(error.message)
    alert(error.message);
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
    alert(response.message);
  } catch (error) {
    alert(error.message);
  }
});