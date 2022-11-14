import { useState } from "react";
import SAMPLE_IMG from "./images/sample_image.jpg"
import CLOSE_IMG from "./images/close.png"
import IMAGE_1 from "./images/game-1.jpg"
import IMAGE_2 from "./images/game-2.jpg"
import IMAGE_3 from "./images/game-3.jpg"


// 리팩토링 하기 전
// export default function Home(props) {

//     const [ count, setCount ] = useState(0);

//     const onClickLink = () => {
//         window.open("http://www.daum.net");
//     }

//     const onClickLike = () => {
//         setCount(count + 1);
//     }

//     return(
//         <section className="container">
//             <ul className="list">
//             <li>
//                     <div className="card">
//                         <img src={SAMPLE_IMG} alt="샘플이미지" />
//                         <div className="text">
//                             <span className="title" onClick={onClickLink}>Chn & Kwon</span>
//                             <span className="label">변호사 및 법률 사무소</span>
//                             <span className="label">정현수 님 외 {count}명이 페이지를 좋아합니다</span>
//                         </div>
//                         <button onClick={onClickLike}>좋아요</button>
//                         <span className="btn-box">
//                             <img src={CLOSE_IMG} alt="닫기 버튼"/>
//                         </span>
//                     </div>
//                 </li>
//             </ul>
//         </section>
//     )
// }

// 1차로 반복적인 아이템을 리팩토링하자
export default function Home(props) {

    const [ count, setCount ] = useState(0);
    const [list, setList] = useState([
        {name: 'Cha & Kwon', title: '변호사 및 법률 사무소', text: '정천수 님 외 2명이 이 페이지를 좋아합니다.', img: IMAGE_1, count: 0},
        {name: '홍길동', title: '우리의 영웅', text: '홍길동의 무예는 1단 입니다.', img: IMAGE_2, count: 0},
        {name: '이순신', title: '임진왜란', text: '우리에겐 아직 12척의 배가 있습니다.', img: IMAGE_3, count: 0 }
    ])

    const onClickLink = () => {
        window.open("http://www.daum.net");
    }

    const onClickLike = (item) => {
        item.count = item.count + 1;
        // 변경된 리스트를 화면에 반영하고 싶다면
        setList([...list]);
    }

    return(
        <section className="container">
            <ul className="list">
                {/* 반복될 요소 */}
                {
                list.map(item => {

                    console.log(item);
                    return( 
                    <li>
                    <div className="card">
                            <img src={item.img} alt="샘플이미지" />
                                <div className="text">
                            <span className="title" onClick={onClickLink}>{item.name}</span>
                            <span className="label">{item.title}</span>
                            <span className="label">{item.text}</span>
                            <span className="label">{item.count}</span>
                        </div>
                        <button onClick={() => onClickLike(item)}>좋아요</button>
                        <span className="btn-box">
                         <img src={CLOSE_IMG} alt="닫기 버튼"/>
                            </span>
                        </div>
                    </li>
                )})
                    }
            </ul>
        </section>
    )
}