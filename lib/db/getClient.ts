import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB_NAME = process.env.MONGODB_DB_NAME;

export default async function getClient() {
  if (!MONGO_URI) throw new Error("No MONGO_URI in env.");
  if (!MONGO_DB_NAME) throw new Error("No MONGO_DB_NAME in env.");

  const client = new MongoClient(MONGO_URI);
  const db = client.db(MONGO_DB_NAME);

  return { client, db };
}
