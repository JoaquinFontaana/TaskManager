import useGet from "./useGet";
import { handleGetTasks } from "../../../services/handleGetTasks";
import { useState, useEffect } from "react";
import useCreate from "./useCreate";
import useDeleteTask from "./useDeleteTask";
import useUpdate from "./useUpdate";
export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [notification, setNotification] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState(false)

    const { getDataFetch} = useGet();
    const { createTaskFetch} = useCreate();
    const { deleteTaskFetch} = useDeleteTask();
    const { updateFetch} = useUpdate()
    const urlGetUserTasks = "http://localhost:3100/api/task/getUserTasks";

    useEffect(() => {
        (async () => {
            const response = await handleGetTasks(getDataFetch, urlGetUserTasks);
            if (response !== null) {
                setTasks(response);
            }
        })();
    }, []);

    const handleNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 1500);
    };

    const addTasks = async (taskInfo) => {
        const createTaskUrl = "http://localhost:3100/api/task/create";
        const responseCreate = await createTaskFetch(createTaskUrl, taskInfo);

        if (responseCreate && responseCreate.ok) {
            const responseGet = await handleGetTasks(getDataFetch, urlGetUserTasks);

            if (responseGet !== null) {
                setTasks(responseGet);
                handleNotification({
                    message: responseCreate.message,
                    ok: true
                })
                console.log(filteredTasks)
            }
        }
        else {
            handleNotification(
                {
                    message: responseCreate.message,
                    ok: false
                })
        }
    };

    const deleteTask = async (id) => {
        const urlDeleteTask = "http://localhost:3100/api/task/delete";
        const responseDelete = await deleteTaskFetch(urlDeleteTask, id);

        if (responseDelete && responseDelete.ok) {
            const responseGet = await handleGetTasks(getDataFetch, urlGetUserTasks);

            if (responseGet !== null) {
                setTasks(responseGet);
                handleNotification({
                    message: responseDelete.message,
                    ok: true
                })
            }
        }

        else {
            handleNotification({
                message: responseDelete.message,
                ok: false
            })
        }
    };

    const updateTask = async (taskInfo) => {
        (async () => {
            const urlUpdateTask = "http://localhost:3100/api/task/update"

            const responseUpdate = await updateFetch(urlUpdateTask, taskInfo);
            if (responseUpdate && responseUpdate.ok) {
                handleNotification({
                    message: responseUpdate.message,
                    ok: true
                })
            }
            else {
                handleNotification({
                    message: responseUpdate.message,
                    ok: false
                })
            }
        })();
    };

    const searchTasks = (searchTerm) => {
        const filtered = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(filtered)
    };  
/*
    const errors = {
        createTaskError: createTaskError,
        getTasksError: getTasksError,
        deleteTaskError: deleteTaskError,
    };

    const loadings = {
        createTaskLoading: createTaskLoading,
        getTasksLoading: getTasksLoading,
        deleteTaskLoading: deleteTaskLoading,
    };
*/
    return { addTasks, deleteTask, tasks, updateTask,notification, searchTasks, filteredTasks};
}
