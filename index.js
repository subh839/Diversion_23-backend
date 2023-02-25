import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./routes/Admin.js";
//

import paymentRoutes from "./routes/payment.js";

//
import pemRoutes from "./routes/worker.js";
import customerRoutes from "./routes/customer.js";
import shopRoutes from "./routes/shop.js";

// Morgan part--
import morgan from "morgan";

// swagger part -- 
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger.js"

// SMS Imports
import twilio from "twilio";
const accountSid = "ACd02f7be89072c1e407de5ff29cab9d1f";
const authToken = "48104a127badd4b442770560a85dd4cd";
const client = new twilio(accountSid, authToken);
// Payment Imports
import dotenv from "dotenv";
dotenv.config();

// creating app
const app = express();

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Backend setup");
});

//Routes

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use("/pem", pemRoutes);
app.use("/customer", customerRoutes);
app.use("/shop", shopRoutes);
app.use("/admin", adminRouter);
app.use("/payment", paymentRoutes);

//


app.get("/send-text", (req, res) => {
  const { recipient, lat, lon, customer } = req.query;

  //Send Text
  client.messages
    .create({
      body: `Greetings ! name of customer ${customer}. location:  https://gps-coordinates.org/my-location.php?lat=${lat}&lng=${lon}, please visit our website for further details`,
      to: "+919330451798", // Text this number
      from: "+12708173542", // From a valid Twilio number
    })
    .then((message) => console.log(message.body))
    .catch((error) => console.log(error.message));
});

const CONNECTION_URL =
"mongodb+srv://worker:lXMcCnzLWjHrLWaL@vchat.i3f2sus.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

// connecting mongoDB to server
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT} *=*`))
  )
  .catch((error) => console.log(error.message));
