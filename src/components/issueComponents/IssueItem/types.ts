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

// 接口：后端返回书籍单个Book数据
export interface BookInfo {
	bookInfo: string
	commentNumber: number
	downloadLink: string
	id: string
	picture: string
	requirePoints: number
	scanNumber: number
	title: string
	type: {
		id: string
		name: string
	}
}