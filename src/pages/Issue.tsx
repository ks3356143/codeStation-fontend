import ContentHeader from "@/components/ContentHeader"
import styles from "./issue.module.less"
import issueApi from "@/api/system/issue"
import { type LoaderFunction, useLoaderData, useLocation, useSearchParams } from "react-router"
import { Empty, Pagination } from "antd"
import IssueItem from "@/components/issueComponents/IssueItem"
import type { IssueInfo } from "@/components/issueComponents/IssueItem/types"
import { useEffect } from "react"
import AddIssueBtn from "@/components/issueComponents/AddIssueBtn"
import Recommend from "@/components/issueComponents/Recommend"
import ScoreRank from "@/components/issueComponents/ScoreRank"
import TypeSelect from "@/components/TypeSelect"

const Issue = () => {
	const loaderData = useLoaderData()
	const { search } = useLocation()
	// 分页器回调函数 -> 改变分页查询数据
	const [searchParams, setSearchParams] = useSearchParams()
	const pageChange = (page: number, pageSize: number) => {
		setSearchParams({
			...{ page: page.toString(), page_size: pageSize.toString() },
			type: searchParams.get("type") || "all",
		})
	}
	// 切换页面后回到首页
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}, [search])
	// 取出数据
	const { results } = loaderData
	// 判断是否为空数组
	const issueList =
		results.length > 0 ? (
			results.map((it: IssueInfo, index: number) => <IssueItem issueInfo={it} key={index}></IssueItem>)
		) : (
			<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="有问题，就来CodeStation提问！" />
		)
	return (
		<div className={styles.container}>
			{/* 上面头部：ContentHeader组件 */}
			<ContentHeader title="问答列表">
				<TypeSelect></TypeSelect>
			</ContentHeader>
			{/* 下面列表内容区域 */}
			<div className={styles.issueContainer}>
				{/* 左侧区域 */}
				<div className={styles.leftSide}>
					{issueList}
					<div className={styles.paginationStyle}>
						<Pagination
							total={loaderData.count || 0}
							current={searchParams.get("page") ? Number(searchParams.get("page")) : 1}
							showQuickJumper
							onChange={pageChange}
							showSizeChanger
						/>
					</div>
				</div>
				{/* 右侧区域 */}
				<div className={styles.rightSide}>
					<AddIssueBtn />
					<Recommend></Recommend>
					<ScoreRank></ScoreRank>
				</div>
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
	const type = searchParams.get("type") || "all"
	const res = await issueApi.getIssueByPage({
		page,
		page_size,
		enabled: true, // 必填
		type, // 必填
	})
	return res.data
}

export default Issue
