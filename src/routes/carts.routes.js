import { Router } from "express";
import { cartService, productService} from "../dao/index.js";

const router = Router();

router.post("/", async (req,res)=>{
    try {
        const cartCreated = await cartService.save();
        res.json({status:"success", data:cartCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.get("/:cid", (req,res)=>{})

router.post("/:cid/product/:pid", async(req,res)=>{})

export {router as cartsRouter}