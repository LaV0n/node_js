import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {addressRouter} from "./routes/address-router";
import { runDb } from './repositories/db';
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser())

app.get('/', (req:Request, res:Response) => {
    res.send('Hello server')
})

app.use('/products',productsRouter)

app.use('/addresses',addressRouter)


const startApp =async ()=>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()