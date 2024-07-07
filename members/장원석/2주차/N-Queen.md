## 문제링크

https://school.programmers.co.kr/learn/courses/30/lessons/12952#qna

## 내풀이

```
function solution(n) {
    var answer = 0;

    const isSafe = (board, row, col) => {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'q') return false;
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'q') return false;
            if (col + (row - i) < n && board[i][col + (row - i)] === 'q') return false;
        }
        return true;
    }
    const placeQ = (board, row) => {
        if (row === n) {
            answer += 1;
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 'q';
                placeQ(board, row + 1);
                board[row][col] = ' ';
            }
        }
    }
    let board = Array.from({ length: n }, () => Array(n).fill(' '));
    placeQ(board, 0);


    return answer;
}
```

# 해설

잘 안풀려서 해설을 참고했습니다
board라는 이중 배열을 만들어서 실제로 q를 넣어가며 재귀 함수로 구현했고,
재귀 반복이 끝났을때 백트래킹으로 초기화해서 다른 경로를 탐색할 수 있게끔 했습니다.
isSafe함수는 현재 위치에 퀸을 배치할 수 있는지 없는지를 알아보기 위한 함수입니다.
같은 열에, 대각선에 퀸이 있는지 없는지 조사합니다.
재귀 반복을 n만큼 돌았다면, 퀸을 전부 성공적으로 배치했다는 뜻이므로 answer를 1업시켜줍니다.
최종적으로 카운트된 answer를 반환합니다.

# 채점 결과

채점 결과
정확성: 100.0
합계: 100.0 / 100.0
