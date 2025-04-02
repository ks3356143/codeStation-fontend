import userApi from "@/api/system/user"
import { use } from "react"

const resPromise = userApi.getUserByPoints()
/**
 * 问答页面-积分排名组件
 */
const ScoreRank = () => {
	return <div>{JSON.stringify(use(resPromise))}</div>
}

export default ScoreRank
