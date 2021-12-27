import React, { useState } from "react";

function Form(props) {

  const [name, setName] = useState("");

  function handleSubmit(e) {
    if (!(e.target.value === "")) {
        e.preventDefault();
        props.addTask(name)
        setName(""); // clear form aft submit
    }
  }

  function handleChange(e) {
    setName(e.target.value);
  }  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        placeholder="Work: Send Emails"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add Task
      </button>
    </form>
  );
}

export default Form;
