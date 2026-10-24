package com.example.todo.todo_backend.model;

/**
 * Todo
 */
public class Todo {

    private Long id;
    private String description;
    private  boolean completed;
    
    public Todo(Long id, String description, boolean completed){

        this.id = id;
        this.description=description;
        this.completed=completed;

    }

    public Long getId(){
        return id;
    }

    public String getDescription(){
        return description;
    }

    public boolean isCompleted(){
        return completed;
    }

    public void setId(Long id){
        this.id=id;
    }

    public void setDescription(String description){
        this.description=description;
    }

    public  void setCompleted(boolean completed){
        this.completed=completed;
    }
}