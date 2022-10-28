let products = [
    {id: 1, title: 'bread'},
    {id: 2, title: 'milk'}
]
type ProductsType={
    id:number,
    title:string
}

export const ProductsRepository = {
    async findTitle(title: string | null | undefined):Promise<ProductsType[]> {
        if (title) {
           return  products.filter(p => p.title.includes(title))
        }else {
           return  products
        }
    },
    async createProduct(title:string):Promise<ProductsType> {
        const newProduct={
            id:+(new Date()),
            title:title
        }
        products.push(newProduct)
       return newProduct
    },
    async getProductById(id:number):Promise<ProductsType | undefined> {
        return products.find(p=>p.id===id)
    },
    async updateProductTitle(id:number,title:string):Promise<ProductsType | undefined> {
        const product=products.find(p=>p.id===id)
        if(product) {
            product.title = title
            return product
        }
    },
    async deleteProduct(id:number):Promise<boolean> {
        const product=products.find(p=>p.id===id)
        if (product){
            products=products.filter(p=>p.id!==id)
           return true
        } else {
            return false
        }
    }
}