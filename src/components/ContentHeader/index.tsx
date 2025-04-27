import { type ReactNode } from "react"
import styles from "./index.module.less"
import { memo } from "react"

type Props = {
	title: string // 内容区左上角的标题
	children?: ReactNode
}

// 该组件为每页的页头
const ContentHeader = (props: Props) => {
	return (
		<div className={styles.row}>
			<div className={styles.pageHeader}>{props.title}</div>
			{/* 分类选择组件 */}
			{props.children}
		</div>
	)
}

export default memo(ContentHeader)
