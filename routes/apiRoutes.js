const router = require('express').Router();
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', async (req,res) => {
    const dbjson = await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

    res.json(dbjson);
});

router.post('/api/notes', (req,res) => {
    const dbjson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };

    dbjson.push(newFeedback);

    fs.writeFileSync('db/db.json', JSON.stringify(dbjson));
    res.json(dbjson);
});

router.delete('/api/notes/:id', (req,res) => {
    let data = fs.readFileSync('db/db.json', 'utf8');

    const dataJ = JSON.parse(data);
    const newNotes = dataJ.filter((note) => {
        return note.id !== req.params.id;
    });
    
    fs.writeFileSync('db/db.json', JSON.stringify(newNotes));
    res.json('Not had been removed');
});

module.exports = router;
