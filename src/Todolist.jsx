import React, { useState } from "react"


function Todolist(){

    const[tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function letwrite(event){
        setNewTask(event.target.value)
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask])
            setNewTask("")
        }

    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_,i) => i !== index)
        setTasks(updatedTasks);
    }

    function moveUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = 
            [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = 
            [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }


    return(
    <div className="todolist">
        <h1> To-Do-List </h1>
        <div>
            <input
                type="text"
                placeholder= "Task goes here"
                value={newTask}
                onChange={letwrite}/>
            <button
                className="Add-button"
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) =>
                <li key = {index}>
                    <span className="task-number">{index + 1}.</span>
                    <span className="text">{task}</span>
                    <button
                    className="delete-button"
                    onClick= {() => deleteTask(index)}>
                        DEL
                    </button>
                    <button
                    className="move-up"
                    onClick= {() => moveUp(index)}>
                        UP
                    </button>
                    <button
                    className="move-down"
                    onClick= {() => moveDown(index)}>
                        DOWN
                    </button>
                </li> 
            )}

        </ol>

    </div>
    )
}

export default Todolist