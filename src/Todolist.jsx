import React, { useState } from "react"


function Todolist(){

    const[tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [timeOfTask, setTimeOfTask] = useState("");

    function letwritetask(event){
        setNewTask(event.target.value)
    }
    function letwritetime(event){
        setTimeOfTask(event.target.value)
    }

    function addTask(){
        if(newTask.trim() !== "" && timeOfTask !== ""){
            const taskObj = {
                time: timeOfTask,
                text: newTask,
                completed: false
            }
            const updatedTasks = [...tasks, taskObj];

            if(updatedTasks.length > 0){
                for(let i = 0; i < updatedTasks.length - 1; i++){
                    for(let j = 0; j < updatedTasks.length - i - 1; j++){
                        if(updatedTasks[j].time > updatedTasks[j + 1].time){
                            const temp = updatedTasks[j];
                            updatedTasks[j] = updatedTasks[j + 1];
                            updatedTasks[j + 1] = temp;
                        }
                    }
                }
            }

            setTasks(updatedTasks)
            setNewTask("")
            setTimeOfTask("")
        }

    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_,i) => i !== index)
        setTasks(updatedTasks);
    }

    function moveUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index].text;
            updatedTasks[index].text = updatedTasks[index-1].text;
            updatedTasks[index-1].text = temp;
            setTasks(updatedTasks);
        }
    }

    function moveDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index].text;
            updatedTasks[index].text = updatedTasks[index+1].text;
            updatedTasks[index+1].text = temp;
            setTasks(updatedTasks);
        }
    }

    function togglecomplete(index){
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }


    return(
    <div className="todolist">
        <h1> To-Do-List </h1>
        <div>
            <input
                type="time"
                placeholder="Time of task"
                value={timeOfTask}
                onChange={letwritetime}/>
            <input
                type="text"
                placeholder= "Task goes here"
                value={newTask}
                onChange={letwritetask}/>
            <button
                className="Add-button"
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) =>
                <li key = {index}>
                    {task.completed && <span className="checkmark">✓</span>}
                    <span className="task-number">{index + 1}.</span>
                    <span className="task-time">{task.time}</span>
                    <span onClick={() => togglecomplete(index)}
                    className={`task-text ${task.completed ? "completed" : ""}`}>
                        {task.text}
                    </span>
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
