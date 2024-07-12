// includes 정확성 60, 시간 초과
// function solution(phone_book) {
// 	const n = phone_book.length
// 	for (let i = 0; i < n; i++) {
// 		for (let j = 0; j < n; j++) {
// 			if (i !== j && phone_book[j].includes(phone_book[i])) {
// 				return false
// 			}
// 		}
// 	}
// 	return true
// }

// slice 정확성은 100, 시간 초과, 탐색에 문제가 있음 이중 for문이 아닌 다른 방법 필요
// function solution(phone_book) {
// 	const n = phone_book.length
// 	phone_book.sort((a, b) => a.length - b.length)
// 	for (let i = 0; i < n; i++) {
// 		for (let j = i + 1; j < n; j++) {
// 			if (
// 				i !== j &&
// 				phone_book[j].slice(0, phone_book[i].length) === phone_book[i]
// 			) {
// 				return false
// 			}
// 		}
// 	}
// 	return true
// }

// map이용, 2중 for문이지만 내부는 phone_book이 아닌 최대 20 길이를 가지는 아이템을 순회하고 탐색시에도 O(1)에 가져옴
function solution(phone_book) {
	const n = phone_book.length
	const map = new Map()
	phone_book.forEach((item) => {
		map.set(item, 1)
	})

	for (const [key, value] of map) {
		for (let j = 0; j < key.length; j++) {
			if (map.has(key.slice(0, j))) {
				return false
			}
		}
	}
	return true
}

console.log(solution(["119", "97674223", "1195524421"]))
