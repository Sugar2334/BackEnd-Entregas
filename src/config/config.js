import 'dotenv/config'

const config = {
  rail: process.env.RAIL_URI,
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URI,
  filesPath: process.env.FILES_PATH ,
  secretJwt: process.env.SECRET_JWT ,
  nodemailerMail: process.env.NODEMAILER_MAIL,
  nodemailerPass: process.env.NODEMAILER_PASS
};

export default config;