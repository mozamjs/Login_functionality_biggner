import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase/supabase';
import { useNavigate } from 'react-router';

const Todo = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [todo, setTodo] = useState([]);

    const navigate = useNavigate()

    //Add todo
    const addTodo = async (e) => {
        e.preventDefault()

        const { data: userData } = await supabase.auth.getUser()
        const user = userData.user

        if (!user) {
            alert("user not logged in")
            return
        }

        if (title === '') {
            alert("enter your title")
            return
        }
        if (description === '') {
            alert("enter your description")
            return
        }

        const { data, error } = await supabase
            .from("Todos")
            .insert([
                {
                    Title: title,
                    description: description,
                    user_id: user.id
                }
            ])
            .select()

        if (error) {
            console.log(error);
        } else {

            fetchTodos()
        }

        setTitle('')
        setDescription('')
    }

    //Read Todo
    const fetchTodos = async () => {

        const { data: userData } = await supabase.auth.getUser()
        const user = userData.user

        if (!user) return

        const { data, error } = await supabase
            .from("Todos")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

        if (error) {
            console.log(error)
        }
        if (!error) {
            console.log(data)
            setTodo(data)
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser()

            if (!data.user) {
                navigate('/auth')
            } else {
                fetchTodos()
            }
        }

        checkUser()
    }, [])

    //DeleteTodo
    const deleteTodo = async (id) => {
        const { error } = await supabase
            .from("Todos")
            .delete()
            .eq("id", id)

        if (error) {
            console.log(error)
        }
        if (!error) {
            fetchTodos()
        }
    }

    //EditTodo

    const editTodo = async (id, title, desc) => {

        const updatedTitle = prompt("enter new title", title)
        const updatedDesc = prompt("enter new description", desc)

        const { error } = await supabase
            .from("Todos")
            .update({
                Title: updatedTitle,
                description: updatedDesc
            })
            .eq("id", id)


        if (error) {
            console.log(error)
        }
        else {
            fetchTodos()
        }

    }


    return (
        <div className="page-center">
            <div className="main-card">

                <h1>Todo App</h1>

                <form onSubmit={addTodo}>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button>Add Todo</button>
                </form>

                <div className="todo-list">
                    {todo.length > 0 ? (
                        todo.map((item) => (
                            <div className="todo-item" key={item.id}>
                                <h3>{item.Title}</h3>
                                <p>{item.description}</p>

                                <div className="todo-actions">
                                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                                    <button onClick={() => editTodo(item.id, item.Title, item.description)}>Edit</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Todos Yet</p>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Todo
