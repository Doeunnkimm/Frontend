import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, faPen } from '@fortawesome/free-solid-svg-icons'
import { flexCenter, flexAlignCenter } from 'styles/common'
import { useState } from 'react'
import useInput from 'hooks/useInput'

function TodoCard({ todo, onEdit, onDelete }) {
	// props의 데이터가 적을 때는 매개변수에 구조분해 할당
	// props의 데이터가 많다면 컴포넌트 안에서 구조분해 할당 변수/상수 선언
	// const {onEdit} = props;
	const { id, state, title, content } = todo

	const [isTodoEdit, setIsTodoEdit] = useState(false)
	const [editcontent, onChangeEditContent] = useInput(content)

	const onSetIsTodoEditTrue = () => {
		setIsTodoEdit(true)
	}

	const onClickTodoEditBtn = () => {
		if (editcontent === content) return setIsTodoEdit(false) // 수정 사항이 없다면 그냥 함수 탈출
		onEdit(id, editcontent, state)
		setIsTodoEdit(false)
	}

	const onClickTodoStateEditBtn = () => {
		onEdit(id, content, !state)
	}

	return (
		<S.Wrapper state={state}>
			<S.Header>
				<S.StateBox state={state} onClick={onClickTodoStateEditBtn}>
					<FontAwesomeIcon icon={faCheck} />
				</S.StateBox>
				<S.Title state={state}>
					{title}
					<div>
						<FontAwesomeIcon
							icon={faPen}
							onClick={isTodoEdit ? onClickTodoEditBtn : onSetIsTodoEditTrue}
						/>
						<FontAwesomeIcon icon={faBan} onClick={() => onDelete(id)} />
					</div>
				</S.Title>
			</S.Header>
			<S.Content state={state}>
				{isTodoEdit ? (
					<textarea
						value={editcontent}
						onChange={onChangeEditContent}
					></textarea>
				) : (
					content
				)}
			</S.Content>
		</S.Wrapper>
	)
}

export default TodoCard

const Wrapper = styled.li`
	width: 100%;
	background-color: ${({ theme }) => theme.PALETTE.white};
	border: 1px solid #999;
	margin: 16px 0;
	border-radius: 8px;
	list-style: none;
	background-color: ${({ state, theme }) =>
		state ? theme.PALETTE.gray[200] : theme.PALETTE.white};
`

const Header = styled.div`
	border-bottom: 1px dotted #999;
	${flexAlignCenter};
	padding: 8px 16px;
	height: 48px;
`

const Title = styled.h1`
	width: 100%;
	display: flex;
	justify-content: space-between;
	font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
	text-decoration: ${({ state }) => (state ? 'line-through' : 'none')};
	& svg {
		cursor: pointer;
		margin-left: 16px;
		:hover {
			transform: scale(1.2);
		}
	}
`

const StateBox = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	margin-right: 8px;
	${flexCenter};
	color: ${({ state }) => (state ? '#3CB371' : '#999')};
	cursor: pointer;
	:hover {
		transform: scale(1.2);
	}
`

const Content = styled.div`
	padding: 16px;
	text-decoration: ${({ state }) => (state ? 'line-through' : 'none')};
	& textarea {
		width: 100%;
		height: 100%;
		border: 1px dotted #999;
		outline: none;
		resize: none;
	}
`

const S = {
	Wrapper,
	Header,
	StateBox,
	Title,
	Content,
}
