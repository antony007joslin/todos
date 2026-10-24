import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

function App() {
  const [todos, setTodos] = useState([]);
  
  const [todoText, setTodoText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/todos`)
    .then(response => response.json())
    .then(data=>{
      setTodos(data);
    })
    .catch(error =>{
      console.error("Error fetching todos",error);
    });
  },[]);

  useEffect(() =>{
    if(message===""){
      return;
    }
    const timer = setTimeout(()=>{
      setMessage();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);
  
  const addTodo = () => {
    if(todoText.trim() === "")
      return;
    const alreadyExists = todos.some(
      todo => todo.description.toLowerCase() === todoText.trim().toLowerCase()
    );
    if(alreadyExists){
      setMessage("Todo item already exists");
      return;
    }
    const newTodo = {
      description: todoText.trim(),
      completed: false
    };
    fetch(`${import.meta.env.VITE_API_URL}/api/todos`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(data => {
      setTodos([...todos, data]);
      setTodoText("");
      setMessage("");
    })
    .catch(error=>{
      console.error("Error adding todo:", error);
    });
  };
  const toggleTodo = (id) => {
    const todo = todos.find(todo=>todo.id===id);

    const updatedTodo = {
      description:todo.description,
      completed: !todo.completed
    };
    fetch(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTodo)
    })
    .then(response=>response.json())
    .then(data=>{
      const updatedTodos = todos.map(todo=>{
        if(todo.id === id){
          return data;
        }
        return todo;
      })
      setTodos(updatedTodos);
    })
    .catch(error=> {
      console.error("Error updating Todo:", error);
    });
  };
  const deleteTodo = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/todos/${id}`,{
      method:"DELETE"
    })
    .then(response=>{
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
      }
      setTodos(todos.filter(todo => todo.id !== id))
    })
    .catch(error=> {
      console.error("Error Deleting Todo:",error);
    });
  };
  const clearCompleted =() => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    fetch(`${import.meta.env.VITE_API_URL}/api/todos/completed`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTodos)
    })
    .then(response=>{
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(data=>{
      console.log(data);
      setTodos(data);
    })
    .catch(error=> {
      console.error("Error clearing Todo:",error);
    });
  };
  const clearAll =()=>{
    const confirmed = window.confirm("Are you sure you want to delete all Todos?");
    if(!confirmed){
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/todos`,{
      method:"DELETE"
    })
    .then(response=>{
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
      }
      setTodos([]);
    })
    .catch(error=> {
      console.error("Error Deleting All Todos:",error);
    });
  };
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = todos.filter(todo => !todo.completed).length;
  return (
    <div className='app'>
      <h1>Todo List</h1>
      <p className="subtitle">Stay organized. Get things done.</p>
      <div className="todo-stats">

  <div className="stat-card">
    <span className="stat-label">Total</span>
    <span className="stat-value">{todos.length}</span>
  </div>

  <div className="stat-card">
    <span className="stat-label">Completed</span>
    <span className="stat-value">{completedTodos}</span>
  </div>

  <div className="stat-card">
    <span className="stat-label">Pending</span>
    <span className="stat-value">{pendingTodos}</span>
  </div>

</div>
      <TodoForm 
      todoText={todoText}
      setTodoText={setTodoText}
      onAdd={addTodo}/>
      {message && <p className='error-message'>{message}</p>}
      <hr/>
      <TodoList 
      todos={todos}
      onToggle={toggleTodo}
      onDelete={deleteTodo}
      />
      <div className='todo-actions'>
        <button 
        onClick={()=>clearCompleted()}
        disabled={completedTodos ===0}>Clear Completed</button>
        <button onClick={clearAll} disabled={todos.length===0}>Clear all Todos</button>
      </div>
    </div>
  );
}

export default App
