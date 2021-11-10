const content = document.querySelector(".js-generated.content");
const elems = {
  name: document.createElement("h1"),
  content: document.createElement("div"),
  image: document.createElement("img"),
  details: document.createElement("div"),
};

elems.name.setAttribute("class", "dog-name");
elems.name.append("Rizzo");
content.append(elems.name);

elems.content.setAttribute("padding", "10px");
elems.content.setAttribute("display", "flex");
content.append(elems.content);

elems.image.setAttribute("src", "./assets/rizzo.jpg");
elems.image.style.width = "15rem";
elems.content.append(elems.image);

elems.details.setAttribute("padding", "10px");
elems.details.setAttribute("flex", "1");
elems.content.append(elems.details);

