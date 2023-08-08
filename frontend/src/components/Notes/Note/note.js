import React, { useState } from "react";

function Note(props){

    const [showDesc, setShowDesc] = useState(false)
    const toggleDesc = () => {
        setShowDesc(!showDesc);
    }
    const editHandler = () => {
        props.onEdit({
            title: props.title,
            body : props.body,
            _id: props._id,
            key: props._id
        })
    }

    return(
        <div className='note'>

            <p onClick={toggleDesc}>{props.title}</p>
            
            {showDesc && (
                <div className='description'>
                    {props.body}
                </div>
            )}

            <button
                onClick={editHandler}>Edytuj</button>
            <button 
                className='delete' 
                onClick={()=>props.onDelete()
            }>Usuń</button>

        </div>
    )

}
export default Note;