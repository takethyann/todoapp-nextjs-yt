"use client";

import React, { HTMLInputTypeAttribute, useEffect, useState, useRef } from "react";
import { Task } from "@/types";
import { editTodo, deleteTodo } from "@/api";

interface TodoProps {
    todo: Task;
}

const Todo : React.FC<TodoProps> = ({ todo } ) => {
    const ref = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

    const handleEdit = async () => {
        setIsEditing(true);
    };
    
    const handleSave = async () => {
        await editTodo(todo.id, editedTaskTitle);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await deleteTodo(todo.id);
    };

    useEffect(() => {
        if(isEditing){
            ref.current?.focus();
        }
    }, [isEditing]);

    
    return (
        <li 
            key={todo.id}
            className="flex justify-between p-4 bg-white border-1-4 border-blue-500 rounded shadow">
            {isEditing ? (
            <input 
            ref={ref} 
            type="text"
            className="mr-2 py-1 px-2 rounded border-gray-400 border" 
            value={editedTaskTitle} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setEditedTaskTitle(e.target.value) 
            }/>) :<span>{todo.text}</span>}
        <div>
            {isEditing ? (
                
                <button className="text-blue-500 mr-3" onClick={handleSave}>save</button>) : (
                <button className="text-green-500 mr-3" onClick={handleEdit}>edit</button>)}
            
            <button className="text-red-500" onClick={handleDelete}>Delete</button>
        </div>
        </li>
    );
};

export default Todo