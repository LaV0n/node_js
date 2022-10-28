import {Request, Response, Router} from "express";
import {ProductsRepository} from "../repositories/product-db-repository";
import {body} from "express-validator";
import {InputValidationMiddleware} from "../middleware/inputValidationMiddleware";

export const productsRouter=Router()

const titleValidator=body('title').trim()
    .isLength({min:3,max:10}).withMessage('Wrong title length')

productsRouter.get('/', async (req:Request, res:Response) => {
   const product= await ProductsRepository.findTitle(req.query.title?.toString())
    res.send(product)
})

productsRouter.post('/',
    titleValidator,
    InputValidationMiddleware,
    async (req:Request, res:Response) => {
    const newProduct= await ProductsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.get('/:id', async (req:Request, res:Response) => {
    const product= await ProductsRepository.getProductById(+req.params.id)
    if (product){
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.put('/:id',
    titleValidator,
    InputValidationMiddleware,
    async (req:Request, res:Response) => {
    const product= await ProductsRepository.updateProductTitle(+req.params.id,req.body.title)
    if (product){
        res.send(await ProductsRepository.getProductById(+req.params.id))
    } else {
        res.send(404)
    }
})

productsRouter.delete('/:id', async (req:Request, res:Response) => {
    const isDeleted=await ProductsRepository.deleteProduct(+req.params.id)
    if (isDeleted){
        res.send(204)
    } else {
        res.send(404)
    }
})