import Button from "./Button"

export default function About(props) {
  return(
    <div>
      {/* <Button /> */}
      <h3 className="text-5xl font-bold mt-20 text-center">회사소개</h3>
      <div className="mt-20 flex h-{500px}">
        <div className="text-left w-1/2 text-2xl leading-{50px} pt-10">
          <h3 className="text-4xl mb-6 font-bold">Story</h3>
          <span>
            2020년, 우리는 시장에서 사라질 뻔 했습니다. 그러나,
            <span className="text-yellow-400 px-3">위기를 기회로</span>
            바꾸는 도전 정신이 지금의 튼튼한 기업을 만들었습니다.
          </span>
        </div>
        <div className="w-1/2 inline-block pl-4 pt-24 border-l border-stone-500">
          <ul className="text-xl">
            <li className="mt-2 pb-6 border-b border-stone-600">
              <span className="text-4xl mr-10">2022</span>
              <span className="text-lg">파이낸션 타임즈 선정</span>
            </li>
            <li className="mt-2 pb-6 border-b border-stone-600">
              <span className="text-4xl mr-10">2021</span>
              <span className="text-lg">알토스벤처스 단독 투자 유치</span>
            </li>
            <li className="mt-2 pb-6 border-b border-stone-600">
              <span className="text-4xl mr-10">2020</span>
              <span className="text-lg">대만 서비스 런칭</span>
            </li>
            <li className="mt-2 pb-6 border-b border-stone-600">
              <span className="text-4xl mr-10">2019</span>
              <span className="text-lg">사이트 개설 10만개 돌파</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
