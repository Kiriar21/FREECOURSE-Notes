const Note = require('../../db/models/note')

module.exports = {


    getAllNotes(req,res){
        //Pobieranie notatek

        res.send('Api działa.');
    },

    getNote(req,res){
        //Pobieranie notatki

        res.send('Info o notatce');
    },

    saveNote(req,res){
        //Tworzenie notatki
        const newNote = new Note({
            title: 'Zrobić zakupy',
            body: 'mleko jajka woda'
        });
        
        const title = req.body.title;
        const body = req.body.body;


        newNote.save().then(()=>{
            console.log('note saved');
        });

        res.send(`Dodana notatka. Tytuł: ${title} tresc: ${body} `)
    },

    updateNote(req,res){
        //Edycja notatek

        res.send('Aktu notatki');
    },

    deleteNote(req,res){
        //Usuwanie notatek
        const id = req.params.id;
        res.send('Delete notatki ' + id);
    },

}

