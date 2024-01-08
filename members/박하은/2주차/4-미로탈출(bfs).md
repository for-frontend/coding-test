# 문제 링크

[미로 탈출](https://school.programmers.co.kr/learn/courses/30/lessons/159993) 
 
# 1. 내 풀이

P: 미로 문자열 배열 maps
R: 미로를 탈출하는데 필요한 최소 시간. 탈출할 수 없으면 -1
E:
P: S->L->E로 가야함
- visited 재방문 가능하다 (= S->L 이동 이후에 리셋해줘야함)

```js
function getPosition(board, char) {
    let [x,y] = [0,0];
    const boardLength = board.length;
    for (let i=0; i<boardLength; i++) {
        if(board[i].includes(char)) {
            x = i;
            y = board[i].indexOf(char);
        }
    }
    return [x,y]
}

function solution(maps) {
    let answer = 0;
    const xLength = maps.length;
    const yLength = maps[0].length;
    const dx = [-1,1,0,0];
    const dy = [0,0,-1,1];

    let visited = new Array(xLength).fill().map(_ => new Array(yLength).fill(false));

    function isMovable(x, y) {
        if(x<0 || x >= xLength || y < 0 || y >= yLength) {
            return false;
        } else if (maps[x][y] === 'X') {
            return false;
        }
        return true;
    }

    if(!bfs('S', 'L')) return -1; // S->L
    if(!bfs('L', 'E')) return -1; // L->E

    function bfs(startChar, endChar) {
        const [startX, startY] = getPosition(maps, startChar);
        const [endX, endY] = getPosition(maps, endChar);

        let queue = [{x: startX, y: startY, count: 0}];
        visited[startX][startY] = true;

        while(queue.length) {
            let {x, y, count} = queue.shift();

            // 찾는 문자에 도착했으면 설정 리셋 후 리턴
            if(x === endX && y === endY) {
                queue = [];
                visited = new Array(xLength).fill().map(_ => new Array(yLength).fill(false));
                answer += count;
                return count;
            }

            for(let i=0; i<4; i++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
                if(isMovable(nx, ny) && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.push({x:nx, y:ny, count: count+1});
                }
            }
        }
        return false;
    }
    return answer;
}
```


# 2. 느낀 점

- 2주차 1번인 리코쳇로봇과 거의 틀이 비슷하고 S->L, L->E를 할때 처음에 설정을 리셋해주면 된다는 부분만 달라서 
비교적 빠르게 풀 수 있었습니다. 

# 3. 배운 점