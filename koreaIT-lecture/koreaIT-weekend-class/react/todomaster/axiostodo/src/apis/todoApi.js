import {Axios} from './core';

const PATH = '/todo';

const todoApi = {
  addTodo({title, content}) {
    return Axios.post(PATH, {title, content});
  },

  getTodo() {
    return Axios.get(PATH);
  },

  updateTodo(id, {content, state}) {
    return Axios.put(PATH + `/${id}`, {content, state});
  },

  deleteTodo(id) {
    return Axios.delete(PATH + `/${id}`);
  },
};

export default todoApi;
