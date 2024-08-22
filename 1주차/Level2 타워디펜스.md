#### 1. 문제 파악
- 무적권을 사용하여 유저가 주어진 유닛 수로 최대로 갈 수 있는 라운드의 수를 구하는 문제
#### 2. 내 풀이 및 풀이방법
``` javascript
function findMax(arr){
    var maxIndex = 0;
    for(var i=0;i<arr.length;i++){
        if(arr[maxIndex] < arr[i]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

function solution(n, k, enemy) {
    var answer = 0;
    var enemySum = 0;
    var faceEnemy = [];
    for(var r=0; r<enemy.length; r++) {
        faceEnemy.push(enemy[r]);
        enemySum += faceEnemy[r];
        if(n < enemySum) {
            if(k>0) {
                var maxIndex = findMax(faceEnemy);
                enemySum -= faceEnemy[maxIndex];
                faceEnemy[maxIndex] = 0;
                k=k-1;
            } else {
                return faceEnemy.length-1;
            }
        }
    }
    
    return enemy.length;
}

```
처음 로직을 짤 때는 
1. enemy 하나씩 더해서 n보다 커질 때를 체크
2. n보다 커질 때, 무적권(k)를 사용해 가장 큰 값을 0으로 변경
3. 가장 큰 값을 제거한 후 그 이후 enemy를 값을 추가해가며 체크 -> 이 과정을 루프로 돎
4. n보다 클 때, 무적권(k)가 없을 때 버틴 라운드 수를 체크
    - 일단 enemy의 값을 더한 값을 저장하는 enemySum이라는 변수 필요
    - 해치운 enemy 배열의 값을 저장하는 clearEnemy 배열 값 필요
    - 해치운 enemy 배열의 최댓값 구하는 건 Math.max함수 사용 -> 런타임 에러가 뜨는 경우가 발생해 함수를 직접 구현
5. 게임 종료는 enemy의 합이 n보다 커졌을 때 k가 0인 경우로 생각

위 방식대로 시도하였으나, 시간 초과로 인한 2번의 테스트가 실패로 뜸
그래서 확인해보니, 우선순위 큐 또는 이분탐색을 사용해 푸는 문제란 걸 깨닫고
우선순위 큐를 통해 문제를 해결해보는 걸로 진행

``` javascript
class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    
    enqueue(element) {
        for(let i=0; i<this.queue.length; i++) {
            if(this.queue[i] < element) {
                this.queue.splice(i, 0, element);
                return
            }
        }
        this.queue.push(element);
    }
    
    front() {
        return this.queue[0];
    }
    
    dequeue(){
        return this.queue.shift();
    }
    
    pop() {
        var front = this.queue[0];
        this.queue.shift();
        return front
    }  
    
    show() {
        return this.queue;
    }
}

function solution(n, k, enemy) {
    let arr = new PriorityQueue();
    var capacity = 0;
    for(let i=0;i<enemy.length;i++) {
        arr.enqueue(enemy[i]);
        var popNum = arr.front();
        console.log(i);
        if(popNum+capacity > n){
            if (k>0){
                arr.dequeue();
                k = k-1;
            } else {
                return i+1;   
            }
        } else {
            arr.enqueue(enemy[i]);
        }
        capacity+=popNum;
    }
    
    return enemy.length;
}
```
<풀이법>
``` javascript
class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(value) {
        this.heap.push(value);
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    dequeue() {
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        let index = 0;
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
        return min;
    }
}

function solution(n, k, enemy) {
    let queue = new PriorityQueue();
    enemy.slice(0, k).forEach(v => queue.enqueue(v));
    var capacity = 0;
    for(let i=k;i<enemy.length;i++) {
        queue.enqueue(enemy[i]);
        const min = queue.dequeue();
        if(capacity+min > n){
            return i;
        } else {
            capacity = capacity+min
        }
    }
    
    return enemy.length;
}
```

- 최솟값 heap을 사용해 우선순위 큐를 구현하는 방식을 연구하여 작성하여 문제를 진행했다. 가장 중요한 enqueue와 dequeue를 구현을 하여 k(무적권)만큼 queue에 push한 후, 이후 라운드 진행될 때, 우선적으로 enemy의 수를 queue에 넣은 후, queue의 가장 최솟값을 꺼내 enemy의 수에 더한 값이 n(병사수)보다 작을 때 계속 더해가며, 만약 n보다 커질 때 최종 라운드의 수를 반환하는 방식으로 진행하였다.

##### 느낀 점
우선순위 큐를 javascript에서 직접 구현해본 적이 처음이라 구현함에 있어서 어려웠었다. 처음에 문제만 봤을 때, 그냥 최댓값만 0으로 치환하면 되지 않을까? 라는 생각으로 진행했다가 32번의 테스트 중 단 2개의 테스트만 시간 초과로 나와 실패처리 되었을 때의 충격은 가히 말할 수 없었다... 그래서 좀 더 오래 고민하고 우선순위 큐를 최적으로 구현할 수 있는 방법 그리고 그 방법을 내가 이해할 수 있게 바꾸는 방법에 대해 오래 고민했던 것 같다.

이분탐색으로 한 코드도 괜찮음