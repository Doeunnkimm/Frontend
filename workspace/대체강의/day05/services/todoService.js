const Todo = require('../models/todo');

module.exports = class TodoService {
    static async create(req, res, next) {
        try {
            const todo = await Todo.create({
                title: req.body.title,
                content: req.body.content,
            });

            res.status(200).json(todo);
        } catch (err) {
            console.log(err);
        }
    }

    static async read(req, res, next) {
        try {
            const todo = await Todo.findAll({
                order: [['createdAt', 'DESC']],
            });
            res.status(200).json(todo);
        } catch (err) {
            console.log(err);
        }
    }

    static async update(req, res, next) {
        try {
            const todo = await Todo.findOne({
                where: { id: parseInt(req.params.todoId, 10) },
            });

            if (!todo) {
                res.status(400).json({ message: '존재하지 않는 목록입니다' });
            }

            await Todo.update(
                {
                    content: req.body.content,
                    state: req.body.state,
                },
                {
                    where: {
                        id: parseInt(req.params.todoId, 10),
                    },
                }
            );

            const updateTodo = await Todo.findOne({
                where: { id: parseInt(req.params.todoId, 10) },
            });

            res.status(200).json(updateTodo);
        } catch (err) {
            console.log(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const todo = await Todo.findOne({
                where: { id: parseInt(req.params.todoId, 10) },
            });

            if (!todo) {
                res.status(400).json({ message: '존재하지 않는 목록입니다' });
            }

            await Todo.destroy({
                where: { id: parseInt(req.params.todoId, 10) },
            });
            res.status(200).json(parseInt(req.params.todoId, 10));
        } catch (err) {
            console.log(err);
        }
    }
};
