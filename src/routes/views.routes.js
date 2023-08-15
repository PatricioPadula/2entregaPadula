import { Router } from "express";
import { productService} from "../dao/index.js"

const router = Router();

router.get("/",(req,res)=>{
    res.render("home");
});

router.get("/products", async(req,res)=>{
    try {
        const {limit=10,page=1,stock,sort="asc"} = req.query;
        /* console.log(limit,page,stock,sort); */
        const stockValue = stock === 0 ? undefined : parseInt(stock);
        if(!["asc","desc"].includes(sort)){
            return res.render("products",{error:"orden no válido"})
        }
        const sortValue = sort === "asc" ? 1 : -1;
        let query = {};
        if(stockValue){
            query = {stock:{$gte:stockValue}}
        }
        const result = await productService.getWithPaginate(query, {
            page,
            limit,
            sort:{price:sortValue},
            lean: true
        });
        /* console.log(result); */
        const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
        const resultProductsView = {
            status:"success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null
        }
        console.log(resultProductsView);
        res.render("products");
    } catch (error) {
        res.render("products",{error:"No es posible visualizar los datos"});
    }
});

export {router as viewsRouter};
