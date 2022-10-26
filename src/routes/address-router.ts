import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/address-repository";
import {header} from "express-validator";

export const addressRouter=Router()

addressRouter.get('/',
    (req:Request, res:Response) => {
    const addresses=addressesRepository.getAddresses()
    res.send(addresses)
})

addressRouter.get('/:id', (req:Request, res:Response) => {
    const address=addressesRepository.getAddressByID(+req.params.id)
    if(address){
        res.send(address)
    }else {
        res.send(404)
    }
})