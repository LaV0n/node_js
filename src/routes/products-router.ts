import {Request, Response, Router} from "express";

let products=[
    {id:1, title:'bread'},
    {id:2, title: 'milk'}
]

export const productsRouter=Router()

productsRouter.get('/', (req:Request, res:Response) => {
    if(req.query.title){
        let searchTitle=req.query.title.toString()
        res.send(products.filter(p=>p.title.includes(searchTitle)))
    }else {
        res.send(products)
    }
})

productsRouter.post('/', (req:Request, res:Response) => {
    const newProduct={
        id:+(new Date()),
        title:req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})

productsRouter.get('/:id', (req:Request, res:Response) => {
    const product=products.find(p=>p.id===+req.params.id)
    if (product){
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.put('/:id', (req:Request, res:Response) => {
    const product=products.find(p=>p.id===+req.params.id)
    if (product){
        product.title=req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.delete('/:id', (req:Request, res:Response) => {
    const product=products.find(p=>p.id===+req.params.id)
    if (product){
        products=products.filter(p=>p.id!==+req.params.id)
        res.send(204)
    } else {
        res.send(404)
    }
})