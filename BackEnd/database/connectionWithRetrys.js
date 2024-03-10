import mongoose from "mongoose";

const url = "mongodb://localhost:27017/TaskManager"

async function connectionWithRetrys (retrys = 4) {
    try {
        console.log("Intentando establecer conexion")
        await mongoose.connect(url)
        console.log("Conectado a la base de datos exitosamente")
    } catch (error) {
        console.error(error)
        if(retrys >0){
            setTimeout(() => {
                throw new Error("Error en la conexión. Reintentando en 5 segundos")
            }, 5000);
        }
        else{
            throw new Error("No ha sido posible establecer conexion")
        }
    }
}

export {connectionWithRetrys}