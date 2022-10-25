let products = [
    {id: 1, title: 'bread'},
    {id: 2, title: 'milk'}
]

export const ProductsRepository = {
    findTitle(title: string | null | undefined) {
        if (title) {
           return  products.filter(p => p.title.includes(title))
        }else {
           return  products
        }
    },
    createProduct(title:string){
        const newProduct={
            id:+(new Date()),
            title:title
        }
        products.push(newProduct)
       return newProduct
    },
    getProductById(id:number){
        return products.find(p=>p.id===id)
    },
    updateProductTitle(id:number,title:string){
        const product=products.find(p=>p.id===id)
        if(product) {
            product.title = title
            return product
        }
    },
    deleteProduct(id:number){
        const product=products.find(p=>p.id===id)
        if (product){
            products=products.filter(p=>p.id!==id)
           return true
        } else {
            return false
        }
    }
}