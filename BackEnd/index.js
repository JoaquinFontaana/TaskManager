import {connectionWithRetrys} from "./database/connectionWithRetrys.js"
import express from "express"
import cors from "cors"
import dotenv from 'dotenv'

if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

console.log("App iniciada")

//Conexion a la db
connectionWithRetrys()

//Creación del servidor
const App = express()
const port = process.env.PORT || 3900

//Configurar cors
App.use(cors())

App.use(express.json())
App.use(express.urlencoded({extended: true}))

//Cargar rutas
import UserRoutes from "./routes/user.js"
import TaskRoutes from "./routes/task.js"

App.use("/api/user",UserRoutes)

App.use("/api/task",TaskRoutes)

App.listen(port, () =>{
    console.log(`Servidor escuchando el puerto:${port}`)
})