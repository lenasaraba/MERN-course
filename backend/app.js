// Uvozimo Express modul koji omogućava jednostavno pravljenje web servera
const express = require("express");

// Inicijalizujemo Express aplikaciju
const app = express();

//za logovanje zahtjeva
const morgan = require("morgan");

//importovanje mongoose za rad sa MongoDB
const mongoose = require("mongoose");

//CORS
const cors = require("cors");

//za enviroment variables (u fajlu .env)
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
//prije svega ovo
app.use(cors());
//* dozovljava sve http zahtjeve
// app.options("*", cors());

//dodavanje midlvera
//koristiti express.json iako negdje u lekciji vidim bodyparser
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
//za razliku od authJwt() ova se poziva bez zagrada, jer error handler predstavlja jednu gotovu funkciju, a authJwt je funkcija koja dodatno vraca funkciju
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;
//ruteri

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: "eshop-database",
  })

  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//kad se pokrene uspjesno, slijedi dio nakon broja porta
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
