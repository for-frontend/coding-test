##### 1. 문제 파악
- 문제의 요점 : edges를 활용해 그래프를 확인하여 정점과 도넛, 막대,  8자의 갯수를 찾는 문제

##### 2. 내 풀이

``` javascript
function solution(edges) {
    const answer = new Array(4).fill(0);
    
    // 정점 : input이 없고 output만 있는 점 -> input = 0, outout > 1
    // 도넛 : input/output이 동일한 점, 1개인 경우 -> 그 외 나머지
    // 막대 : input이 있고 끝에 output이 없는 경우 -> output = 0
    // 8자 : input/output이 동일한 점, 2개인 경우 -> input = 2, output = 2
    
    // 각 점마다의 input, output을 분석해야 함
    // key의 첫번째 요소는 input, 두번째 요소는 output, 
    // key의 1번째 요소를 map의 키 값으로 정의
    
    const edgesMap = edges.reduce((map, key) => {
        if (!map.has(key[0])) {
            map.set(key[0], [0, 1]);
        } else {
            const [input, output] = map.get(key[0]);
            map.set(key[0], [input, output+1]);
        }
    
        if(!map.has(key[1])){
            map.set(key[1], [1, 0]);
        } else {
            const [input, output] = map.get(key[1]);
            map.set(key[1], [input+1, output]);
        }
        return map;
    }, new Map());
    
    for(const [key, info] of edgesMap){ 
        const [input, output] = info;
        if(input == 0 && output > 1){
            answer[0] = key
        } else if (output == 0){
            answer[2]++;
        } else if (input >= 2 && output >= 2){
            answer[3]++;
        }
    }
    
    answer[1] = edgesMap.get(answer[0])[1] - (answer[2] + answer[3]);
    
    return answer;
}
```
##### 풀이 과정
- 문제를 처음 봤을 때, 문제가 원하는 답과 그 답에 대한 조건이 뭔지 파악하는 게 우선이었다. 그림이랑 주어진 예시를 통해 내가 내린 조건은 아래와 같다.
	-  정점 : input이 없고 output만 있는 점 -> input = 0, outout > 1
	- 도넛 : input/output이 동일한 점, 1개인 경우 -> 그 외 나머지
	- 막대 : input이 있고 끝에 output이 없는 경우 -> output = 0
	- 8자 : input/output이 동일한 점, 2개인 경우 -> input = 2, output = 2
- map과 reduce을 사용하여 edges를 각 키와 input,output을 구별하여 계산하였고, 이를 토대로 조건에 맞는 갯수를 찾아냈다.
- 그러나 정답을 수정하는 과정에서 8자는 input/output이 2개가 아니라 2개 이상임을 발견하였고 이를 토대로 수정작업을 진행하여 에러를 해결해나갔다.

##### 느낀 점
javascript에서 reduce와 map을 사용한 경험이 부족해 이를 활용해서 코드를 짜는 데에 어려움이 있었다. 그리고 또한 그래프의 정의 및 도넛 갯수를 구하는 데 이해가 잘 안되어 어려움이 있었다. 그래서 이 문제는 푼 것만으로 끝이 아니라 좀 더 그래프에 대해 연구하고 javascript array 주요 기능들에 대해 연구 및 학습을 진행할 필요성을 느꼈다.