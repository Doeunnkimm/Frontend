/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/42583
 *
 * [다리를 지나는 트럭]
 *
 * 문제 설명
 * 트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 다리에는 트럭이 최대 bridge_length대 올라갈 수 있으며, 다리는 weight 이하까지의 무게를 견딜 수 있습니다. 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.
 *
 * 예를 들어, 트럭 2대가 올라갈 수 있고 무게를 10kg까지 견디는 다리가 있습니다. 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.
 *
 * 경과 시간	다리를 지난 트럭	다리를 건너는 트럭	대기 트럭
 * 0	[]	[]	[7,4,5,6]
 * 1~2	[]	[7]	[4,5,6]
 * 3	[7]	[4]	[5,6]
 * 4	[7]	[4,5]	[6]
 * 5	[7,4]	[5]	[6]
 * 6~7	[7,4,5]	[6]	[]
 * 8	[7,4,5,6]	[]	[]
 * 따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.
 *
 * solution 함수의 매개변수로 다리에 올라갈 수 있는 트럭 수 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭 별 무게 truck_weights가 주어집니다. 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.
 *
 * ex.
 * input: bridge_length: 10, weight: 10, trucks_weights: [7, 4, 5, 6]
 * output: 8
 */

function solution(bridge_length, weight, truck_weights) {
  let time = 0
  let bridge_on_truck = Array.from({ length: bridge_length }, () => 0)
  let weights_sum = 0

  // 맨 앞 트럭 이동
  time++
  bridge_on_truck.shift()
  weights_sum += truck_weights[0]
  bridge_on_truck.push(truck_weights.shift())

  // 다리 위애 올라간 트럭이 존재한다면
  while (weights_sum > 0) {
    // 다리 위에 있는 맨 앞 트럭 -> 다리를 나감
    time++
    weights_sum -= bridge_on_truck.shift() // 배열에서 빼면서 sum에서도 빼게 된다

    // 대기 트럭이 남아 있는데, 그 다음 트럭이 올라왔을 때 버틸 수 있는 무게라면
    if (truck_weights.length > 0 && weights_sum + truck_weights[0] <= weight) {
      weights_sum += truck_weights[0]
      bridge_on_truck.push(truck_weights.shift())
    } else {
      bridge_on_truck.push(0)
    }
  }
  return time
}

/**
 * 📝 NOTE
 *
 * Array.from({length: N}, () => 0)
 * 하게 되면 length로 주어진 길이만큼 0으로 채운 배열을 생성할 수 있다.
 */
