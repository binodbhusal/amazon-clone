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

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "eur",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
