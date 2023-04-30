import express from 'express';
import bodyParser from 'body-parser';


import todosRouter from './routers/todos'


const app = express();

app.use(bodyParser.json())


app.use(todosRouter);


app.listen({ port: 4000 });