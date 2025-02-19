const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')


class ProductsService {

    constructor(){
        this.products = [];
        this.generate();
    }

    async generate(){
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
            id: faker.string.uuid(),
            name: faker.commerce.productName(), 
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.url(),
            isBlock: faker.datatype.boolean()
            });
        };
    }

    async create(body) {
        if (!body) {
            return {message: 'No se han enviado datos.'}
        }

        const data = {id: faker.seed().toString(), ...body};

        this.products.push(
            data
        )
        return {
            message: 'created',
            data: data
        }
    }

    async find(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products);
            }, 5000);
        })
        // return this.products;
    }

    async findOne(id){
      const product =  this.products.find(item => item.id === id);
      if(!product) throw boom.notFound('Product not found');
      if(product.isBlock) throw boom.conflict('Product is block');
      return product
    }

    async update(id, body) {
        const product = this.products.find(p => p.id === id);
    
        if (!product) throw boom.notFound('Product not found');
    
        Object.assign(product, body); // Actualiza todas las propiedades del producto
    
        return {
            message: 'Updated successfully',
            data: product,
            id
        };
    }
    

    async delete(id) {
        const index = this.products.findIndex(product => product.id === id);
    
        if (index === -1) throw boom.notFound('Product not found');;
    
        const deletedProduct = this.products.splice(index, 1)[0]; // Elimina el producto en la posición `index`
    
        return {
            message: 'Deleted successfully',
            data: deletedProduct
        };
    }
    

}

module.exports = ProductsService; 
