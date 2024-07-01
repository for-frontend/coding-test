## 문제링크

https://school.programmers.co.kr/learn/courses/30/lessons/12953#qna

## 내풀이

```
const gcd = (n, m) => {
    while(m !== 0){
        let temp = m;
        m = n % m;
        n = temp;
    }
    return n;
}
const lcm = (n, m) => {
    return n * m / gcd(n, m);
}
function solution(arr) {
    let answer = 0;
    answer = arr.reduce((a, b) => lcm(a, b));
    return answer;
}
```

# 해설

일단 최소공배수라 해서 최대공약수와 최소공배수를 구하는 함수는 구글링하여 구현했습니다.
그 다음 어떻게 n개의 최소공배수를 구하냐가 관건인데,
reduce함수를 이용하여 두 값의 최소공배수를 더한 값을 지속적으로 다음 값과 최소공배수를 더하는 식으로 풀었습니다.
이거 말고도 다른 풀이가 있을 것 같습니다.

# 채점 결과

정확성: 100.0
합계: 100.0 / 100.0
