import {MongoClient, ServerApiVersion} from "mongodb";

// Helper for connecting to the MongoDB database


const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB 

const client = new MongoClient(uri, {
  serverApi:{
    version:ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,

  },
});

export async function getDB(){
  await client.connect();
  return client.db(dbName)
}