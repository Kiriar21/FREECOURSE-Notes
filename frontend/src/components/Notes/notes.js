import React from 'react';
import './notes.css'
import Note from './Note/note'
import NewNote from './NewNote/newnote'
import Modal from 'react-modal'
import EditNote from './EditNote/editnote';
import Axios from '../../axios'
import { v4 }  from 'uuid';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css'

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
        try{
            const res = await Axios
                .get('/notes');
            const notes = res.data;
            this.setState({notes});
        } catch (err) {
            NotificationManager.error('Nie udało się pobrać notatek. Spróbuj ponownie.');
        }
    }


    async deleteNote(_id) {
        try{
            const notes = [...this.state.notes]
            .filter(note => note._id !== _id)
            await Axios.delete('/notes/'+_id);
            this.setState({notes});
            NotificationManager.success('Pomyślnie usunięto notatkę.');
        } catch (err) {
            NotificationManager.error('Nie udało się usunąć notatki. Spróbuj ponownie.');
        }
    }

    async addNote(note) {
        try{
            //backend
            const res = (await Axios.post('/notes', note));
            let newNote = res.data.note;
            //frontend
            const notes = [...this.state.notes, newNote];   
            this.setState({notes});
            NotificationManager.success('Dodano notatke.');
        } catch (err) {
            NotificationManager.error('Niepodano prawidłowych danych.');
        }
    }

    async editNote(note) {
       try{
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
            NotificationManager.success('Zaaktualizowano notatke.');
        } catch (err) {
            NotificationManager.error('Nie udało się zaaktualizować notatki. Spróbuj ponownie.');
        }
    }

    toggleModal() {
        this.setState({ 
            showEditModal: !this.state.showEditModal
        });
    }

    editNoteHandler(note) {
        this.toggleModal();
        this.setState({editNote : note })
    }

    async deleteNotes() {
        try{
            await Axios.delete('/notes');
            const notes = [];
            this.setState({notes});
            NotificationManager.success('Usunięto wszystkie notatki.');
        } catch (err) {
            NotificationManager.error('Nie udało się usunąć notatek. Spróbuj ponownie.');
        }
    }

    render() {

        
        return (
            <div>
                <NotificationContainer />
                <p>Moje notatki:</p>

                <NewNote 
                    onAdd={ (note) => this.addNote(note) }
                    
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
                    return( 
                        <React.Fragment key={v4()}>
                            <Note 
                                title={note.title}
                                body={note.body}
                                _id={note._id} 
                                onDelete={
                                    ()=>this.deleteNote(note._id)}
                                onEdit={
                                    (note) => this.editNoteHandler(note)}
                            />
                    </React.Fragment>
                )})}
                
            </div>
        )
    }
}
export default Notes;