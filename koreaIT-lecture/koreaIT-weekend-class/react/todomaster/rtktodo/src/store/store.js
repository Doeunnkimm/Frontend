import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { rootReducer } from './@root'

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV === 'development', // true일 때는 사용, false일 때는 사용 X
	middleware: defaultMiddleware => {
		// rtk가 가지고 있는 기본 미들웨어들
		if (process.env.NODE_ENV === 'development') {
			return [...defaultMiddleware(), logger]
			/* 위와 같이 기존의 미들웨어를 가지고 오지 않으면 logger만 사용으로 덮어버림 */
		}
		return defaultMiddleware()
	},
})

/*
	🔥 redux-toolkit 사용하는 방법 순서 정리 🔥

	1. rootReducer를 만든다
		ex) export const rootReducer = combineReducers({})

	2. store를 만든다 <-- 이 store는 전역에서 사용할 즉, rootReducer 및 미들웨어가 담겨있다.
		ex) 
			export const store = configureStore({
				reducer: rootReducer,
				devTools: process.env.NODE_ENV === 'development', // true일 때만 사용하겠다
				middleware: defaultMiddleware => {
					if (process.env.NODE_ENV) {
						return [...defaultMiddleware(), logger]
					}
					return defaultMiddleware()
				}
			})

	3. rootReducer 안에 들어가는 reducer를 만들어준다
		rtk에서 reducer는 미들웨어가 서버와 비동기적으로 통신한 내용을 받아서 클라이언트에게 주는 역할을 한다
		또한 클라이언트는 reducer에게 요청을 하면 reducer는 미들웨어에게 서버와 비동기적으로 통신해달라고 요청을 한다

		ex) todo.js 파일 <-- 전역으로 관리할 todoList와 관련된 로직을 작성한다

			(1) initialState를 작성한다(초기값이 된다)
				ex) const initialState = {
					todos: [], // 실제 todoList
					
					addTodoState: {
						loading: false,
						done: false,
						err: null,
					}, ...

					// todos와 관련된 비동기 로직의 상태를 모두 작성해 준다.
					
					getTodoState: {...},
					updateTodoState: {...},
					deleteTodoState: {...}
				}

				클라이언트가 요청을 보내면 reducer는 미들웨어에게 서버에게 요청을 보내달라고 하면 --> loading: true, done: false, err: null
				-> 미들웨어가 서버에게 요청을 보내고 응답을 받아오는 데 성공하면 --> loading: false, done: true, err: false
				->													   실패하면 --> loading: false, done: true, err: true

			(2) 미들웨어가 작동할 로직을 만든다
				ex)	export const addTodo = createAsyncThunk('todo/addTodo', async todo => {
					// 'todo/addTodo'는 타입
					// 파라미터의 todo는 action으로 전달받은 값이 됨
					const res = await axios.post('/api/todo', todo)
					})

					export const getTodos = createAsyncThunk('todo/getTodos', async () => {
						return ...
					})

					export const updateTodo = ...

					export const deleteTodo = ...
				

			(3) slice를 작성한다 <-- initialState와 업데이트하는 로직이 담겨있다
				-> 따라서 이걸 rootReducer에 담을 것이다 !!!

				slice는 redux에서 switch문으로 작성했던 state를 업데이트 하는 로직을 작성하고
				추가적인 기능 및 정보들을 작성할 수 있다
				
				ex) export const todoSlice = createSlice({
					name: 'todo',
					initialState,
					extraReducers: builder => {
						// reducer는 다음과 같은 상황일 때 그 다음 콜백함수를 실행하게 된다
					
						// add todo를 하는 요청이 와서 미들웨어가 pending 상태라면
						builder.addCase(addTodo.pending, state => {
							state.addTodoState.loading = true
						})
						// add todo를 하는 요청이 와서 미들웨어가 성공했다고 하면
						builder.addCase(addTodo.fulfilled, (state, action) => {
							state.todos.unshift(action.payload)
							state.addTodoState.loading = false
							state.addTodoState.done = true
							state.addTodoState.err = null
						})
						// add todo를 하는 요청이 와서 미들웨어가 실패했다고 하면
						builder.addCase(addTodo.rejected, (state, action) => {
							state.addTodoState.loading = false
							state.addTodoState.done = true
							state.addTodoState.err = action.payload
						})
						
						// get todo 요청 관련 상태 로직

						// update todo 요청 관련 상태 로직

						// delete todo 요청 관련 상태 로직
						},
					})
				
	
	4. 2에서 만든 store에 1에서 만든 rootReducer를 담아준다.
		우리는 1에서 initialState를 선언하고, 이 서버와 비동기 통신을 하는 미들웨어를 선언하고,
		이 모든 것들을 todoSlice를 선언해서 createSlice() 안에 initialState를 넣었고, 이 initialState를 업데이트 하는 로직을
		서버와 비동기 통신을 하는 미들웨어를 통해 작성했었다.

		따라서 이 createSlice()로 만든 todoSlice를 rootReducer 안에 넣어준다


			ex) export const rootReducer = combineReducers({todo: todoSlice.reducer})
				※ rootReducer 안에는 reducer들이 담겨있다.
					그런데 모든 정보가 담겨있는 todoSlice에는 name, initialState, reducer가 객체형태로 담겨있기 때문에
					todoSlice.reducer를 rootReducer에 담아주는 것이다

*/
