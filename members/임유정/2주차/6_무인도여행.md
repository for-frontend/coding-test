# 문제 링크

[무인도 여행](https://school.programmers.co.kr/learn/courses/30/lessons/154540)

# 1. 내 풀이

```js
function solution(maps) {
  var answer = [];
  const rowLen = maps.length;
  const colLen = maps[0].length;
  const visited = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  for (let r = 0; r < rowLen; ++r) {
    for (let c = 0; c < colLen; ++c) {
      // 방문한 적없는 섬을 발견함
      if (maps[r][c] !== "X" && !visited[r][c]) {
        visited[r][c] = true;
        answer.push(getFood(r, c)); // 섬안의 식량을 구함
      }
    }
  }

  function getFood(r, c) {
    let totalFood = 0;
    const queue = [{ r, c }];
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];

    while (queue.length) {
      const { r, c } = queue.shift();
      totalFood += Number(maps[r][c]); // 식량 추가
      for (let i = 0; i < 4; ++i) {
        const nextR = r + dr[i];
        const nextC = c + dc[i];

        if (
          nextR >= 0 &&
          nextR < rowLen &&
          nextC >= 0 &&
          nextC < colLen &&
          maps[nextR][nextC] !== "X" &&
          !visited[nextR][nextC]
        ) {
          visited[nextR][nextC] = true;
          queue.push({ r: nextR, c: nextC }); // 방문한 적없는 연결된 섬 추가
        }
      }
    }
    return totalFood;
  }
  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}
```

## 풀이 방법

### 문제정리

- x: 바다, 숫자: 무인도안의 식량
- 각 무인도당 존재하는 식량의 오름차순 배열 리턴
- 무인도가 없으면 -1

# 2. 느낀 점

- bfs, dfs중 어떤것이 더 적절할지 고민했는데 dfs는 한 경우를 끝까지 진행하는 반면에 bfs는 가능한 경우 들이 같이 확산되기 때문에 더 빨리 찾을거라 생각하여 bfs를 사용했다.
- visited는 모든 경우에서 동일하게 사용된다.

# 3. 배운 점
