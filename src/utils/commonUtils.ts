/**
 * python的日期解析输入：2025-03-30T14:38:32.266588
 */
export function formatDate(str: string) {
	const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
	const date = new Date(str)
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const seconds = date.getSeconds()
	return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds} ${days[date.getDay()]}`
}
