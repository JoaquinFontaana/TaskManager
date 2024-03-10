import { Schema, model } from 'mongoose'

const TaskSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
    user_id:{
        type:String,
        required:true
    },
    labels: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = model('Task',TaskSchema)

export default Task