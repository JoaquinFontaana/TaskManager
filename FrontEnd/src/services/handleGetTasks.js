export async function handleGetTasks (getData,url) {
        const response = await getData(url)
        if(response && response.ok === true){
            return response.tasks
        }
        console.error("Error al obtener tareas")
        return null
    }
