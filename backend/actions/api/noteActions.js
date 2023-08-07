const Note = require('../../db/models/note')

module.exports = {


    getAllNotes(req,res){
        // Pobieranie notatek
        Note.find({}).then((documents)=>{
            console.log(documents);
            // throw new Error('Nie udało się pobrać notatek');
            res.status(200).json(documents);
        }).catch((error)=>{
            console.log(error);
            res.status(500).json({ message : error.message });
        })
    },


    // lub
    // async getAllNotes(req,res){
    //     let documents;
    //     try{
    //         documents = await Note.find({});
    //         // throw new Error('Nie udało się pobrać notatek');
    //     } catch(error){
    //        return res.status(500).json({ message : error.message })
    //     }
    //     console.log(documents);
    //     res.status(200).json(documents);
    // },
   

    getNote(req,res){
        //Pobieranie notatki
        const id = req.params.id;
        Note.findOne({_id:id}).then((note)=>{
            res.status(200).json(note);
        }).catch((error) => {
            res.status(500).json({ message : error.message });
        });
    },

    saveNote(req,res){
        //Zmienne przechowujące dane notatki
        const title = req.body.title;
        const body = req.body.body;

        //Tworzenie notatki
        const note = new Note({title,body});

        //Dodawanie notatki
        note.save().then(()=>{
            res.status(201).json({note});
        }).catch((error)=>{
            res.status(422).json({ message : error.message });
        });
    },

    updateNote(req,res){
        //Edycja notatek
        const id = req.params.id;
        const title = req.body.title;
        const body = req.body.body;

        Note.findOne({ _id: id}).then((note)=>{
            note.title = title;
            note.body = body;
            note.save().then(()=>{
                res.status(201).json({note});
            }).catch((error)=>{
                res.satus(500).json({message : error.message})
            })
        }).catch((error) => {
            res.status(500).json({ message : error.message })
        });
    },

    deleteNote(req,res){
        //Usuwanie notatek
        const id = req.params.id;
        Note.deleteOne({_id:id}).then(()=>{
            //204 - wszystko poszło okej ale nic nie zwraca
            res.status(204).end();
        }).catch((error)=>{
            res.status(500).json({message : error.message})
        });
    },

    deleteNotes(req,res){
        //Usuwanie wszystkich notatek
        Note.deleteMany({}).then(()=>{
            //204 - wszystko poszło okej ale nic nie zwraca
            res.status(204).end();
        }).catch((error)=>{
            res.status(500).json({message : error.message})
        });
    }

}

