#### 1. 문제 파악
- 문제의 요점 : 순차적으로 나열된 택배를 우선순위에 따라 옮길 수 있는 택배 수를 구하는 문제

#### 2. 내 풀이

``` javascript
function solution(order) {
  let result = 0;
  const stack = [];

  for (let i = 1; i <= order.length; i++) {
    stack.push(i);

    while (stack.length !== 0 && stack.at(-1) === order[result]) {
      stack.pop();
      result++;
    }
  }

  return result;
```

##### 풀이 방법
- 메인 트레일에 놓여진 박스는 FIFO방식이며, 서브트레일은 FILO방식의 stack방식이다. 그래서 먼저 order의 길이만큼 stack(서브트레일)에 main trail의 박스를 집어넣되, 하나씩 집어넣을 때 stack의 마지막 요소가 order의 현재 인덱스의 값이 일치하는지 체크하는 루프문을 추가했다. 만약 stack의 마지막 요소가 order의 현재 인덱스의 값이 일치했을 때, order의 인덱스는 올라가고 stack의 마지막 요소는 빠진 후 그 다음 요소를 체크해 계속 확인하는 방식으로 진행했다.

##### 느낀 점
솔직히 말해 이 문제는 약간 운빨로 풀긴 했다. stack을 사용해야 함은 알고 있었지만, 이를 활용해 문제를 풀기 위해 console.log로 stack을 확인해가며 하나씩 시도해서 풀었다. 만약 비슷한 문제를 푼 경험이 없다면 시간이 꽤 걸렸을 거라고 생각한다. 확실히 코딩테스트는 많이 풀어봐야함을 느꼈다.