import { config } from "../config/config.js"
import {ProductManager} from "./filesystem/productManager.js"
import {CartManager} from "./filesystem/cartManager.js"
import { ProductManagerMongo } from "./mongo/productManagerMongo.js";
import { CartManagerMongo } from "./mongo/cartManagerMongo.js";
import {connectDB} from "../config/dbConnection.js"


/* const productService = new ProductManager(config.fileSystem.productsFile);
const cartService = new CartManager(config.fileSystem.cartFile);
 */

connectDB();
const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo();

export {productService, cartService}