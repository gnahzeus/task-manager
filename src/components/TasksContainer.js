/*import React, { Component } from "react";
import axios from "axios";
import update from 'immutability-helper';

class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      inputValue: "",
    };
  }

  loadTasks() {
    axios
      .get("/api/version1/tasks")
      .then((res) => {
        this.setState({ tasks: res.data });
      })
      .catch((error) => console.log(error));
  }
  
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
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  modifyTask = (e, id) => {
		axios.put(`/api/version1/tasks/${id}`, {task: {done: e.target.checked}})
		.then(res => {
		  const taskIndex = this.state.tasks.findIndex(x => x.id === res.data.id)
		  const tasks = update(this.state.tasks, {
			[taskIndex]: {$set: res.data}
		  })
		  this.setState({
			tasks: tasks
		  })
		})
		.catch(error => console.log(error))      
	}


  removeTask = (id) => {
    axios.delete(`/api/version1/tasks/${id}`)
    .then(res => {
      const taskIndex = this.state.tasks.findIndex(x => x.id === id)
      const tasks = update(this.state.tasks, {
      $splice: [[taskIndex, 1]]
      })
      this.setState({
      tasks: tasks
      })
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <div>
        <div className="taskContainer">
          <input
            className="newTask"
            type="text"
            placeholder="Enter New Task"
            maxLength="75"
            onKeyPress={this.newTask}
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </div>
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.tasks.map((task) => {
              return (
                <li className="item" task={task} key={task.id}>
                  <input className="itemCheckbox" type="checkbox" 
                  checked={task.done}
                  onChange={(e) => this.modifyTask(e, task.id)}/>
                  <label className="itemDisplay">{task.title}</label>
                  <span className="removeItemButton" onClick={(e) => 
                  this.removeTask(task.id)}>x</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TasksContainer;
*/