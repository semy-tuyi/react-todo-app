import React, {useState} from "react";
import {nanoid} from "nanoid";
import Form from "./components/Form";
import Filter from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: ()=>true,
  Active: (task) => !task.completed,
  completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props){
  const[tasks, setTasks] = useState(props.tasks)
  const[filter, setFilter] = useState('All');

  function addTask(name){
    const newTask = {
      id: `todo-${nanoid()}`,
      name,
      completed: false
    }
    setTasks([...tasks, newTask]);
  }
  
  function taskComplete(id){
    const updatedTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task, completed: !task.completed}
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const newTaskList = tasks.filter((task) =>  id !== task.id )
    setTasks(newTaskList);
  }

  function editTask(id, newName){
    const editedTasksList = tasks.map((task) => {
      if(id === task.id){
        return {...task, name:newName}
      }
      return task;
    });
    setTasks(editedTasksList);
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task)=>
    <Todo 
      id={task.id}
      name={task.name} 
      isCompleted={task.completed}
      key={task.id}
      delete={deleteTask}
      taskComplete={taskComplete}
      editTask={editTask}
    />
  )

  const filterList = FILTER_NAMES.map((name) => (
    <Filter 
    key={name} 
    name={name} 
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ))
  const count = taskList.length ;
  const taskDisplay = count > 1 ? "Tasks" : "Task";

  return(
    <div className="todoapp stack-large">
      <h1>Todo App</h1>
      <Form addTask={addTask}/>

      <div className="btn-group">
        {filterList}
      </div>
      
      <h2 id="list-heading"> {count} {taskDisplay} remaining</h2>
      <ul 
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;