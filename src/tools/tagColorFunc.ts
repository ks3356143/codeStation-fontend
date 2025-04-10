export function getColorByType(type: string) {
	const colors = [
		"red",
		"volcano",
		"orange",
		"gold",
		"lime",
		"green",
		"cyan",
		"blue",
		"geekblue",
		"purple",
	]
	// 使用字符串哈希计算索引
	let hash = 0
	for (let i = 0; i < type.length; i++) {
		hash = (hash << 5) - hash + type.charCodeAt(i)
		hash |= 0 // 转换为32位整数
	}
	const index = Math.abs(hash) % colors.length
	return colors[index]
}
