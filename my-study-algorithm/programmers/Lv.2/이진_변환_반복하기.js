/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/70129
 *
 * [이진 변환 반복하기]
 *
 * 문제 설명
 * 0과 1로 이루어진 어떤 문자열 x에 대한 이진 변환을 다음과 같이 정의합니다.
 *
 * x의 모든 0을 제거합니다.
 * x의 길이를 c라고 하면, x를 "c를 2진법으로 표현한 문자열"로 바꿉니다.
 * 예를 들어, x = "0111010"이라면, x에 이진 변환을 가하면 x = "0111010" -> "1111" -> "100" 이 됩니다.
 *
 * 0과 1로 이루어진 문자열 s가 매개변수로 주어집니다. s가 "1"이 될 때까지 계속해서 s에 이진 변환을 가했을 때, 이진 변환의 횟수와 변환 과정에서 제거된 모든 0의 개수를 각각 배열에 담아 return 하도록 solution 함수를 완성해주세요.
 *
 * ex.
 * input: "110010101001"
 * output: [3,8]
 */

function solution(s) {
  let ans = [0, 0]
  let temp = s

  while (temp !== '1') {
    ans[0] += 1
    ans[1] += temp.split('0').length - 1

    temp = temp.replaceAll('0', '')
    temp = temp.length.toString(2)
  }
  return ans
}
