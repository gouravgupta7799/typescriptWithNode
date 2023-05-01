"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/', (req, res, next) => {
    let body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ todo: newTodo });
});
router.delete('/todo/:todoId', (req, res, next) => {
    let params = req.params;
    const todoIndex = todos.findIndex(todosItem => todosItem.id === req.params.todoId);
    if (todoIndex >= 0) {
        todos = todos.filter(todoItem => todoItem.id !== params.todoId);
        return res.status(200).json({ mes: 'deleted todo', todos: todos });
    }
    res.status(404).send('not found');
});
router.put('/todo/:todoId', (req, res, next) => {
    let params = req.params;
    let body = req.body;
    const tId = params.todoId;
    const todoIndex = todos.findIndex(todosItem => todosItem.id === tId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ msg: 'todo updated', todos: todos });
    }
    res.status(404).send('not found');
});
exports.default = router;
