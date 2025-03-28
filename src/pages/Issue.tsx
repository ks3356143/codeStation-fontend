import React from "react"
import ContentHeader from "@/components/ContentHeader"
import styles from "./issue.module.less"

type Props = {}

const Issue = (props: Props) => {
	return <div className={styles.container}>
		{/* 上面头部：ContentHeader组件 */}
		<ContentHeader title='问答列表'></ContentHeader>
		{/* 下面列表内容区域 */}
		<div className={styles.issueContainer}>
			{/* 左侧区域 */}
			<div className={styles.leftSide}>1</div>
			{/* 右侧区域 */}
			<div className={styles.rightSide}>2</div>
		</div>
	</div>
}

export default Issue
