import React, {useState} from "react";


function Todo(props){
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

    function handleDelete(){
        props.delete(props.id)
    }

    function handleChange(e){
        setNewName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input 
                    id={props.id} 
                    className="todo-text" 
                    type="text" 
                    value={newName}
                    onChange={handleChange}
                />
                
            </div>
            <div className="btn-group">
                <button 
                    type="button" 
                    className="btn todo-cancel btn_danger"
                    onClick={() => setEditing(false)}
                >
                    Cancel 
                    <span className="visually-hidden">
                        renaming {props.name} 
                    </span>
                </button>
                <button type="submit" className="btn btn_primary todo-edit">
                    Save
                    <span className="visually-hidden">
                        New name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    )

    const viewTemplate = (
        <div className="todo stack-small">
          <div className="c-cb">
            <input 
                id="todo-0" 
                type="checkbox" 
                defaultChecked={props.isCompleted}
                onChange={() => props.taskComplete(props.id)}
            />
            <label className="todo-label" htmlFor="todo-0">{props.name}</label>
          </div>
          <div className="btn-group">
            <button 
                type="button" 
                className="btn"
                onClick={() => setEditing(true)}
            >

              Edit <span className="visually-hidden">{props.name}</span>
            </button>

            <button 
            type="button" 
            className="btn btn_danger"
            onClick={handleDelete}
            >
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
        </div>
    );


    return <li className="todo"> {isEditing ? editingTemplate : viewTemplate} </li>;
}

export default Todo;