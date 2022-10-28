import {MongoClient} from "mongodb";
import { ProductsType } from "./product-db-repository";

const mongoUri=process.env.mongoURI || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority"

const client =new MongoClient(mongoUri)

const db = client.db("shop");

export const productsCollection = db.collection<ProductsType>('products');

export async function runDb(){
    try {
        await client.connect();
        await client.db("products").command({ping:1})
        console.log("success connect")
    } catch {
        await client.close()
    }
}