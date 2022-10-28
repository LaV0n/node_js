import { productsCollection} from "./db";

export type ProductsType = {
    id: number,
    title: string
}

export const ProductsRepository = {
    async findTitle(title: string | null | undefined): Promise<ProductsType[]> {
        const filter:any={}
        if (title) {
            filter.title={$regex:title}
        }
            return productsCollection.find(filter).toArray()                //from shop->products find all with title adn transform to arr

    },
    async createProduct(title: string): Promise<ProductsType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async getProductById(id: number): Promise<ProductsType | null> {
        const product = await productsCollection.findOne({id})
        if (product) {
            return product
        } else {
            return null
        }
    },
    async updateProductTitle(id: number, title: string): Promise<boolean> {
        const result=await productsCollection.updateOne({id},{$set:{title}})
        return result.matchedCount ===1
    },
    async deleteProduct(id: number): Promise<boolean> {
      const result=await productsCollection.deleteOne({id})
        return result.deletedCount===1
    }
}