import request from "@/api/request"

export default {
	/**
	 * 分页获取问答，根据issue_id查询
	 */
	getCommentByIssueId(id: string, page: number = 1, page_size: number = 5) {
		return request({
			url: `/comment/`,
			method: "GET",
			params: {
				issue_id: id,
				page,
				page_size,
			},
		})
	},
	/**
	 * 分页获取问答，根据issue_id查询
	 */
	getCommentByBookId(id: string, page: number = 1, page_size: number = 5) {
		return request({
			url: `/comment/book/`,
			method: "GET",
			params: {
				book_id: id,
				page,
				page_size,
			},
		})
	},
	/**
	 * 新增评论，参数：user_id/issue_id/commentType/commentContent/type数组
	 */
	submitCommentOnIssue(data: {
		user_id: string
		issue_id?: string
		commentType: number
		commentContent: string
		type: string[]
	}) {
		return request({
			url: "/comment/",
			method: "POST",
			data,
		})
	},
	/**
	 * 新增评论，参数：user_id/book_id/commentType/commentContent/type数组
	 */
	submitCommentOnBook(data: {
		user_id: string
		book_id?: string
		commentType: number
		commentContent: string
		type: string[]
	}) {
		return request({
			url: "/comment/",
			method: "POST",
			data,
		})
	},
}
