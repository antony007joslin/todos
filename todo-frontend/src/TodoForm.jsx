function TodoForm({todoText, setTodoText, onAdd}){

    const handleKeyDown = (event) =>{
        if(event.key==="Enter"){
            // console.log("TodoText:"+todoText);
            // if(todoText.trim === ""){
            //      return;
            // }               
            onAdd();
        }
    };
    return(
        <div className="todo-form">
            <input 
            type='text' 
            placeholder='Enter a todo...' 
            value={todoText} 
            onChange={(event)=>setTodoText(event.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button onClick={onAdd}>Add</button>
        </div>
    );

}

export default TodoForm;