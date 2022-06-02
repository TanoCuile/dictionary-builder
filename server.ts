import express from 'express';
import path from 'path';
import * as reader from './services/reader';
import { wordsRouter } from './wordsRouter';
import swagger from 'swagger-ui-express';
import { readFileSync } from 'fs';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use('/public', express.static(path.join(process.cwd(), 'static')));
app.get('/favicon.ico', (req, res) => { return res.sendFile(path.join(process.cwd(), 'static', 'favicon.png')) });

app.use('/api/doc', swagger.serve, swagger.setup(JSON.parse(
    readFileSync(path.join(process.cwd(), 'swagger.json')).toString()
)));

app.get('/', async (req, res) => {
    res.setHeader('Content-type', 'text/html');

    const cats = await reader.getCategories();

    return res.render('home.html.ejs', { existingCategories: Object.keys(cats) });
});

app.get('/category/:category_id', async (req, res) => {
    res.setHeader('Content-type', 'text/html');
    const cats = await reader.getCategories();
    return res.render('category.html.ejs', { phrases: cats[req.params.category_id] });
})

app.use('/words', wordsRouter);

reader.importData().then(() => app.listen(Number(process.env.PORT || 8080), process.env.HOST || 'localhost', () => {
    console.log("OK", "http://localhost:8080");
}));
