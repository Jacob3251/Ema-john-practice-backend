const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
// The line below is a must for loading environment variables.
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB below

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@emajhon0.g18z2zu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log("db connected");
    const productCollection = client.db("emaJohn").collection("product");
    // making apis
    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query, {});
      const products = await cursor.limit(10).toArray();
      res.send(products);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("John is running and waiting for Ema");
});

app.listen(port, () => {
  console.log("John is waiting for Ema on ", port);
});
