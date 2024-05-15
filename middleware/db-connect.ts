// middleware/db-connects.ts

const mongoose = require('mongoose');

//DB 접속 url
const url:string = process.env.urlPW||"";
//접속 옵션
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true} };

export default async function dbConnect() {
  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  await mongoose.connect(url, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

}