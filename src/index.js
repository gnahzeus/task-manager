import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const TASKS = [
  { id: "task-0", name: "defaultTask", completed: true },
  { id: "task-1", name: "default1", completed: false },
  { id: "task-2", name: "default2", completed: false }
];
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

ReactDOM.render(<App tasks={TASKS} />, document.getElementById("root"));


