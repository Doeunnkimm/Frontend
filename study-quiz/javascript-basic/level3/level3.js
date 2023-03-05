/* 
레시피 재료 추가하기

1. 레시피는 각각 재료와 무게를 입력하면 아래 테이블에 데이터가 추가됩니다.
2. 같은 이름의 재료는 추가할 수 없습니다.
3. 각각의 재료는 삭제버튼이 존재하며 삭제를 누르면 테이블에서 데이터가 삭제됩니다.
4. 제출 버튼을 누르면 현재 테이블에 나와있는 데이터가 key: value와 같은 형태로 재료:무게로 나타납니다.
*/

const receiptTable = [];
const ingredient = document.querySelector('input[name="ingredient"]');
const weight = document.querySelector('input[name="weight"]');
const tr = document.querySelector('.thead');
const submitBtn = document.querySelector('#submit_button');
const lastReceipt = document.querySelector('#ingredient-list');

let dupli = false;

document.addEventListener('submit', (e) => {
  e.preventDefault();

  // 화면에 보여지는 부분
  for (let i = 0; i < receiptTable.length; i++) {
    if (receiptTable[i].ingredient === ingredient.value) {
      dupli = true;
      break;
    } else {
      dupli = false;
    }
  }
  if (!dupli) {
    const newTr = document.createElement('tr');
    tr.after(newTr);

    const newIngredient = document.createElement('th');
    const newWeight = document.createElement('th');
    const deleteTr = document.createElement('th');
    const deleteBtn = document.createElement('button');

    newTr.appendChild(newIngredient);
    newTr.appendChild(newWeight);
    newTr.appendChild(deleteTr);
    deleteTr.appendChild(deleteBtn);

    newIngredient.innerText = ingredient.value;
    newWeight.innerText = weight.value;
    deleteBtn.innerText = '삭제';

    // 재료&무게 배열에 저장
    receiptTable.push({ ingredient: ingredient.value, weight: weight.value });
    // console.log(receiptTable);

    // 삭제 버튼 눌렀을 때 이벤트 함수
    const onClickDelete = () => {
      newTr.remove();
      for (let i = 0; i < receiptTable.length; i++) {
        if (receiptTable[i].ingredient === newIngredient.innerText) {
          receiptTable.splice(i, 1);
          break;
        }
      }

      console.log(receiptTable);
    };

    deleteBtn.addEventListener('click', onClickDelete);

    // 제출 버튼 눌렀을 때
    const onClickSubmit = () => {
      let result = '';
      receiptTable.forEach((item) => {
        result += item.ingredient + ' : ' + item.weight + '\n';
      });
      lastReceipt.innerText = result;
    };

    submitBtn.addEventListener('click', onClickSubmit);
  }
});
