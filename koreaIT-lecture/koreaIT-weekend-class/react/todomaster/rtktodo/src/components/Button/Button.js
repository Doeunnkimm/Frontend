import * as S from './style'

function Button(props) {
	// ...rest는 나머지 매개변수를 의미
	// 이걸로 한꺼번에 다 전달 가능함
	// children : 해당 태그 안에 있는 자식 엘리먼트들을 의미
	const { variant, shape, size, children, ...rest } = props

	return (
		<S.Button variant={variant} shape={shape} size={size} {...rest}>
			{children}
		</S.Button>
	)
}
export default Button
