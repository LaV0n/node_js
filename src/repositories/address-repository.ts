const addresses=[
    {id:1,street:'nowa'},
    {id:2,street: 'old'}
]

export const addressesRepository={
    getAddresses(){
        return addresses
    },
    getAddressByID(id:number) {
        const address = addresses.find(a => a.id === id)
        return address
    }
}