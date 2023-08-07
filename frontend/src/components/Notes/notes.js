import React from 'react';
import './notes.css'
import Note from './Note/note'

class Notes extends React.Component{
    constructor(props){
        super(props);
        
        this.notes = [
            {
                id: '1',
                title: 'Zrobić zakupy',
                body: 'Kup mleko i jajka.'
            },
            {
                id: '2',
                title: 'Posprzątać',
                body: 'Odkurzyć mieszkanie i opróżnić zmywarke.'
            },
            {
                id: '3',
                title: 't',
                body: 't'
            }
        ]

    }

    render(){

        
        return(
            <div>
                <p>Moje notatki:</p>
                {this.notes.map(note => {
                    return <Note title={note.title} body={note.body} id={note.id}/>
                })}
                
            </div>
        )
    }
}
export default Notes;