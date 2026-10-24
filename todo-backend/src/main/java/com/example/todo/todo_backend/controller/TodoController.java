package com.example.todo.todo_backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.todo.todo_backend.model.*;

@CrossOrigin(origins = "${cors.allowed-origin:http://localhost:5173}",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE
    }
)
@RestController 
public class TodoController{

    private List<Todo> todos = new ArrayList<>();
    private Long nextId =1L;
    @GetMapping("api/todos")
    public List<Todo> getTodos(){
        
        return todos;
    }

    @PostMapping("api/todos")
    public Todo createTodo(@RequestBody Todo todo){
        todo.setId(nextId);
        nextId++;
        todos.add(todo);
        return todo;
    }

    @PutMapping("api/todos/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo){
        
        for (Todo todo : todos) {
            if(todo.getId().equals(id)){
                todo.setDescription(updatedTodo.getDescription());
                todo.setCompleted(updatedTodo.isCompleted());
                return todo;
            }
        }
        return null;
    }

    @DeleteMapping("api/todos/{id}")
    public void deleteTodo(@PathVariable Long id){
        todos.removeIf(todo->todo.getId().equals(id));
    }

    @DeleteMapping("api/todos")
    public void deleteAllTodo(){
        System.out.println("Call reached deleteAllTodo");
        todos.clear();
    }

    @DeleteMapping("api/todos/completed")
    public List<Todo> deleteCompletedTodos(@RequestBody List<Todo> todos){
        todos.removeIf(todo->todo.isCompleted());
        for (Todo todo2 : todos) {
            System.out.println("Todo:"+todo2.getDescription());
        }
        System.out.println("Call reached deleteCompletedTodos");
        return todos;
    }
}
