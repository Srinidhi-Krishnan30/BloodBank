const express = require("express");
const bloodBankRoutes = require("routes/routes.js");
const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use("/api",bloodBankRoutes);
app.listen(PORT,() =>{
    console.log("Server Running ... ");
}); 