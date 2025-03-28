import React from "react"
import styles from "./index.module.less"

type Props = {
	title: string // 内容区左上角的标题
}

// 该组件为每页的页头
const ContentHeader = (props: Props) => {
	return (
		<div className={styles.row}>
			<div className={styles.pageHeader}>{props.title}</div>
			{/* 分类选择组件 */}
		</div>
	)
}

export default ContentHeader
