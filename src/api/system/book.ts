import request from "@/api/request"

export default {
	/**
	 * 分页查询所有book
	 */
	getBooks(
		params: { page: number; page_size: number; type: string } = { page: 1, page_size: 10, type: "all" }
	) {
		return request({
			url: "/book",
			method: "get",
			params,
		})
	},
	/**
	 * 查询某一个book
	 */
	getOneBook(book_id?: string) {
		return request({
			url: `/book/${book_id}`,
			method: "GET",
		})
	},
	/**
	 * 搜索Book内容和标题
	 */
	getBookByTitleAndContent(
		params: { searchValue: string; searchOption: string; page?: number; page_size?: number } = {
			page: 1,
			page_size: 10,
			searchValue: "",
			searchOption: "book",
		}
	) {
		return request({
			url: "/book/getBooksByContent/",
			params,
		})
	},
}
