import request from "@/api/request"

export default {
	/**
	 * 分页获取问答类型
	 */
	getIssueTypeByPage(params = {}) {
		return request({
			url: "/type",
			method: "get",
			params,
		})
	},
}
