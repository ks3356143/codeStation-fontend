import request from "@/api/request"

export default {
	/**
	 * 获取考试题所有分类的标题
	 */
	getQuizTitleByType() {
		return request({
			url: "/quiz/getByType/",
			method: "GET",
		})
	},
	/**
	 * 根据id获取考试题
	 */
	getQuizById(id: string) {
		return request({
			url: `/quiz/${id}`,
			method: "GET",
		})
	},
}
