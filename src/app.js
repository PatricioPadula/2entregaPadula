import express from "express";
import {engine} from "express-handlebars"
import { __dirname } from "./utils.js";
import path from "path";
import {Server} from "socket.io";


import { productsRouter } from "./routes/product.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";

const port = 8080;
const app = express();

//configuración de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));


const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));



//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter);

//creación del servidor de websocket
const socketServer = new Server(httpServer);

//canal de comunicación
socketServer.on("connection", (socketConnected)=>{
    socketConnected.on("messageKey", (data)=>{
        console.log(data);
    })
});

/* socketServer.on("connection",(socketConnected)=>{
    console.log(`Nuevo cliente conectado ${socketConnected.id}`);

    //recibir eventos del socket del cliente conectado
    socketConnected.on("messageEvent",(data)=>{
        console.log(`datos recibidos del cliente: ${data}`);
    })

    
    setTimeout(()=>{
        //enviar datos del socket servidor al socket cliente
        socketConnected.emit("eventoIndividual", `Bienvenido ${socketConnected.id}`);

        //enviar datos a todos los clientes conectados, menos al cliente actual
        socketConnected.broadcast.emit("eventoTodosMenosActual", "mensaje para todos los clientes menos el actual");

        //enviar datos a todos los clientes 
        socketServer.emit("eventoParaTodos","nueva promoción");
    },4000)

}); */
