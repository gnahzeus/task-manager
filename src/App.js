import React, { Component, useState } from "react";
import './App.css';
import TasksContainer from "./components/TasksContainer";
import Task from "./components/Task";
import Form from "./components/Form";
import FilterTag from "./components/FilterTag";
import { nanoid } from "nanoid";


function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks)

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  
  function deleteTask(id) {
    const remaining = tasks.filter(task => id !== task.id);
    setTasks(remaining); // input new array without deleted tasks
  }

  function editTask(id, editedName) {
    const editedTasks = tasks.map(task => {
      if (id === task.id) { // if the task has same id as edited task
        return {...task, name: editedName}
      }
      return task
    });
    setTasks(editedTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasks.map(task => ( 
      <Task 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask} // delete callback prop
        editTask={editTask}
      />));

  const plurality = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${plurality} remaining`;
    
  return (
    <div className="todoapp stack-large">
      <h1>My Task Manager</h1>
      <Form addTask={addTask}/> 
      <div className="filters btn-group stack-exception">
        <FilterTag />
        <FilterTag />
        <FilterTag />
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
