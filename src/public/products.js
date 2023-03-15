const socketClient = io();

const prods = document.getElementById("prods");

socketClient.emit('mongoProds')

let arr = []

const render = (e) => {
  e.docs.forEach((elem) => {
    const div = document.createElement("div");
    const btn = document.createElement('button')
    const title = document.createElement('p')
    const price = document.createElement('p')
    div.className = "prodCard";
    title.innerText = elem.title
    price.innerHTML = elem.price
    btn.innerText = "Agregar al carrito"
    btn.addEventListener('click', () => {
      socketClient.emit('addToCart', elem)
    })
    div.appendChild(title)
    div.appendChild(price)
    div.appendChild(btn)
    prods.appendChild(div);
  });
};

socketClient.on('prods', (e) => {
  prods.innerHTML = ''
  render(e)
})