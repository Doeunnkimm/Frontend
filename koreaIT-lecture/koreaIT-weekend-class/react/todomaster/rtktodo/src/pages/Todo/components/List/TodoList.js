import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from 'store/todo'
import TodoCard from './Card/Card'

function TodoList({ todoList }) {
	const dispatch = useDispatch()

	const onUpdateTodo = (id, content, state) => {
		dispatch(updateTodo({ id, content, state }))
	}

	const onDeleteTodo = id => {
		if (window.confirm('정말 삭제하시겠습니까?')) {
			// const deleteTodoList = todoList.filter((todo) => todo.id !== id);
			/* 새로운 배열을 반환하는 메소드는 이미 불변성을 지키고 있기 때문에 불변성을 지킬 필요가 없다*/
			dispatch(deleteTodo({ id }))
		}
	}

	return (
		<div>
			{/* 컴포넌트를 리턴 형태로 하면 중간에 디버깅도 가능 */}
			{todoList.map(todo => {
				console.log(todo)
				return (
					<TodoCard todo={todo} onEdit={onUpdateTodo} onDelete={onDeleteTodo} />
				)
			})}
			{/* 
        상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하기 위해
        props(속성)을/를 이용하여 데이터를 전달
      */}
		</div>
	)
}
export default TodoList

// fontawesome
//      npm i @fortawesome/free-solid-svg-icons
//      npm i @fortawesome/react-fontawesome
// styled-components || emotion
//      npm i styled-components
/*
css -in -js
    js 파일 안에 css을 정의 가능

    css을 모듈단위로 나누어 관리할 수 있다는 장점과
    하나의 js 파일 안에 css를 관리할 수 있다는 장점

    많은 개발자들이 사용하고 있는 이유는 유지보수가 쉽다는 점
    가독성이 굉장히 좋아짐

    따라서, reactJS와 vueJS와 같은 js 프론트엔드 프레임워크를
    사용할 경우는 scss 보다는 css -in -js를 많이 활용
 */
