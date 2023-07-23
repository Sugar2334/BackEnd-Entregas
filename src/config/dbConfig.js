import mongoose from 'mongoose'
import config from './config.js';


const URI = config.mongoUrl;


mongoose.set("strictQuery", true);
mongoose.connect(URI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado a MongoDB");
  }
});