import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsTrash, BsCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const showAll = () => {
    setFilteredTodos(todos);
  };

  const showDone = () => {
    setFilteredTodos(todos.filter((todo) => todo.done));
  };

  const showNotDone = () => {
    setFilteredTodos(todos.filter((todo) => !todo.done));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUpdateName(id, editingText);
      setEditingId(null);
      setEditingText("");
    }
  };

  const handleDoubleClick = (id, task) => {
    setEditingId(id);
    setEditingText(task);
  };

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3001/get");
    setTodos(response.data);
  };

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then((result) => {
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateName = (id, newTask) => {
    axios
      .put(`http://localhost:3001/update-name/${id}`, { newTask })
      .then((result) => {
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((result) => {
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="main-titles">Todo List</h2>
      <Create />
      <div className="button-list-container">
        <button className='button-list' onClick={showAll}>Mostrar todas</button>
        <button className='button-list' onClick={showDone}>Mostrar hechas</button>
        <button className='button-list' onClick={showNotDone}>Mostrar no hechas</button>
      </div>
      {todos.length === 0 ? (
        <div>
          <h3 className="main-titles">No hay tareas</h3>
        </div>
      ) : (
        //todos.filter(todo => todo.done).map((todo) => (
        filteredTodos.map((todo) => (
          <div className="todo-list" key={todo._id}>
            <div className="task" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="done icon" />
              ) : (
                <BsCircleFill className="not-done icon" />
              )}
            </div>
            {editingId === todo._id ? (
              <input
                type="text"
                className={todo.done ? "done" : "line-done"}
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, todo._id)}
              />
            ) : (
              <span
                className={todo.done ? "line-done" : "done"}
                onDoubleClick={() => handleDoubleClick(todo._id, todo.task)}
              >
                {todo.task}
              </span>
            )}
            <BsTrash className="icon" onClick={() => handleDelete(todo._id)} />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
