# 문제 링크

[이모티콘 할인 행사](https://school.programmers.co.kr/learn/courses/30/lessons/150368) 

# 1. 내 풀이

- P: [할인원하는%, 구매비용 합 리밋] 배열 users, 이모티콘 가격 배열 emoticons
- R: 이모티콘 플러스 가입자가 가장 많고 > 이모티콘 판매액도 최대인 경우의 이모티콘플러스 가입수와 이모티콘 매출액
- E:
- P: 이모티콘 플러스 가입자가 가장 많으려면 할인%가 각자의 %보다 커야함. 가능한 할인율은 10,20,30,40%

```js
function solution(users, emoticons) {
    const saleRates = [10, 20, 30, 40];
    // 가능한 경우의 모든 할인율
    const cases = [];
    const emoLength = emoticons.length;
    
    let 플러스가입수 = 0;
    let 이모티콘판매수익 = 0;

    const arr = [];
    // 모든 할인 경우를 만듦
    function dfs(depth = 0) {
        if(depth === emoLength) {
            cases.push([...arr])
            return
        }
        for(let i = 0 ; i < saleRates.length ; i++) {
            arr[depth] = saleRates[i]
            dfs(depth+1)
        }
    }
    dfs();
    
    cases.forEach(curr => {
        let 해당할인율가입합 = 0;
        let 해당할인율매출합 = 0;
        
        users.forEach(([구매의향할인율, 구매의향총액]) => {
            let price = 0;
            let 플러스구매하는가 = false;
            
            emoticons.every((emo, emoIdx) => {
                // 이번 할인율이 유저의 구매의향 할인율보다 큰 경우 구매
                if(curr[emoIdx] >= 구매의향할인율) {
                    price += emo * (100 - curr[emoIdx]) / 100; 
                }
                // 할인액이 유저의 구매의향총액을 넘긴다면 이모티콘 플러스 구입
                if(price >= 구매의향총액) {
                    플러스구매하는가 = true;
                    return false;
                }
                return true;
            })
            
            if(플러스구매하는가) {
                해당할인율가입합++;
            } else {
                해당할인율매출합 += price;
            }
        })
        
        if(해당할인율가입합 > 플러스가입수) {
            플러스가입수 = 해당할인율가입합
            이모티콘판매수익 = 해당할인율매출합
        } else if (플러스가입수 === 해당할인율가입합 && 해당할인율매출합 > 이모티콘판매수익) {
            이모티콘판매수익 = 해당할인율매출합
        }
    })
    return [플러스가입수, 이모티콘판매수익]
}
```

# 2. 느낀 점

# 3. 배운 점
