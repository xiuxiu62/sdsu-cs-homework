const palette = document.querySelector(".palette");
const painting = document.querySelector(".painting");

const context = {
  color: "blue",
  setColor: (event) => (context.color = event.target.getAttribute("id")),
  draw: (event) => (event.target.style.backgroundColor = context.color),
};

palette.addEventListener("click", context.setColor);
painting.addEventListener("click", context.draw);
