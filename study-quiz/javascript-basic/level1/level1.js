/*
배열 나누기
함수 division 특정한 배열을 내가 원하는 원소의 갯수를 길이로 가진 배열들로 분해하려고한다
이후, 해당 배열들을 요소로 갖는 배열을 반환한다
ex) 길이기 80인 배열은 길이가 5로 분해한다면 16개의 배열을 요소로 갖는 배열을 반환한다
*/

function division(arr, n) {
  let result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}

const arr = [1, 2, 3, 4, 5];
console.log(division(arr, 2));

// arr = [1,2,3,4,5]
// divition(arr, 2); === [ [1,2], [3,4], [5] ]

/*
--NOTE--
splice를 사용했는데 -> splice는 원본 배열 자체를 건드려버려서
splice를 처음 하는 순간 배열이 망가져서 for문이 제대로 돌지 못했음
배열을 모두 돌면서 인덱스로 배열을 추출하려면
원본을 건드리지 않는 slice를 사용하자
--------
*/
