import { useEffect, useState } from 'react'
import { TaskForm } from "./components/TaskForm"
import { TaskList } from './components/TaskList';
import Header from '../../components/Header';
import useTasks from './hooks/useTasks';
import UseModal from './hooks/useModal';
import useGet from './hooks/useGet';
import { Navigate } from 'react-router-dom';
import Notification from './components/Notification';

function TaskManager() {

  const { tasks, addTasks, deleteTask, updateTask, searchTasks, filteredTasks ,notification } = useTasks()
  let additionalClassName = "";
  let notificationMessage = "";

  if (notification) {
    const { ok, message} = notification;
    additionalClassName = ok ? "success" : "failure";
    notificationMessage = message;
  }
  const { modalVisible, toogleModal } = UseModal()
  const { getDataFetch } = useGet()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        const url = "http://localhost:3100/api/user/checkToken"
        const response = await getDataFetch(url)
        if (response && response.ok === false) {
          localStorage.removeItem("token")
          setRedirect(true)
        }
      })()
    }
    else {
      setRedirect(true)
    }
  }, [])
  
  return (
    <div className='pageContainer taskManager'>
      {notification && <Notification message={notificationMessage} additionalClassName={additionalClassName} />}
      {redirect && <Navigate to="/login" />}
      {modalVisible && <div className="modal"></div>}
      <Header searchBar={true} logout={true} searchTasks={searchTasks} tasks={tasks}></Header>
      <main>
        <TaskForm onAddTasks={addTasks}></TaskForm>
        <TaskList tasks={filteredTasks ? filteredTasks : tasks} onDeleteTask={deleteTask} updateTask={updateTask} toogleModal={toogleModal}></TaskList>
      </main>
    </div>
  )
}

export default TaskManager
