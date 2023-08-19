import { cartsModel } from "../models/carts.model.js";

export class CartManagerMongo{
    constructor(){
        this.model = cartsModel;
    };

    async getAll(){
        try {
            const carts = await this.model.find();
            return carts;
        } catch (error) {
            throw error;
        }
    };

    async save(){
        try {
            const cartCreated = await this.model.create({});
            return cartCreated;       
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        //devuelve el producto que cumple con el id recibido
        try {
            const cartId = await this.model.findById(id);
            return cartId;
        } catch (error) {
            console.log(error.message);
            throw new Error(`Hubo un error al encontrar el carrito`);
        }
    }

    async update(id, info){
        try {
            const content = await this.model.find();
            const cartId = content.find(e => e.id == id);

            cartId.products = info.products;

            await this.model.create(content);

            return cartId;
        } catch (error) {
            throw error;
        }
    }
    
}

