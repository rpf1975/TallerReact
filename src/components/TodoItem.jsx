import React from 'react'

export function TodoItem({todo,cambiarEstado}){
    const {id, task, completed,titulo,css,cuerpo} = todo;
    const fnCambiarEstado = () => {
        cambiarEstado(id);
    }
    return   <div class="col-xs-12 col-md-2 ms-5 mb-3 mt-5" id={css}>
      
        
        <div class="card-body">
        <img src="img/pin.png" width="50px" height="50px" alt="" />
        <h5 class="card-title" id='micard'>{titulo}</h5>
        <p class="card-text">{cuerpo}</p>
        <button type="button" onClick={fnCambiarEstado} id={id} class="btn btn-warning">
            Eliminar
        </button>
        

        </div>
    </div>
 
    
   

}
