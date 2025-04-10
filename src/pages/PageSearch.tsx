import { useLoaderData, useSearchParams, type LoaderFunction } from "react-router"
import styles from "./pageSearch.module.css"
import ContentHeader from "@/components/ContentHeader"
import AddIssueBtn from "@/components/issueComponents/AddIssueBtn"
import Recommend from "@/components/issueComponents/Recommend"
import ScoreRank from "@/components/issueComponents/ScoreRank"
import issueApi from "@/api/system/issue"
import { Empty, Pagination } from "antd"
import { IssueInfo } from "@/components/issueComponents/IssueItem/types"
import SearchResultItem from "@/components/atomics/SearchResultItem"
/**
 * 搜索结果页面
 */
const PageSearch = () => {
	const loaderData = useLoaderData()
	const [searchParams, setSearchParams] = useSearchParams()
	const pageChange = (page: number, pageSize: number) => {
		setSearchParams({
			...{ page: page.toString(), page_size: pageSize.toString() },
		})
	}
	const { results } = loaderData
	// 判断是否为空数组
	const issueList =
		results.length > 0 ? (
			results.map((it: IssueInfo, index: number) => (
				<SearchResultItem issueInfo={it} key={index}></SearchResultItem>
			))
		) : (
			<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无搜索到的内容，请返回问答" />
		)
	return (
		<div className={styles.container}>
			<ContentHeader title="搜索结果" />
			<div className={styles.searchPageContainer}>
				{/* 左边部分 */}
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
				{/* 右侧部分 */}
				<div className={styles.rightSide}>
					<AddIssueBtn />
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
export const loader: LoaderFunction = async ({ params, request }) => {
	const url = new URL(request.url)
	const searchParams = url.searchParams
	const page = Number(searchParams.get("page")) || 1 // 没有查询参数时为1
	const page_size = Number(searchParams.get("page_size")) || 10 // 没有查询参数时为10
	const searchValue = params.searchValue || ""
	const searchOption = params.searchOption || "issue"
	const res = await issueApi.getIssueByTitleAndContent({
		page,
		page_size,
		searchValue,
		searchOption,
	})
	return res.data
}

export default PageSearch
