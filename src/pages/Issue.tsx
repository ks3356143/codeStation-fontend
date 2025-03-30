import ContentHeader from "@/components/ContentHeader"
import styles from "./issue.module.less"
import issueApi from "@/api/system/issue"
import { type LoaderFunction, useLoaderData, useNavigation, useSearchParams } from "react-router"

type Props = {}

const Issue = (props: Props) => {
	const loaderData = useLoaderData()
	// 改变分页查询数据
	const [searchParams, setSearchParams] = useSearchParams()
	return (
		<div className={styles.container}>
			{/* 上面头部：ContentHeader组件 */}
			<ContentHeader title="问答列表"></ContentHeader>
			{/* 下面列表内容区域 */}
			<div className={styles.issueContainer}>
				{/* 左侧区域 */}
				<div className={styles.leftSide}>1</div>
				{/* 右侧区域 */}
				<div className={styles.rightSide}>2</div>
			</div>
		</div>
	)
}

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const searchParams = url.searchParams
	// 页面参数添加
	const page = Number(searchParams.get("page")) || 1
	const page_size = Number(searchParams.get("page_size")) || 10
	const res = await issueApi.getIssueByPage({
		page,
		page_size,
		enabled: true,
	})
	return res.data
}

export default Issue
