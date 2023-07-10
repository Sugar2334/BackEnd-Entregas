import 'dotenv/config'

const config = {
  rail: process.env.RAIL_URI || 'mongodb+srv://ManuelTorrico16:Manu1605@proyectos-coderhouse.sxzos9y.mongodb.net/mydatabase?retryWrites=true&w=majority',
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL,
  filesPath: process.env.FILES_PATH || './files',
  secretJwt: process.env.SECRET_JWT || 'SecretJWT',
  nodemailerMail: process.env.NODEMAILER_MAIL,
  nodemailerPass: process.env.NODEMAILER_PASS
};

export default config;