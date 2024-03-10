import Task from "../models/Task.js";
import mongoose from "mongoose";
const taskHandlers = {
    getUserTasks: async (req, res) => {
        try {
            const userTasks = await Task.find({ user_id: req.user._id })
            return res.status(200).json({
                tasks: userTasks,
                ok: true
            })
        }
        catch (error) {
            return res.status(500).json(
                {
                    message: "Ha ocurrido un error",
                    ok: false
                }
            )
        }
    },
    createTask: async (req, res) => {
        try {
            const { text, title } = req.body
            if (!title) {
                return res.status(400).json(
                    {
                        message: "La nota debe tener un titulo",
                        ok: false
                    }
                )
            }
            const taskCreated = await Task.create({ title: title, user_id: req.user._id, text: text })
            return res.status(200).json(
                {
                    message: 'Tarea creada con exito',
                    ok: true
                }
            )
        }
        catch (error) {
            res.send(500).json(
                {
                    message: 'Ha ocurrido un error. No se ha creado la tarea',
                    ok: false
                }
            )
        }
    },
    updateTask: async (req, res) => {
        try {
            const { text, title, labels, completed, _id } = req.body
            if (!_id) {
                return res.status(400).json(
                    {
                        message: 'El id es necesario para actualizar la tarea',
                        ok: false
                    }
                )
            }
            const TaskUpdated = await Task.findByIdAndUpdate(_id, { title: title, text: text, labels: labels, completed: completed })
            if (TaskUpdated) {
                console.log(title,text,labels,completed)
                if (completed !== undefined) {
                    return res.status(200).json(
                        {
                            message: 'Estado actualizado con exito',
                            ok: true
                        }
                    )
                }
                return res.status(200).json(
                    {
                        message: 'Tarea actualizada con exito',
                        ok: true
                    }
                )
            }

        } catch (error) {
            res.status(400).send(
                {
                    message: "Ha ocurrido un error. Vuelve a intentarlo en un momento",
                    ok: false
                }
            )
        }
    },
    deleteTask: async (req, res) => {
        try {
            const id = req.params.id
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json(
                    {
                        message: "El id de la tarea no es valido",
                        ok: false
                    }
                )
            }
            const taskDeleted = await Task.findByIdAndDelete(id)
            if (!taskDeleted) {
                return res.status(500).json(
                    {
                        message: "Ha ocurrido un error al eliminar la tarea. Vuelva a intentar más tarde",
                        ok: false
                    }
                )
            }
            return res.status(200).json(
                {
                    message: "Tarea eliminada con exito",
                    ok: true
                }
            )
        } catch (error) {
            console.error(error)
            return res.status(500).json(
                {
                    message: "Ha ocurrido un error. Vuelve a interarlo más tarde",
                    ok: false
                }
            )
        }
    }
}
export default taskHandlers
