// 接口：后端返回的单个Issue数据
export interface IssueInfo {
	create_date: string
	update_date: string
	id: string
	issueContent: string
	issueTitle: string
	status: boolean
	type: string[]
	user: {
		id: string
		name: string
		username: string
	}
	commentNumber: string
	scanNumber: string
}
