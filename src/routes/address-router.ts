import {Request, Response, Router} from "express";

const addresses=[
    {id:1,street:'nowa'},
    {id:2,street: 'old'}
]

export const addressRouter=Router()

addressRouter.get('/', (req:Request, res:Response) => {
    res.send(addresses)
})

addressRouter.get('/:id', (req:Request, res:Response) => {
    const address=addresses.find(a=>a.id===+req.params.id)
    if(address){
        res.send(address)
    }else {
        res.send(404)
    }
})