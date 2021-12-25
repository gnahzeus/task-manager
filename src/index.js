import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const TASKS = [
  { id: "task-0", name: "Eat", completed: true },
  { id: "task-1", name: "Sleep", completed: false },
  { id: "task-2", name: "Repeat", completed: false }
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

