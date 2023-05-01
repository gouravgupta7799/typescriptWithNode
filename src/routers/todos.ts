import { Router } from "express";

import { todo } from '../models/todo'

let todos: todo[] = [];
const router = Router();

type requstBody = {text :string}
type requstparams = {todoId :string}


router.get('/', (req, res, next) => {
  res.status(200).json({ todos: todos })
})

router.post('/', (req, res, next) => {
  let body = req.body as requstBody;
  const newTodo: todo = {
    id: new Date().toISOString(),
    text: req.body.text
  }
  todos.push(newTodo);
  res.status(201).json({ todo: newTodo })
})

router.delete('/todo/:todoId', (req, res, next) => {
  let params = req.params as requstparams;
  const todoIndex = todos.findIndex(todosItem => todosItem.id === req.params.todoId);
  if (todoIndex >= 0) {
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    return res.status(200).json({ mes: 'deleted todo', todos: todos });
  }
  res.status(404).send('not found')
})

router.put('/todo/:todoId', (req, res, next) => {
  let params = req.params as requstparams;
  let body = req.body as requstBody;
  const tId = params.todoId;
  const todoIndex = todos.findIndex(todosItem => todosItem.id === tId);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({ msg: 'todo updated', todos: todos });
  }
  
  res.status(404).send('not found')
})
export default router;