function solution(grid) {
	const dx = [1, 0, -1, 0]
	const dy = [0, 1, 0, -1]

	const visited = [...new Array(grid.length)].map((_, i) =>
		grid[i].split("").map((el) => [...new Array(4).fill(false), el])
	)
	const colLen = visited[0].length
	const rowLen = visited.length

	const ret = []

	// 인덱스 0~range으로 조정
	const makeRange = (num, range) => {
		if (num < 0) return range + num
		return num % range
	}

	for (let i = 0; i < rowLen; i++) {
		for (let j = 0; j < colLen; j++) {
			for (let k = 0; k < 4; k++) {
				if (visited[i][j][k]) continue

				visited[i][j][k] = true
				const nx = makeRange(i + dx[k], rowLen)
				const ny = makeRange(j + dy[k], colLen)
				//다음 지나갈 곳을 설정
				const stk = [[nx, ny, k]]
				let cnt = 1
				while (stk.length) {
					let [x, y, d] = stk.pop()
					const state = visited[x][y][4]
					// 왼쪽 회전이면 dx,dy배열에서 각각 -1, R이면 1씩 더한것과 같음
					if (state === "L") d = makeRange(d + 1, 4)
					else if (state === "R") d = makeRange(d - 1, 4)
					if (visited[x][y][d]) continue
					visited[x][y][d] = true
					const nx = makeRange(x + dx[d], rowLen)
					const ny = makeRange(y + dy[d], colLen)
					stk.push([nx, ny, d])
					cnt++
				}
				ret.push(cnt)
			}
		}
	}

	return ret.sort((a, b) => a - b)
}

console.log(solution(["SL", "LR"]))
