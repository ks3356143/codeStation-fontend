import request from "@/api/request"

// 定义新增问答data类型
export interface ICreateIssue {
	user_id: string
	type_id: string
	issueTitle: string
	issueContent: string
}

export default {
	/**
	 * 分页获取问答
	 */
	getIssueByPage(
		params: {
			page?: number
			page_size?: number
			enabled?: boolean
			type?: string
			issueTitle: string
		} = {
			enabled: true,
			type: "all",
			issueTitle: "",
		}
	) {
		return request({
			url: "/issue",
			method: "GET",
			params,
		})
	},
	/**
	 * 新增问答
	 */
	createIssue(data: ICreateIssue) {
		return request({
			url: "/issue/",
			method: "POST",
			data,
		})
	},
	/**
	 * 查询某一个问答
	 */
	getOneIssue(issue_id?: string) {
		return request({
			url: `/issue/${issue_id}`,
			method: "GET",
		})
	},
	/**
	 * 搜索Issue内容和标题
	 */
	getIssueByTitleAndContent(
		params: { searchValue: string; searchOption: string; page?: number; page_size?: number } = {
			page: 1,
			page_size: 10,
			searchValue: "",
			searchOption: "issue",
		}
	) {
		return request({
			url: "/issue/getIssuesByContent/",
			params,
		})
	},
}
