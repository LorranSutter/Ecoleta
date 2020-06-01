import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    console.log('Users listing');

    res.json([
        'Lorran',
        'Lorran2',
        'Lorran3'
    ]);
});

app.listen(5000);