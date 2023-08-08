import React from 'react';
import './notes.css'
import Note from './Note/note'
import NewNote from './NewNote/newnote'
import Modal from 'react-modal'
import EditNote from './EditNote/editnote';
import Axios from '../../axios'

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            showEditModal: false,
            editNote: {}
        }

        Modal.setAppElement('#root');
    }

    componentDidMount() {
        this.fetchNotes();
    }

    async fetchNotes() {        
        const res = await Axios
            .get('/notes');
        const notes = res.data;
        this.setState({notes});
    }


    async deleteNote(_id) {
        const notes = [...this.state.notes]
            .filter(note => note._id !== _id)
        
        await Axios.delete('/notes/'+_id);

        this.setState({notes});
    }

    async addNote(note){
        const notes = [...this.state.notes];
        //backend
        const res = await Axios.post('/notes', note);
        let newNote = res.data;
        newNote.key = newNote._id;
        //frontend
        notes.push(newNote);
        this.setState({notes});
    }

    async editNote(note){
        //edit backend
        await Axios.put('/notes/'+note._id, note);
        //edit frontend
        const notes = [...this.state.notes]
        const index = notes.findIndex(x => x._id === note._id)
        if(index >= 0) {
            notes[index] = note;  
        }
        this.setState({notes});
        this.toggleModal();
    }

    toggleModal() {
        this.setState({ 
            showEditModal: !this.state.showEditModal
        });
    }

    editNoteHandler(note){
        this.toggleModal();
        this.setState({editNote : note })
    }



    render() {

        
        return (
            <div>
                <p>Moje notatki:</p>

                <NewNote 
                    onAdd={ note => this.addNote(note) }
                />

                <Modal
                    isOpen={this.state.showEditModal}
                    contentLabel="Edytuj notatkę">
                        <EditNote 
                            title={this.state.editNote.title}
                            body={this.state.editNote.body}
                            _id={this.state.editNote._id}
                            onEdit={note => this.editNote(note)}/> 
                    <button
                        onClick={() => this.toggleModal()}
                    >Anuluj</button>
                </Modal>

                {this.state.notes.map(note => {
                    return <Note 
                        key={note._id}
                        title={note.title}
                        body={note.body}
                        _id={note._id} 
                        onDelete={
                            ()=>this.deleteNote(note._id)}
                        onEdit={
                            (note) => this.editNoteHandler(note)}
                    />
                })}
                
            </div>
        )
    }
}
export default Notes;