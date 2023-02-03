/* 
페이지네이션 구현하기
기초 변수
let totalPage = 80;
let currentPageIndx = 0;
let currentPage = new URLSearchParams(location.search).get('page') || 1;
*/

let totalPage = 80;
let currentPageIndex = 0;
let currentPage = new URLSearchParams(location.search).get('page') || 1;

const page_list = document.querySelector('.page_list');
const pre_btn = document.querySelector('.pre');
const next_btn = document.querySelector('.next');

for (let i = 1; i <= 10; i++) {
  const page = document.createElement('span');
  page.innerText = i * (currentPageIndex + 1);

  page.addEventListener('click', () => {
    currentPage = Number(currentPage);
    let nowPage = Math.floor(currentPage / 10);

    currentPageIndex =
      Number([...String(currentPage).split('')].join('')) - (currentPage % 10);

    if (page.innerText != '10') {
      window.location.href = window.location.href = `/level4/level4.html?page=${
        currentPageIndex + Number(page.innerText)
      }`;
    } else {
      window.location.href = window.location.href = `/level4/level4.html?page=${
        (nowPage + 1) * 10
      }`;
    }
  });

  page_list.appendChild(page);
}

pre_btn.addEventListener('click', () => {
  if (currentPage > 10) {
    currentPageIndex -= 10;

    window.location.href = `/level4/level4.html?page=${
      Number(currentPage) - 10
    }`;
  }
});

next_btn.addEventListener('click', () => {
  if (currentPage < totalPage) {
    currentPageIndex += 10;

    window.location.href = `/level4/level4.html?page=${
      Number(currentPage) + 10
    }`;
  }
});
