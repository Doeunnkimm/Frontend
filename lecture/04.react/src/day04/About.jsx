export default function About() {
    return (
        <div>
            <h3>About 화면입니다.</h3>
            <button onClick={() => window.location.href='/'}>홈가기</button>
            <button onClick={() => window.history.go(-1)}>뒤로가기</button>
        </div>
    )
}