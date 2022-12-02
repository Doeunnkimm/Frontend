import React from 'react';

// // 리액트의 초창기 작성 방법으로 클래스 형식의 작성방법이다.
// // React의 Component라는 클래스를 day02A1에 상속하겠다
// export default class Day02A1 extends React.Component {
//     render() {
//         // 화면에 렌더를 할건데...
//         return (
//             // 가짜 부모를 만들 수 있다.
//             <> 
//             {/* 아래 내용을 반환하겠다. */}
//                 <div>안녕하세요</div>
//                 <div>부모는 반드시 하나여야 한다.</div>
//             </>
//         )
//     }
// }

// 근래에는 함수형 작성 방법을 더 많이 작성한다.
export default function Day02A1() {
    return (
        <>
            <div>안녕하세요</div>
            <div>부모는 반드시 하나여야 한다.</div>
        </>
    )
}