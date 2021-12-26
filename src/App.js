import React, { Component, useState } from "react";
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
  Completed: task => task.completed
}

const FILTER_TAGS = Object.keys(FILTER); // array of filter_tags

function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All'); // hook that reads & sets filter: default: All
/*
newTask = (e) => {
    if (e.key === "Enter" && !(e.target.value === "")) {
      axios
        .post("/api/version1/tasks", { task: { title: e.target.value } })
        .then((res) => {
          const tasks = update(this.state.tasks, {
            $splice: [[0, 0, res.data]],
          });
  
          this.setState({
            tasks: tasks,
            inputValue: "",
          });
        })
        .catch((error) => console.log(error));
    }
  }; */
  function addTask(name) {
    if (!(name.target.value === "")) {
      axios
      .post("/api/version1/tasks", { task: { title: name.target.value } })
      .then((res) => {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        /*const tasks = update(this.state.tasks, {
          $splice: [[0, 0, res.data]],
        });*/

        /*this.setState({
          tasks: tasks,
          inputValue: "",
        });*/
        setTasks([...tasks, newTask]);
      })
      .catch((error) => console.log(error));
    }
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
