import React, { Fragment, useState, useRef,useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { TodoItem } from './TodoItem';
const KEY = "todolist-todos"
export function TodoList(){

    const [todos, setTodos] = useState([
         {
            id:1,
            task:'Primera Tarea',
            completed:false,
            titulo:'t1',
            css:'bg'

        },
        {
            id:2,
            task:'Segunda',
            completed:false,
            titulo:'t1',
            cuerpo:'c1',
            css:'bgI'

        },
        {
            id:3,
            task:'Tercera',
            completed:true,
            titulo:'t1',
            cuerpo:'c2',
            css:'bg'

        },
        {
            id:100,
            task:'Segunda',
            completed:false,
            titulo:'t5',
            cuerpo:'c3',
            css:'bg'

        }
       
    ]);

    const taskRef = useRef();
    const taskRef2 = useRef();
    const taskRef3 = useRef();
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos){
            setTodos(storedTodos);
        }
    }, [])
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos])
    const cambiarEstadoTarea = (id) => {
        console.log(id)
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        //const newTodos = [...todos];
        //const todo = newTodos.find((todo) => todo.id === id)
        //todo.completed = !todo.completed;
        //setTodos(newTodos)
    }
    const cantidadTareas = () => {
        return todos.filter((todo) => !todo.completed).length;
    }

    const ResumenTareas = () => {
        const cant = cantidadTareas()
        if (cant === 0){
            return (
                <div className="alert alert-success mt-3">
                    Felicitaciones no tienes tareas pendientes! :)
                </div>
            )
        }

        if (cant === 1){
            return (
                <div className="alert alert-info mt-3">
                    Te queda solamente una tarea pendiente!
                </div>
            )
        }

        return (
            <div className="alert alert-info mt-3">
                Te quedan {cant} tareas pendientes!
            </div>
        )
    }
    const eliminarTareasCompletadas = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }
    const agregarTarea = () => {
        console.log("AGREGANDO TAREA");
        const task = taskRef.current.value;
        const task2 = taskRef2.current.value;
        const task3 = taskRef3.current.checked;
        console.log(task3)
        var cssi="bg"
        if (task === '') return;
        if (task3===true)
        {
           cssi="bgI"
           
        }
        console.log(cssi)
        setTodos((prevTodos) => {
            const newTask = {
                id: uuid(),
                titulo:task,
                cuerpo:task2,
                css:cssi

            }
    
            return [...prevTodos, newTask]
        })
    
    }
  
    return (

        <Fragment>
            <h1>Listado de Tareas</h1>
            
            <div className="input-group mt-3 mb-4">
                <input ref={taskRef} placeholder='Ingrese Titulo' className="form-control ms-2" type="text"></input>
                <input ref={taskRef2}   placeholder='Ingrese Detalle' className="form-control ms-2" type="text"></input>
                <div class="form-check">
                <input ref={taskRef3} class="form-check-input ms-2" type="checkbox"  id="flexCheckDefault" value=""/>
                <label class="form-check-label" for="flexCheckDefault">
                    Importante
                </label>
            </div>
                <button onClick={agregarTarea} className="btn btn-success ms-2">+</button>
                
            </div>

            <div className="row">
                {todos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}></TodoItem>
                ))}
            </div>
            <ResumenTareas />
        </Fragment>

    );
}
