## 문제링크

https://school.programmers.co.kr/learn/courses/30/lessons/12951

## 내풀이

```
function solution(s) {
    var answer = '';
    for(let i = 0; i < s.length; i++){
        if(i === 0 || s[i - 1] === ' ') answer += s[i].toUpperCase();
        else answer += s[i].toLowerCase();
    }
    return answer;
}
```

# 해설

문제에서 주어진대로 풀이하면 되는 구현문제입니다.
이전 문자열이 빈칸이였거나 시작하는 문자열이라면 대문자로 바꿔주고,
다른 경우에는 전부 소문자로 바꿔서 넣어주면 됩니다.

# 채점 결과

정확성: 100.0
합계: 100.0 / 100.0
