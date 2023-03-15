const socketClient = io();

const form = document.getElementById("form"); // crear prods
const formDelete = document.getElementById("formDelete"); // borrar prods
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const price = document.getElementById("price");
const thumb = document.getElementById("thumb");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const prods = document.getElementById("prods"); // mostrar prods
const id = document.getElementById("idField");

socketClient.emit('showProds')

socketClient.on("prods", (e) => {
  prods.innerHTML = "";
  e.map((e) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <p>Id: ${e.id}</p>
    <p>Titulo: ${e.title}</p>
    <p>Descripción: ${e.description}</p>
    <p>Precio: ${e.price}</p>
    <p>Foto: ${e.thumbnail}</p>
    <p>Identificador: ${e.code}</p>
    <p>Stock: ${e.stock}</p>
    `;
    prods.appendChild(div);
  });
});

socketClient.on("alert", (e) => {
  if (e.error) {
    alert(e.error);
  } else {
    alert(e.message);
  }
});

form.onsubmit = (e) => {
  // form agregar prods
  e.preventDefault(); // evitar funionamiento x default
  const obj = {
    title: title.value,
    description: desc.value,
    price: price.value,
    thumbnail: thumb.value,
    code: code.value,
    stock: stock.value,
    category: "ABC",
  };
  title.value = "";
  desc.value = "";
  price.value = "";
  thumb.value = "";
  code.value = "";
  stock.value = "";
  prods.value = "";
  id.value = "";
  socketClient.emit("send", obj);
};

formDelete.onsubmit = (e) => {
  e.preventDefault();
  socketClient.emit("delete", Number(id.value));
  id.value = "";
};