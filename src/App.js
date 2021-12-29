import React, { Component, useEffect, useState } from "react";
import './App.css';
import TasksContainer from "./components/TasksContainer";
import Task from "./components/Task";
import Form from "./components/Form";
import FilterTag from "./components/FilterTag";
import { nanoid } from "nanoid";
import axios from "axios";

const FILTER = {
  All: () => true, // all tasks
  Active: task => !task.completed, // tasks whose completed prop is false
  Completed: task => task.completed,
  Work: task => task.name.toLowerCase().includes("work"),
  School: task => task.name.toLowerCase().includes("school") || task.name.toLowerCase().includes("homework"),
  "Misc.": task => task.name.toLowerCase().includes("misc") || (!task.name.toLowerCase().includes("work") && !task.name.toLowerCase().includes("school"))
}

const FILTER_TAGS = Object.keys(FILTER); // array of filter_tags

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All'); // hook that reads & sets filter: default: All
  
  useEffect(() => {
    getAllTasks();
  }, [])

  const getAllTasks = () => {
    axios.get("https://limitless-cliffs-41725.herokuapp.com/")
    .then((res) => {
      console.log("RES.DATA ", res.data)
      setTasks(res.data)
    })
    .catch(error => console.error(`Error: ${error}`));
  }
  
  
  function addTask(name) {
    if (!(name === "")) { //disallow empty tasks
      axios.post("https://limitless-cliffs-41725.herokuapp.com/", {name: name, completed: false})
      .then((res) => {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]); 
      })
      .catch((error) => console.log(error));
    }
  }

  function deleteTask(id) {
    axios.delete(`https://limitless-cliffs-41725.herokuapp.com/${id}`)
    .then(res => {
      const remaining = tasks.filter(task => id !== task.id);
      setTasks(remaining); // input new array without deleted tasks
    })
    .catch(error => console.log(error))
  }


  function editTask(id, editedName) {
    axios.put(`https://limitless-cliffs-41725.herokuapp.com/${id}`, {name: editedName})
		.then(res => {
		  const editedTasks = tasks.map(task => {
        if (id === task.id) { // if the task has same id as edited task
          return {...task, name: editedName}
        }
        return task
      });
      setTasks(editedTasks);
		})
		.catch(error => console.log(error))   
		  
  }

  function toggleTaskCompleted(id, completion) {
      axios.put(`https://limitless-cliffs-41725.herokuapp.com/${id}`, {completed: !completion})
      .then(res => {
        const updatedTasks = tasks.map(task => {
          // if this task has the same ID as the edited task
          if (id === task.id) {
            // use object spread to make a new object whose `completed` prop has been inverted
            return {...task, completed: !task.completed}
          }
          console.log(res.data);
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => console.log(error))   
  }

  const taskList = tasks
  .filter(FILTER[filter]) //render task only if it is in the correct tag
  .map(task => ( 
      <Task 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask} // delete callback prop
        editTask={editTask}
      />));

  const filterButtons = FILTER_TAGS.map(tag => 
    (<FilterTag key={tag} name={tag} 
      isPressed={tag === filter} setFilter={setFilter}/>));

  const plurality = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${plurality} remaining`;
    
  return (
    <div className="todoapp stack-large">
      <h1>My Task Manager</h1>
      <Form addTask={addTask}/> 
      <div className="filters btn-group stack-exception">
        {filterButtons}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
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
/*
class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="topHeading">
          <h1>My Task Manager</h1>
        </div>
        <TasksContainer />
      </div>
    );
  }
}
*/

export default App;
