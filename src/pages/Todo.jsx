import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase/supabase';

const Todo = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription]= useState("")
    const [todo, setTodo] = useState([]);

    //Add todo
    const addTodo = async(e)=>{
        e.preventDefault()
        // console.log(title, description);
        if(title === '')
        {
            alert("enter your title")
            return 
        }
        if(description === '')
        {
            alert("enter your description")
            return
        }

        const{data, error} = await supabase
        .from("Todos")
        .insert([{Title:title, description: description}])
        .select()

        if(error){
            console.log(error);
        }else{
            console.log(data)
        }

        setTitle('')
        setDescription('')
    }

    //Read Todo
    const fetchTodos = async() => {
        const{ data, error } = await supabase
        .from("Todos")
        .select("*")
        .order("created_at", {ascending: false})

        if(error){
            console.log(error)
        }else{
            console.log(data)
            setTodo(data)
        }
    }
    useEffect(()=>{
        fetchTodos()
    },[])

    //DeleteTodo
    const deleteTodo = async (id)=>{
        const{error} = await supabase
        .from("Todos")
        .delete()
        .eq("id", id)

        if(error){
            console.log(error)
        }else{
            fetchTodos()
        }
    }

    //EditTodo

    const editTodo = async (id, title,desc)=>{
        const{error}=await supabase
        .from("Todo")
        .update(prompt("Enter your updated title",title.value),prompt("Enter your updated description",desc.value))
       

    }


  return (
    <div>

        <form onSubmit={addTodo}>
            <input type="text" placeholder='Enter Todo Title' onChange={(e) => setTitle(e.target.value)} value={title} />

            <textarea type="text" placeholder='Enter Todo Description' onChange={(e) => setDescription(e.target.value)} value={description} />

            <button>Add Todo</button>
        </form>

        {
            todo.length > 0 ? todo.map((item)=>{
                return <div key={item.id}>

                    <div>
                        <h1>{item.id}</h1>
                        <h1>{item.Title}</h1>
                        <h1>{item.description}</h1>
                    </div>

                    <div>
                        <button onClick={()=>deleteTodo(item.id)}>Delete</button>

                        <button onClick={()=> editTodo(item.id, item.title, item.description)}>Edit</button>
                    </div>
                
                </div>
            }) : <h1>No Todo</h1>
        }

    </div>
  )
}

export default Todo
