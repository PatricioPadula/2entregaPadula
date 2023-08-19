import { Router } from "express";
import { cartService, productService} from "../dao/index.js";

const router = Router();

router.get("/", async(req,res) =>{
    try {
        const cart = await cartService.getAll();
        res.json({status:"success", data:cart})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/", async (req,res)=>{
    try {
        const cartCreated = await cartService.save();
        res.json({status:"success", data:cartCreated ,message:"carrito creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.get("/:cid", async (req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getById(cartId);
        if(cart){
            res.json({status:"success", data:cart ,message:"carrito encontrado"})
        }else{
            res.json({status:"error", message:`El carrito con id:${cid} no existe`});
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const cart = await cartService.getById(cartId);
        if(cart){
            let cartProducts = cart.products;

            let prod = cartProducts.find(e => {return e.product === productId});

            if(prod != undefined){
                prod.quantity++;
            }else{
                const newProd = {
                    product: productId,
                    quantity: 1
                }
                cart.products.push(newProd);
            }

            cartService.update(cartId, cart);
            res.json({status:"success", data: cart});

        }else{
            res.json({status:"error", message: `El carrito ${cid} no existe.`});
        }

    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

export {router as cartsRouter}