console.log("Portfolio Builder Node.js Project Loaded");

const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.03)";
  });

  btn.addEventListener("mouseout", () => {
    btn.style.transform = "scale(1)";
  });
});