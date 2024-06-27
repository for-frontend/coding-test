# 문제 링크

[무인도 여행](https://school.programmers.co.kr/learn/courses/30/lessons/154540)

# 1. 내 풀이

P: 식량의 개수가 적힌 지도 maps
R: 각 섬에 최대 며칠씩 머물수 있는지 담은 배열 (오름차순으로 정렬) (지낼 수 있는 무인도가 없다면 -1만 담긴 배열)
E:
P:
- 0,0을 시작으로 상하좌우 탐색
- DFS 반복
    - 노드의 값이 X면 넘어감
    - 노드의 값이 숫자면 연결된 섬용 배열을 만들어 누적
    - 마지막으로 배열에 아무것도 없으면 -1만 담아 리턴

```javascript
function solution(maps) {
    const newMaps = maps.map(str => str.split(''));
    const dx = [0,0,-1,1];
    const dy = [1,-1,0,0];
    const rowLength = newMaps.length;
    const colLength = newMaps[0].length;

    var result = [];
    for(let i=0;i<rowLength; i++) {
        for(let j=0; j<colLength; j++) {
            // x인지 확인
            if(newMaps[i][j] !== 'X') {
                // X가 아니면 dfs 시작
                const start = newMaps[i][j];
                newMaps[i][j] = 'X';
                result.push(DFS(i,j,start));
            }
        }
    }

    function DFS(x, y, acc) {
        let sum = Number(acc);
        // 상하좌우 탐색
        for(let i=0; i<4; i++) {
            const newX = x + dx[i];
            const newY = y + dy[i];
            // 범위 안 넘는지 확인
            if(newX >= 0 && newY >= 0 && newX < rowLength && newY < colLength) {
                if(newMaps[newX][newY] !== 'X') {
                    const next = newMaps[newX][newY];
                    newMaps[newX][newY] = 'X';
                    sum += DFS(newX, newY, next);
                }
            }
        }
        return sum;
    }
    return result.length > 0 ? result.sort((a,b)=>a-b) : [-1]
}
```

# 2. 느낀 점


# 3. 배운 점