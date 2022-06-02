import express from 'express';
import { wordsRouter } from './wordsRouter';

const app = express();

app.get('/', (req, res) => {
    res.json({ status: 'OK' });
});

app.use('/words', wordsRouter);

app.listen(Number(process.env.PORT || 8080), process.env.HOST || 'localhost', () => {
    console.log("OK", "http://localhost:8080");
});
