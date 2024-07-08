function solution(n, wires) {
	let minValue = Number.MAX_SAFE_INTEGER

	for (let i = 0; i < n; i++) {
		const dfs = (x) => {
			const next = arr[x]
			for (let j = 0; j < next.length; j++) {
				if (!visited[next[j]]) {
					visited[next[j]] = 1
					count += 1
					dfs(next[j])
				}
			}
		}

		const result = []
		const visited = Array(n + 1).fill(0)
		const arr = Array.from({length: n + 1}, () => [])
		let count = 1

		for (let j = 0; j < wires.length - 1; j++) {
			const [start, end] = [...wires.slice(0, i), ...wires.slice(i + 1)][j]
			arr[start].push(end)
			arr[end].push(start)
		}
		for (let k = 1; k <= n; k++) {
			if (!visited[k]) {
				visited[k] = 1
				dfs(k)
				result.push(count)
				count = 1
			}
		}
		if (Math.abs(result[0] - result[1]) < minValue) {
			minValue = Math.abs(result[0] - result[1])
		}
	}
	return minValue
}

console.log(
	solution(9, [
		[1, 3],
		[2, 3],
		[3, 4],
		[4, 5],
		[4, 6],
		[4, 7],
		[7, 8],
		[7, 9],
	])
)

// dfs
