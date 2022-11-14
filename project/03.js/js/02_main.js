window.onload = function() {
    console.log("메인 화면 로딩 완료");

    // 일단 template태를 가져와 보자
    const tcard = document.querySelector("#temp-card");
    console.log(tcard.innerHTML);

    const li = document.createElement('li')
    li.innerHTML = tcard.innerHTML;
    console.log(li.innerHTML);

    // 그리고 화면에 추가해보자
    const frame = document.querySelector("#ul-frame");
    // frame.appendChild(li);
    // frame.appendChild(li);

    // frame.appendChild(li.cloneNode(true));
    // frame.appendChild(li.cloneNode(true));
    // frame.appendChild(li.cloneNode(true));

    const list = request.mainlist();

    list.forEach((item) => {
        console.log(item)

        const element = li.cloneNode(true);

        let html = element.innerHTML;

        // 아이콘 교체
        html = element.innerHTML.replace("{icon}", item.icon);
        html = html.replace("{title}", item.title);
        html = html.replace("{label}", item.label);
        html = html.replace("{company}", item.company);
        html = html.replace("{text}", item.text);
        html = html.replace("{img}", item.img);

        // 수정된 HTML을 다시 DOM element(요소)에 반영
        element.innerHTML = html;

        // 부모의 자식 요소로 추가
        frame.appendChild(element);
    })
}