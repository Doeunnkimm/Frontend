const express = require('express');
const jwtAuth = require('../middleware/jwtAuth');
const TodoService = require('../services/todoService');
const router = express.Router();

router.post('/', jwtAuth, TodoService.create);
router.get('/', jwtAuth, TodoService.read);
router.put('/:todoId', jwtAuth, TodoService.update);
router.delete('/:todoId', jwtAuth, TodoService.delete);

module.exports = router;
