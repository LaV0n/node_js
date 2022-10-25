import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
const app = express()
const port = process.env.PORT || 3000

let products=[
    {id:1, title:'bread'},
    {id:2, title: 'milk'}
]
const addresses=[
    {id:1,street:'nowa'},
    {id:2,street: 'old'}
]

app.use(bodyParser())

app.get('/', (req:Request, res:Response) => {
    res.send('Hello server')
})

app.get('/products', (req:Request, res:Response) => {
    if(req.query.title){
        let searchTitle=req.query.title.toString()
        res.send(products.filter(p=>p.title.includes(searchTitle)))
    }else {
        res.send(products)
    }
})

app.post('/products', (req:Request, res:Response) => {
   const newProduct={
       id:+(new Date()),
       title:req.body.title
   }
   products.push(newProduct)
    res.status(201).send(newProduct)
})

app.get('/products/:id', (req:Request, res:Response) => {
    const product=products.find(p=>p.id===+req.params.id)
    if (product){
        res.send(product)
    } else {
        res.send(404)
    }
})

app.put('/products/:id', (req:Request, res:Response) => {
    const product=products.find(p=>p.id===+req.params.id)
    if (product){
        product.title=req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
})

app.delete('/products/:id', (req:Request, res:Response) => {
    const product=products.find(p=>p.id===+req.params.id)
    if (product){
        products=products.filter(p=>p.id!==+req.params.id)
        res.send(204)
    } else {
        res.send(404)
    }
})

app.get('/addresses', (req:Request, res:Response) => {
    res.send(addresses)
})

app.get('/addresses/:id', (req:Request, res:Response) => {
    const address=addresses.find(a=>a.id===+req.params.id)
    if(address){
        res.send(address)
    }else {
        res.send(404)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})