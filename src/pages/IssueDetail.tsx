import { type LoaderFunctionArgs, useLoaderData, useLocation } from "react-router"
import issueApi from "@/api/system/issue"
import userApi from "@/api/system/user"
import styles from "./issueDetail.module.css"
import ContentHeader from "@/components/ContentHeader"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import Recommend from "@/components/issueComponents/Recommend"
import ScoreRank from "@/components/issueComponents/ScoreRank"
import { useEffect } from "react"
import { formatDate } from "@/utils/commonUtils"
// 导入github-markdown.css和高亮库
import hljs from "highlight.js"
// 引入评论组件
import Discuss from "@/components/issueComponents/Discuss"
// 引入安全清理组件
import DOMPurify from "dompurify"

const IssueDetail = () => {
	// 获取用户信息和问答信息
	const { data: issueData, userData } = useLoaderData()
	const { state } = useLocation()
	// 判断是否重置滚动条
	useEffect(() => {
		if (state?.scrollTo === "top") {
			window.scrollTo({
				top: 0,
			})
		}
		// 高亮代码配置
		hljs.configure({ ignoreUnescapedHTML: true })
		hljs.highlightAll()
	}, [state])
	// 渲染
	return (
		<div className={styles.container}>
			<ContentHeader title="问题详情" />
			<div className={styles.detailContainer}>
				{/* 左侧 */}
				<div className={styles.leftSide}>
					{/* 左上方：问答详情 */}
					<div className={styles.question}>
						{/* 标题 */}
						<h1>{issueData?.issueTitle}</h1>
						{/* 提问人信息：头像、昵称、提问时间 */}
						<div className={styles.questioner}>
							{userData.avatar ? (
								<Avatar size="small" src={userData?.avatar} />
							) : (
								<Avatar icon={<UserOutlined />} />
							)}
							<span className={styles.user}>{userData?.name}</span>
							<span>发布于：{formatDate(issueData?.create_date)}</span>
						</div>
						{/* 问题详情 */}
						<div className={styles.content}>
							<div
								className="markdown-body"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(issueData?.issueContent || ""),
								}}
							></div>
						</div>
					</div>
					{/* 左下方：评论 */}
					<Discuss commentType={1} targetId={issueData.id} type_id={issueData.type} />
				</div>
				{/* 右侧 */}
				<div className={styles.rightSide}>
					<div style={{ marginBottom: 20 }}>
						<Recommend />
					</div>
					<div style={{ marginBottom: 20 }}>
						<ScoreRank />
					</div>
				</div>
			</div>
		</div>
	)
}

// loader
export const loader = async ({ params }: LoaderFunctionArgs) => {
	const issue_id = params.issueId
	const { data } = await issueApi.getOneIssue(issue_id)
	// 请求该问答的用户信息
	const { user: userInfo } = data
	const { data: userData } = await userApi.getUserInfoById({ user_id: userInfo.id })
	// 获取评论列表
	return { userData, data }
}

export default IssueDetail
