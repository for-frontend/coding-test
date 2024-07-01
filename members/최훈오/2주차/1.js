function solution(s) {
	const stack = []
	for (let i = 0; i < s.length; i++) {
		if (!stack.length) {
			stack.push(s[i])
		} else {
			if (stack.at(-1) === s[i]) {
				stack.pop()
			} else {
				stack.push(s[i])
			}
		}
	}
	return stack.length ? 0 : 1
}

console.log(solution("cdcd"))
