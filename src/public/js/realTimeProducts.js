const socketClient = io(); //instanciando socket del lado del cliente

//enviar un evento hacia el servidor
/* socketClient.emit("messageEvent", "Hola desde el cliente");

//recibir un evento desde el socket del servidor
socketClient.on("eventoIndividual", (dataServer)=>{
    console.log(`datos recibidos del servidor: ${dataServer}`);
})

socketClient.on("eventoTodosMenosActual", (data)=>{
    console.log(`datos para todos: ${data}`);
})

socketClient.on("eventoParaTodos", (data)=>{
    console.log(data);
}) */


const producto = document.getElementById("producto");
const sendButton = document.getElementById("sendButton");

sendButton.addEventListener("click", ()=>{
    console.log(producto.value);
    socketClient.emit("messageKey", producto.value);
    producto.value="";
})