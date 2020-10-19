import React, { useState } from 'react'
import Task from './Task'
import TasksForm from './TasksForm'
import classes from './TasksList.module.css';
function TasksList() {

    const [tasks, setTasks] = useState([])

    const addTask = task => {
        if (!task.text || /^\s*$/.test(task.text)) {
            return
        }

        const newTasks = [task, ...tasks]
        setTasks(newTasks);

    }

    const completeTask = id => {
        let updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.isComplete = !task.isComplete
            }
            return task;
        })
        setTasks(updatedTasks);
    }

    const removeTask = id => {
        const removeArr = [...tasks].filter(task => task.id !== id)

        setTasks(removeArr);
    }

    const updateTask = (taskId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }
        setTasks(prev => prev.map(item => (item.id === taskId ? newValue : item)))
    }

    return (
        <div className={classes.TaskList}>
            <h1>Set the tasks for today!</h1>
            <TasksForm onSubmit={addTask} />
            <Task
                tasks={tasks}
                completeTask={completeTask}
                removeTask={removeTask}
                updateTask={updateTask} />
        </div>
    )
}

export default TasksList
