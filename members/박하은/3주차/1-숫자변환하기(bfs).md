# 문제 링크

[숫자 변환하기]()

# 1. 내 풀이

- P: 자연수 x, y, n
- R: x에 정해진 연산들을 해서 y로 만들 수 있는 최소 연산 횟수

처음에 x에서 y가 되는 방법을 찾도록 했는데 5,7,9,10,11, 14-16에서 답이 틀리길래 
유정님 아이디어대로 y에서부터 하향식 접근하게 했더니 시간초과 하나만 빼고 성공하더라구요!
그래서 지민님 아이디어대로 직접 구현한 Queue를 사용해서 완성했습니다.
감사합니다...!!!

```js
function solution(x, y, n) {
    let answer = Infinity;
    if(x===y) return 0;
    bfs(y, 0);

    function bfs(num, cnt) {
        let queue = new Queue();
        queue.add([num, cnt]);

        while(queue.size()) {
            let [a,b] = queue.popleft();
            if(a === x) {
                answer = Math.min(answer, b);
                break;
            } else if (num < x) {
                break;
            }

            if(a-n >= x)
                queue.add([a-n, b+1]);
            if(a%2 === 0)
                queue.add([a/2, b+1]);
            if(a%3 === 0)
                queue.add([a/3, b+1]);
        }
    }

    return answer > 0 && answer != Infinity ? answer : -1
}

class Queue {
    constructor() {
        this.storage = {};
        this.front = 0;
        this.rear = 0;
    }

    size() {
        if (this.storage[this.rear] === undefined) {
            return 0;
        } else {
            return this.rear - this.rear + 1;
        }
    }

    add(value) {
        if (this.size() === 0) {
            this.storage['0'] = value;
        } else {
            this.rear += 1;
            this.storage[this.rear] = value;
        }
    }

    popleft() {
        let temp;
        if (this.front === this.rear) {
            temp = this.storage[this.front];
            delete this.storage[this.front];
            this.front = 0;
            this.rear = 0;
        } else {
            temp = this.storage[this.front];
            delete this.storage[this.front];
            this.front += 1;
        }
        return temp;
    }
}
```

## 기존에 풀었던 방법 (5,7,9 등 실패)

```js
function solution(x, y, n) {
    let answer = Infinity;
    if(x===y) return 0;
    bfs(x, 0);
    function bfs(num, cnt) {
        let queue = new Queue();
        queue.add([num, cnt]);
        
        while(queue.size()) {
            let [a,b] = queue.popleft();
            if(a === y) {
                answer = Math.min(answer, b);
                break;
            } else if (a > y) {
                break;
            }
            
            if(a+n <= y)
                queue.add([a+n, b+1]);
            if(y%2 === 0)
                queue.add([a*2, b+1]);
            if(y%3 === 0)
                queue.add([a*3, b+1]);
        }
    }
    
    return answer > 0 && answer != Infinity ? answer : -1
}
// 큐 구현 생략
```

# 2. 느낀 점


# 3. 배운 점

- 직접 구현한 큐를 쓰면 수행 시간을 줄일 수 있다.