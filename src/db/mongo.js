import mongoose from 'mongoose'

// Usuario y clave del usuario admin

const URI = 'mongodb+srv://ManuelTorrico16:Manu1605@proyectos-coderhouse.sxzos9y.mongodb.net/productos?retryWrites=true&w=majority'

// Conexion con el servidor de mongoose

mongoose.set("strictQuery", true);
mongoose.connect(URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado a MongoDB");
  }
});