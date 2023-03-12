import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	todos: [],
	addTodoState: {
		loading: false,
		done: false,
		err: null,
	},

	getTodoState: {
		loading: false,
		done: false,
		err: null,
	},

	updateTodoState: {
		loading: false,
		done: false,
		err: null,
	},

	deleteTodoState: {
		loading: false,
		done: false,
		err: null,
	},
}
/*
	요청 보냄 -> loading: true, done: false, err: null

		=> 성공: loading: false, done: true, err: false
		=> 실패 : loading: false, done: true, err: true

	만약 전역으로 관리하고 있는 데이터라면 다른 곳에서도 그 데이터를 사용하고 있다
	따라서 이 요청과 응답 상태도 전역으로 관리한다
*/

export const todoSlice = createSlice({
	// slice는 여러 기능을 편리하게 설정하는 역할
	name: 'todo',
	initialState,
	extraReducers: builder => {
		// add todos
		// addCase : 자동 switch문으로 생각하면
		builder.addCase(addTodo.pending, state => {
			// addTodos가 pending 상태이면 다음 콜백함수를 실행한다
			// 미리 세팅되어 있는 미들웨어 덕분에
			// 콜백함수에 state를 넣어서 불변성을 알아서 지키게 되어있음
			state.addTodoState.loading = true
		})

		builder.addCase(addTodo.fulfilled, (state, action) => {
			// addTodos가 fulfilled 상태이면 다음 콜백함수를 실행한다
			state.todos.unshift(action.payload)
			state.addTodoState.loading = false
			state.addTodoState.done = true
			state.addTodoState.err = null
		})

		builder.addCase(addTodo.rejected, (state, action) => {
			state.addTodoState.loading = false
			state.addTodoState.done = true
			state.addTodoState.err = action.payload
		})
		// get todos

		// update todos

		// delete todos
	},
})

export const addTodo = createAsyncThunk('todo/addTodo', async todo => {
	// todo/addtodo은 타입임
	// todo는 action으로 전달받은 값이 됨
	const res = await axios.post('/api/todo', todo)
	return res.data
	// 여기서 실패하면 상위 에러 처리문으로 보내서
	// 에러 자체를 throw 해서 addTodoState.err 자체에 에러가 담길 것
})

export const getTodos = createAsyncThunk('todo/getTodos', async () => {
	return null
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async () => {
	return null
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async () => {
	return null
})

/*
 redux를 사용했을 때

	// 로딩 중일 때
	dispatch({
		type: 'todo/loading
	})

	// 성공 했을 때
	dispatch({
		type: todo/success
	})

	==> 이런 식으로 로딩중, 성공, 실패 경우를 따로따로 dispatch로 보냈어야 했음

	요청을 보내면 reducer는 미들웨어한테 백엔드에 요청해달라고 부탁들 함
	성공하면 그 값을 받으면 미들웨어는 reducer에게 성공했다 실패했다 알려주게 됨

	클라이언트 -> reducer ->  미들웨어 -> 서버 -> 미들웨어 -> reducer -> 클라이언트

		클라이언트는 reducer에게 미들웨어 실행시켜줘 하는 타입을 보내게 됨
		thunk라는 미들웨어가 감지를 하고 그걸 실행함
		이걸 reducer에게 처음에는 pending 상태를 보냄
		reducer는 이걸 또 받아서 loading 상태를 true라고 하고
		이때 미들웨어가 서버에서 데이터를 받게 되면 다시 reducer에게 성공했다고 알려줌
		그러면 이제 그걸 받은 reducer는 성공 로직을 실행함

		reducer는 동기적인 흐름만 가능해서 미들웨어가 필요함
		요청에 대한 응답은 비동기적으로 처리해야 하므로 미들웨어를 사용하는 것
*/

/*
	dispatch(요청) -- 미들웨어(thunk, addTodo) -- dispatch(대기중) -- reducer (o) -- 대기 중에 맞는 비즈니스 로직 실행(loading = true)

	---- 비동기 종료 후

	미들웨어 - dispatch(성공/실패) -- reducer (0) -- 성공이나 실패 비즈니스 로직 실행
*/
