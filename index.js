const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB server");

    const shopifyCustomersCollection = client
      .db("RQ_Analytics")
      .collection("shopifyCustomers");

    const shopifyProductsCollection = client
      .db("RQ_Analytics")
      .collection("shopifyProducts");

    const shopifyOrdersCollection = client
      .db("RQ_Analytics")
      .collection("shopifyOrders");

    // customers
    app.get("/customers", async (req, res) => {
      const cursor = shopifyCustomersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // products
    app.get("/products", async (req, res) => {
      const cursor = shopifyProductsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // orders
    app.get("/orders", async (req, res) => {
      const cursor = shopifyOrdersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("rapidquest server running");
});

app.listen(port, () => {
  console.log(`rapidquest running on port ${port}`);
});
