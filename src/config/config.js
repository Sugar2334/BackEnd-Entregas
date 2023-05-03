import 'dotenv/config'

const config = {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL || 'mongodb+srv://ManuelTorrico16:Manu1605@proyectos-coderhouse.sxzos9y.mongodb.net/productos?retryWrites=true&w=majority',
    filesPath: process.env.FILES_PATH || './files',
    secretJwt: process.env.SECRET_JWT
  };
  
  export default config;