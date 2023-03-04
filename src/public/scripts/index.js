const socket = io()

const button = document.getElementById('enviar')
const buttonDel = document.getElementById('eliminar')

button.addEventListener('click', (event) => {
    event.preventDefault()
    socket.emit('newProduct', {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
    })
})

buttonDel.addEventListener('click', (event) => {
    event.preventDefault()
    socket.emit('delProduct', {
        id: document.getElementById('id').value
    })
})

socket.on('arrayProd', data => {
    let log = document.getElementById('prod')
    let elemento = ''

    data.forEach(product => {
        elemento = elemento + `
            <div>
                <p>Title: ${product.title}</p>
                <p>Description: ${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Thumbnail: ${product.thumbnail}</p>
                <p>Code: ${product.code}</p>
                <p>Stock: ${product.stock}</p>
                <p>ID: ${product.id}</p>
                <p>Available: ${product.status}</p>
                <br>
            </div>
        `
    });
    log.innerHTML = elemento
})