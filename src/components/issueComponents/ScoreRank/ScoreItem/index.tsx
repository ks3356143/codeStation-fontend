import { RootStateType } from "@/store"
import styles from "./index.module.less"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import type { CSSProperties, ReactNode } from "react"

type Props = {
	rankInfo: RootStateType["user"]["userInfo"]
	rank: number
}

const ScoreItem = (props: Props) => {
	// 处理第一名、第二名、第三名
	let rankNum: ReactNode | null = null
	const className = "iconfont icon-jiangbei"
	switch (props.rank) {
		case 1:
			rankNum = (
				<div
					style={{
						color: "#ffda23",
						fontSize: "22px",
					}}
					className={className}
				></div>
			)
			break
		case 2:
			rankNum = (
				<div
					style={{
						color: "#c5c5c5",
						fontSize: "22px",
					}}
					className={className}
				></div>
			)
			break
		case 3:
			rankNum = (
				<div
					style={{
						color: "#cd9a62",
						fontSize: "22px",
					}}
					className={className}
				></div>
			)
			break
		default:
			rankNum = props.rank
			break
	}
	return (
		<div className={styles.container}>
			{/* 名次，头像，名称 */}
			<div className={styles.left}>
				{rankNum}
				<div className={styles.avatar}>
					<Avatar
						size="small"
						src={props.rankInfo.avatar}
						icon={!props.rankInfo.avatar && <UserOutlined />}
					/>
				</div>
				<div>{props.rankInfo.name}</div>
			</div>
			{/* 积分 */}
			<div className={styles.right}>{props.rankInfo.points}</div>
		</div>
	)
}

export default ScoreItem
