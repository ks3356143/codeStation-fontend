import request from "@/api/request"

export default {
	/**
	 * 分页获取问答
	 */
	getIssueByPage(params: { page?: number; page_size?: number; enabled: boolean } = { enabled: true }) {
		return request({
			url: "/issue",
			method: "GET",
			params,
		})
	},
}
