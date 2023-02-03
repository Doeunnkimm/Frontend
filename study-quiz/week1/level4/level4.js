/* 
페이지네이션 구현하기
기초 변수
let totalPage = 80;
let currentPageIndx = 0;
let currentPage = new URLSearchParams(location.search).get('page') || 1;
*/

let totalPage = 80;
let currentPageIndex = 1;
let currentPage = new URLSearchParams(location.search).get('page') || 1;

const page_list = document.querySelector('.page_list');
const pre_btn = document.querySelector('.pre');
const next_btn = document.querySelector('.next');

let nowPage;
if (Number(currentPage) % 10 != 0) {
  nowPage = Math.floor(currentPage / 10);
} else {
  nowPage = Math.floor(currentPage / 10) - 1;
}

for (let i = 1; i <= 10; i++) {
  const page = document.createElement('button');

  const realPageIndex = nowPage * 10 + i;
  page.innerText = realPageIndex;

  page.addEventListener('click', () => {
    console.log('nowPage -->', nowPage);
    console.log('realPageIndex --> ', realPageIndex);
    console.log('currentPageIndex --> ', currentPageIndex);

    currentPageIndex = i;

    if (currentPageIndex != 10) {
      window.location.href = `/level4/level4.html?page=${realPageIndex}`;
    } else {
      window.location.href = `/level4/level4.html?page=${realPageIndex}`;
    }
  });

  page_list.appendChild(page);
}

pre_btn.addEventListener('click', () => {
  if (nowPage > 0) {
    window.location.href = `/level4/level4.html?page=${(nowPage - 1) * 10 + 1}`;
    nowPage--;
  }
});

next_btn.addEventListener('click', () => {
  if (nowPage < totalPage / 10) {
    window.location.href = `/level4/level4.html?page=${(nowPage + 1) * 10 + 1}`;
    nowPage++;
  }
});
