#### 1. 문제 파악
- 문제의 요점 : 너비우선탐색 BFS방식을 통해 최단거리를 구하는 방식

#### 2. 내 풀이
``` javascript
function findDistance(maps, start, target) {
    var moveCount = 0;
    let moveX = [1,-1,0,0];
    let moveY = [0,0,1,-1];

    var goX = 0;
    var goY = 0;
    
    maps[start[0]][start[1]] = 'X'
    
    var queue = [start];
    
    while (queue.length > 0) { 
        var size = queue.length;
        for(var i=0; i<size; i++){
            let [x,y] = queue.shift();
            for(var k = 0;k<4;k++) {
                goX = x + moveX[k];
                goY = y + moveY[k];
                if(goX>=0 && goX<maps.length && goY>=0 && goY<maps[0].length && maps[goX][goY]!=='X'){
                    if(maps[goX][goY] === target){
                        return moveCount+1;
                    } else {
                        queue.push([goX,goY]);
                        maps[goX][goY] = 'X';   
                    }
                } else {
                    continue;
                }
            }
        }
        moveCount++;
    }
    
    return -1;
}

function solution(maps) {
    var answer = 0;
    var findLever = -1;
    var findExit = -1;

    var start = [];
    var lever = [];
    
    // Find Start Point, Lever Point (Starting Point)
    for(let i=0; i<maps.length; i++) {
        for(let k=0; k<maps[i].length; k++) {
            if(maps[i][k] === "S") {
                start = [i,k];  
            } else if(maps[i][k] === "L") {
                lever = [i,k];
            } 
        }
    }
    
    let mapsLever = maps.map(item => item.split(''));
    let mapsExit = maps.map(item => item.split(''));
    findLever = findDistance(mapsLever, start, 'L');
    findExit = findDistance(mapsExit, lever, 'E');

    if (findLever !== -1 && findExit !== -1) {
        answer = findLever + findExit;   
    } else {
        answer = -1;
    }
    
    return answer;
}
```
##### 풀이 방식
- 우선적으로 start포인트, lever포인트를 찾아야 한다고 생각했다.
- 그렇게 잡은 start포인트와 lever포인트를 사용하여, start -> lever , lever -> end까지의 두번의 최단거리를 찾아, 찾은 두개의 최단거리를 더해 최종값을 반환하는 구조로 설계했다.
- javascript에서 함수로 인자값을 보낼 경우, 파라미터의 값이 변경되는 문제가 발견해, mapsLever, mapsExit 두개의 map을 구성하여 진행하였다.
- 최단거리를 구하는 알고리즘으로 BFS를 사용하였으며, queue의 값이 모두 없어질 때까지 무한루프를 돌면서, 만약 target이 발견되어 횟수를 return 하여 탈출하거나 모두 없어졌음에도 target을 발견하지 못한 경우에는 탈출 불가능으로 간주하여 -1을 반환하는 로직으로 설계했다.

##### 느낀 점
코딩테스트 lv2를 이번에 본격적으로 처음 접해봤는데, 확실히 자료구조의 구현 방법에 대해 공부 및 연구할 필요성을 느꼈다. 특히 이번 문제는 BFS를 사용하지 않으면 타임아웃으로 실패를 뜬 것을 확인하여, 이를 해결하고자 javascript로 BFS를 공부 및 구현하는 데에 집중을 하여 해결하였다. 이를 통해 자료구조 공부의 필요성을 느꼈고, 이를 활용하면 협업에서 성능 개선에 큰 도움을 줄 것으로 생각이 되었다.