const express = require("express");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.aaflc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect()
    console.log("Connected to MongoDB server");
    const database = client.db("RQ_Analytics database").collection('shopifyCustomers');


    app.get('/customers', async(req,res)=> {
        const cursor = database.find();
        const result = await cursor.toArray();
        res.send(result)
    })

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("rapidquest server running");
});

app.listen(port, () => {
  console.log(`rapidquest running on port ${port}`);
});
