import { IssueInfo } from "./types"
import styles from "./index.module.less"
import { getColorByType } from "@/tools/tagColorFunc"
import { Flex, Tag } from "antd"
import { useNavigate } from "react-router"

type Props = {
	issueInfo: IssueInfo
}

// 该组件是问答页面-下面没条渲染UI
const IssueItem = (props: Props) => {
	const navigate = useNavigate()
	// 处理标签
	const types = props.issueInfo.type
	const tag_list = types.map((it, index) => (
		<Tag color={getColorByType(it)} key={index}>
			{it}
		</Tag>
	))
	return (
		<div className={styles.container}>
			{/* 回答数 */}
			<div className={styles.issueNum}>
				<div>{props.issueInfo.commentNumber}</div>
				<div>回答</div>
			</div>
			{/* 浏览数 */}
			<div className={styles.issueNum}>
				<div>{props.issueInfo.scanNumber}</div>
				<div>浏览</div>
			</div>
			{/* 问题内容 */}
			<div className={styles.issueContainer}>
				<div
					onClick={() =>
						navigate(`/issueDetail/${props.issueInfo.id}`, { state: { scrollTo: "top" } })
					}
					className={styles.top}
				>
					{props.issueInfo.issueTitle}
				</div>
				<div className={styles.bottom}>
					<div className={styles.left}>
						<Flex gap="4px 0" wrap={false}>
							{tag_list}
						</Flex>
					</div>
					<div className={styles.right}>
						<Tag color="#ff4d4f">{props.issueInfo.user.name}</Tag>
						<span>{props.issueInfo.create_date}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IssueItem
