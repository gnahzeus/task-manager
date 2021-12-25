import React, { Component } from "react";
import './App.css';
import TasksContainer from "./components/TasksContainer";
import Task from "./components/Task";
import Form from "./components/Form";
import FilterTag from "./components/FilterTag";

function App(props) {
  
  function addTask(name) {
    alert(name);
  }
  
  const taskList = props.tasks?.map(task => ( 
      <Task 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id}
      />));

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
        3 tasks remaining
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
