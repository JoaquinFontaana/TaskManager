/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from "../../../components/Button"
import { RxCross2 } from "react-icons/rx"
import { FaRegTrashCan } from "react-icons/fa6"

export function TaskItem({ task, onDeleteTask, updateTask, toogleModal }) {

    const [titleValue, setTitleValue] = useState(task.title);
    const [textValue, setTextValue] = useState(task.text)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const [completed, setCompleted] = useState(task.completed)
    const id = task._id

    let fechaObjeto = new Date(task.createdAt);
    let dia = fechaObjeto.getUTCDate();
    let mes = fechaObjeto.getUTCMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
    let anio = fechaObjeto.getUTCFullYear()

    let fechaFormateada = `${dia}/${mes}/${anio}`

    function handleNoteClick() {
        if (!isExpanded) {
            setIsExpanded(!isExpanded)
            toogleModal(true)
        }
    }

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    }

    const handleTextChange = (e) => {
        setTextValue(e.target.value)
    }

    const handleClickDelete = (e) => {
        e.preventDefault();
        e.stopPropagation()
        onDeleteTask(id);
        setIsExpanded(false)
        toogleModal(false)
    }

    const handleCloseClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsExpanded(!isExpanded)
        updateTask({ title: titleValue, text: textValue, _id: id })
        toogleModal(false)
        console.log(task)
    }
    const handleHover = () => {
        setIsHover(!isHover)
    }

    async function toggleCompleted(e) {
        e.preventDefault();
        e.stopPropagation();

        const newCompleted = !completed;

        if (completed !== newCompleted) {
            setCompleted(newCompleted);
            updateTask({ _id: id, completed: newCompleted });
        }
    }
    
return (
    <div className={`taskItem ${isExpanded ? 'expanded' : ''}`} onClick={handleNoteClick} onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <header className='taskItem-header'>
            <input className='taskItem-title' type="text" value={titleValue} onChange={handleTitleChange} placeholder='Title' />
            {isExpanded && <Button handleClick={handleCloseClick} type="closeNote">{<RxCross2 />}</Button>}
        </header>
        <textarea
            className="taskItem-text"
            rows={7}
            placeholder='Text...'
            value={textValue}
            onChange={handleTextChange}
        />
        <footer className='taskItem-footer'>
            <div className='taskItem-info'>
                <span>{fechaFormateada}</span>
                <Button handleClick={toggleCompleted} type={`completed ${completed ? "Completed" : "Pending"}`} >{completed ? "Completed" : "Pending"}</Button>
            </div>
            <div className='taskItem-options' >
                <Button handleClick={handleClickDelete} type="option">{<FaRegTrashCan />}</Button>
            </div>
        </footer>
    </div>
)
}
