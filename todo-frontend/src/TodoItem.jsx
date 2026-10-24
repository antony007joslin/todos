function TodoItem({todo, onToggle, onDelete}){

    return (
        <div className="todo-item" key={todo.id}>
        <input type='checkbox' checked={todo.completed} onChange={() => onToggle(todo.id)}/>
        <span className={`todo-description ${todo.completed ? "completed":""}`} >{todo.description}</span>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    );
}

export default TodoItem;