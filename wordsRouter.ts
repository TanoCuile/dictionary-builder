import express from 'express';
const { dictionaryDataReader, getYML, getCategories } = require("./services/reader");

export const wordsRouter = express.Router();

wordsRouter.post('/', (req, res) => {
    req.on("data", dictionaryDataReader);
    req.on('error', console.error);
    return req.on("end", () => {
        console.log("Finish...", getCategories(), getYML());
        res.write(JSON.stringify({ status: "OK" }));
        return res.end();
    });
});

wordsRouter.get('/', (req, res) => {
    return res.json(getYML());
})

wordsRouter.all('/', (req, res) => {
    res.json({ api: 'words', status: 'OK' });
});
