# 문제 링크

[마법의 엘리베이터](https://school.programmers.co.kr/learn/courses/30/lessons/148653)

# 1. 내 풀이

```js
function solution(storey) {
  var answer = 0;
  // 1자릿수부터 하나씩 제거해가며 층이 0이 될 때까지 순회
  while (storey > 0) {
    const digit = storey % 10; // 현재 자릿수
    storey = Math.floor(storey / 10); // 현재 자릿수 제거한 다음 층

    if (digit < 5) {
      answer += digit; // 현재자릿수가 5미만이면 -연산을 함 => digit추가
    } else if (digit > 5) {
      answer += 10 - digit; // 5초과이면 +연산을 함 => 10-digit 추가
      storey += 1; // 윗자릿수 올림
    } else {
      // 5일때는 윗 자릿수 확인
      answer += digit;
      if (storey % 10 >= 5) {
        // 윗자리수가 5이상이면 올림
        storey += 1;
      }
    }
  }
  return answer;
}
```

### 문제요점

- 절대값이 10^c인 버튼
- 누르면 `현재 층 수 + 버튼` 으로 이동
- 0보다 작으면 움직이지 않음
- 버튼 한번에 마법돌 1개
- 0층으로 가는데 필요한 최소버튼

### 생각

- 큰 수 => 규칙 => 자릿수마다

### 문제풀이

맨 밑의 자릿수부터 하나씩 제거해가며 층이 0이 될 때까지 순회하는데
각 자릿수마다 엘리베이터를 올릴지, 내릴지를 판단해야한다

- 5미만은 digit 만큼 추가
- 5초과는 10-digit 만큼 추가하고 윗자릿수 올림
- 5일때는 윗자릿수에 따라 달라짐
  - 윗자릿수가 5이상이면 digit추가하고 윗자릿수 올림
  - 윗자릿수가 5미만이면 digit추가

# 2. 느낀 점

# 3. 배운 점

- 자릿수마다 계산하기
