import userApi from "@/api/system/user"
import { ReactNode, Suspense, use } from "react"
import ScoreItem from "./ScoreItem"
import { Card, Spin } from "antd"
import type { RootStateType } from "@/store"
const resPromise = userApi.getUserByPoints()

/**
 * 问答页面-积分排名组件
 */
const ScoreRank = () => {
	// dataUI
	const rankData = use(resPromise)
	const dataList = rankData.data
	const userPointRankArr: ReactNode[] = []
	if (dataList && dataList.length > 0) {
		dataList.forEach((it: RootStateType["user"]["userInfo"], index: number) => {
			userPointRankArr.push(<ScoreItem key={index} rankInfo={it} rank={index + 1}></ScoreItem>)
		})
	}
	return (
		<Card title="积分排行" variant="borderless" hoverable style={{ marginTop: "10px", cursor: "auto" }}>
			<Suspense
				fallback={
					<div>
						<Spin tip="正在加载..."></Spin>
					</div>
				}
			>
				{userPointRankArr}
			</Suspense>
		</Card>
	)
}

export default ScoreRank
