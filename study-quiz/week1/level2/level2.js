import { RESERVATION_LIST } from './reservation .js';
console.log(RESERVATION_LIST);

/* 
예약 고객확인하기
#1 고객 리스트에 없는 고객정보의 경우 일치하는 항목이 없습니다라는 console.log와 함께 텍스트가 나타납니다.
#2 이름과 핸드폰 번호 모두 일치하지 않으면 고객은 검색할 수 없습니다.
#3 고객데이터가 있으면 고객번호가 텍스트로 나타납니다
*/
const nameInput = document.querySelector('input[name="user-name"]');
const phoneInput = document.querySelector('input[name="user-phone"]');
const reservationNumText = document.querySelector('#reservation-number');

document.addEventListener('click', () => {
  for (let info of RESERVATION_LIST) {
    if (info.name === nameInput.value && info.phone === phoneInput.value) {
      reservationNumText.innerText = info.number;
      break;
    } else if (
      (info.name != nameInput.value && info.phone === phoneInput.value) ||
      (info.name === nameInput.value && info.phone != phoneInput.value)
    ) {
      reservationNumText.innerText = '고객은 검색할 수 없습니다.';
      break;
    } else {
      reservationNumText.innerText = '일치하는 항목이 없습니다';
      break;
    }
  }
});
