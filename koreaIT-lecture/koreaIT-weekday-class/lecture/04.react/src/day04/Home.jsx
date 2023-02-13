export default function Home() {
    return (
        <div>
            <h3>메인화면입니다.</h3>
            <button onClick={() => window.location.href='/'}>홈가기</button>
            <button onClick={() => window.history.go(-1)}>뒤로가기</button>
        </div>
    )
}