import { createAction } from '../utils/createAction'
import { createContext, useReducer, useContext } from 'react'

// 전역으로 관리하고 싶은 값
const initialState = [
	{
		id: 1,
		title: 'example1',
		content: 'content1',
		state: false,
	},
]

const TodoListContext = createContext()
const TodoDispatchContext = createContext()

// 전역에서 사용할 저장소
export const useTodoListState = () => useContext(TodoListContext)
export const useTodoDispatch = () => useContext(TodoDispatchContext)

export const ADD_TODO = createAction('ADD_TODO')
export const DELETE_TODO = createAction('DELETE_TODO')
export const UPDATE_TODO = createAction('UPDATE_TODO')

// Reducer 구현
const todoReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [action.payload, ...state]

		case 'DELETE_TODO':
			return state.filter(todo => todo.id !== action.payload.id)

		case 'UPDATE_TODO':
			const newTodo = [...state]
			const todoIndex = newTodo.findIndex(todo => todo.id === action.payload.id)
			newTodo[todoIndex].content = action.payload.content
			newTodo[todoIndex].state = action.payload.state
			return newTodo

		default:
			return state
	}
}

const TodoProvider = ({ children }) => {
	const [todoList, dispatch] = useReducer(todoReducer, initialState)

	return (
		<TodoListContext.Provider value={todoList}>
			<TodoDispatchContext.Provider value={dispatch}>
				{children}
			</TodoDispatchContext.Provider>
			{/* 
        비어있는 저장소에 value로 값을 채워서 Provider로 만들고
        하위 컴포넌트들(children)도 사용할 수 있도록
      */}
		</TodoListContext.Provider>
	)
}

export default TodoProvider
