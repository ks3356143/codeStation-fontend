/**
 * LocalStorage操作
 */
export default {
	set(table: string, settings: any) {
		const _set = JSON.stringify(settings)
		return localStorage.setItem(table, _set)
	},
	get(table: string) {
		let data = localStorage.getItem(table)
		data = data && JSON.parse(data)
		return data
	},
	remove(table: string) {
		return localStorage.removeItem(table)
	},
	clear() {
		return localStorage.clear()
	},
}
