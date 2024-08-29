##### 1. 문제 파악
- 문제의 요점 : 기준치 보다 낮은 음식들을 조합해 기준치 이상의 음식들을 만들어 내는 문제

##### 2. 내 풀이
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

function solution(scoville, K) {
    var answer = 0;
    var newScoville = new PriorityQueue();
    scoville.forEach(element => newScoville.enqueue(element));
    while(newScoville.heap[0] < K && newScoville.heap.length > 1){
        answer++;
        newScoville.enqueue(newScoville.dequeue() + newScoville.dequeue()*2);
    }
    if(newScoville.heap[0] < K) {
        return -1;
    }
    return answer;
}
```

##### 풀이 과정
- minHeap을 사용한 우선순위큐를 활용해 낮은 음식들을 골라 계산식을 추가해 다시 우선순위큐에 넣는 로직으로 풀었다.
- heap의 최상단 0번째 노드에 음식들의 스코빌이 가장 낮은 음식이 있기 때문에, 먼저 꺼내고 두번째 꺼낸 음식을 토대로 수식을 사용해 조합해 다시 추가하는 로직을 사용했다.

##### 느낀 점
만약 이전 문제에서 minHeap을 사용한 우선순위큐를 구현하지 않았다면 시간적으로 꽤 걸렸을 문제라고 생각한다. 계산식은 이미 문제에서 정의내렸기 때문에, 결국엔 문제풀이의 요점은 minHeap을 사용한 우선순위큐를 구현할 수 있는지 없는지인 것으로 생각한다.