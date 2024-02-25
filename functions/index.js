const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) => {
  const { total } = request.query;

  // Corrected method name to stripe.paymentIntents.create
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "eur",
  });

  // Corrected typo in response object
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
