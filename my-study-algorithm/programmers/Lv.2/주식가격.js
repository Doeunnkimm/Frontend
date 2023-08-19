/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/42584
 *
 * [주식가격]
 *
 * 문제 설명
 * 초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.
 *
 * 제한사항
 * prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
 * prices의 길이는 2 이상 100,000 이하입니다.
 *
 * ex.
 * input) prices: [1, 2, 3, 2, 3]
 * output) [4, 3, 1, 1, 0]
 */

function solution(prices) {
  let ans = []

  for (let i = 0; i < prices.length; i++) {
    let count = 0
    for (let j = 0; j < prices.length - i - 1; j++) {
      count++
      if (prices[i] > prices[i + j + 1]) {
        break
      }
    }
    ans.push(count)
  }
  return ans
}
