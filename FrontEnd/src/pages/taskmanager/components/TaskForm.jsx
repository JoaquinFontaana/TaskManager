import { useState, useEffect, useRef } from "react"
import { Button } from "../../../components/Button"
import { BsCheckLg } from "react-icons/bs";

export function TaskForm({ onAddTasks }) {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskText, setTaskText] = useState('')
    const [formClicked, setFormClicked] = useState(false)
    const formRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                // Si el clic ocurrió fuera del formulario, manejar el evento aquí
                setFormClicked(false);
            }
        };

        // Agregar el event listener al documento cuando el componente se monta
        document.addEventListener('click', handleClickOutside);

        // Remover el event listener cuando el componente se desmonta
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    const handleClickCreate = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (taskTitle.length > 0) {
            const taskInfo = {
                title: taskTitle,
                text: taskText
            }
            onAddTasks(taskInfo)
            setTaskTitle('')
            setTaskText('')
            setFormClicked(false)
        }
    }
    const handleClickForm = (e) => {
        e.preventDefault()
        setFormClicked(true)
    }
    return (
        <form
            ref={formRef} onClick={handleClickForm} className={`createTask-form ${setFormClicked ? 'formClicked' : ''}`}>
            <header className="taskItem-header">

                <input className={`${setFormClicked ? 'form-input taskItem-title' : 'form-input'}`}
                    type="text"
                    placeholder="Create new task"
                    onChange={(e) => setTaskTitle(e.target.value)}
                    value={taskTitle} />

                <Button type="Create" handleClick={handleClickCreate}>{<BsCheckLg />}</Button>
            </header>
            {formClicked && <textarea
                className="taskItem-text form-input"
                rows={5} // Número de filas que deseas mostrar
                placeholder='Text...'
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
            />}
        </form>
    )
}