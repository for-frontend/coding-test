function solution(n, words) {
	const vocaSet = new Set()
	for (let i = 0; i < words.length; i++) {
		if (!vocaSet.size) {
			vocaSet.add(words[i])
		} else {
			if (!vocaSet.has(words[i]) && words[i - 1].slice(-1) === words[i][0]) {
				vocaSet.add(words[i])
			} else {
				const outOrder = Math.floor(i / n) + 1
				const inOrder = Math.floor(i % n)
				return [inOrder + 1, outOrder]
			}
		}
	}
	return [0, 0]
}

console.log(
	solution(3, [
		"tank",
		"kick",
		"know",
		"wheel",
		"land",
		"dream",
		"mother",
		"robot",
		"tank",
	])
)
