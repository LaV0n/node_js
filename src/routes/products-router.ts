import {Request, Response, Router} from "express";
import {ProductsRepository} from "../repositories/product-repository";



export const productsRouter=Router()

productsRouter.get('/', (req:Request, res:Response) => {
   const product=ProductsRepository.findTitle(req.query.title?.toString())
    res.send(product)
})

productsRouter.post('/', (req:Request, res:Response) => {
    const newProduct=ProductsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.get('/:id', (req:Request, res:Response) => {
    const product=ProductsRepository.getProductById(+req.params.id)
    if (product){
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.put('/:id', (req:Request, res:Response) => {
    const product=ProductsRepository.updateProductTitle(+req.params.id,req.body.title)
    if (product){
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.delete('/:id', (req:Request, res:Response) => {
    const isDeleted=ProductsRepository.deleteProduct(+req.params.id)
    if (isDeleted){
        res.send(204)
    } else {
        res.send(404)
    }
})