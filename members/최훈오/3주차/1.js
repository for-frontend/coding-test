// 각 정점마다 [나가는 개수, 들어오는 개수] 기록한 map 자료구조
const getInfo = (edges) => {
	const info = edges.reduce((map, [start, end]) => {
		if (!map.has(start)) {
			map.set(start, [1, 0])
		} else {
			const [give, receive] = map.get(start)
			map.set(start, [give + 1, receive])
		}
		if (!map.has(end)) {
			map.set(end, [0, 1])
		} else {
			const [give, receive] = map.get(end)
			map.set(end, [give, receive + 1])
		}
		return map
	}, new Map())
	return info
}

const chkInfo = (info) => {
	const res = new Array(4).fill(0)
	for (const [key, io] of info) {
		const [give, receive] = io
		if (2 <= give && receive == 0) {
			res[0] = key
		} else if (give == 0) {
			//막대그래프 최상단은 give == 0
			res[2]++
		} else if (give >= 2 && receive >= 2) {
			res[3]++
		}
	}
	res[1] = info.get(res[0])[0] - res[2] - res[3]
	return res
}

const solution = (edges) => {
	const mapInfo = getInfo(edges)
	const answer = chkInfo(mapInfo)
	return answer
}

console.log(
	solution([
		[2, 3],
		[4, 3],
		[1, 1],
		[2, 1],
	])
)
