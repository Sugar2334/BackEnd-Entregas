const socketClient = io();

const prods = document.getElementById("prods");
const idCart = document.getElementById('idCart').innerText


socketClient.emit('mongoProds')

let arr = []

socketClient.on('alert', (e) => {
  if (!!e.error) {
    alert(e.error)
  } else {
    alert(e.message)
  }
})

const render = (e) => {
  e.docs.forEach((elem) => {
    const div = document.createElement("div");
    const btn = document.createElement('button')
    const title = document.createElement('p')
    const price = document.createElement('p')
    div.className = "prodCard";
    title.innerText = elem.title
    price.innerHTML = `$${elem.price}`
    btn.innerText = "Agregar al carrito"
    btn.addEventListener('click', () => {
      socketClient.emit('addToCart', { obj: elem, idCart: idCart })
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