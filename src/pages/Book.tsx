import { Card, Empty, Pagination, Spin } from "antd"
import ContentHeader from "@/components/ContentHeader"
import TypeSelect from "../components/TypeSelect"
import bookApi from "@/api/system/book"
import styles from "./book.module.less"
import {
	useLoaderData,
	useLocation,
	useSearchParams,
	useNavigation,
	type LoaderFunction,
	useNavigate,
} from "react-router"
import { type BookInfo } from "@/components/issueComponents/IssueItem/types"
import img1 from "@/asserts/imgs/imageQs.png"
import { useEffect } from "react"

function Books() {
	const loaderData = useLoaderData()
	const { search } = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const navigation = useNavigation()
	const navigate = useNavigate()
	// 当分页器变化时候设置查询参数
	const pageChange = (page: number, pageSize: number) => {
		setSearchParams({
			...{ page: page.toString(), page_size: pageSize.toString() },
			type: searchParams.get("type") || "all", // 这是为了不影响type搜索
		})
	}
	// 切换页面后回到首页
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}, [search])
	// 组合一个book就是一个Card组件
	const { results } = loaderData
	const bookList =
		results.length > 0 ? (
			results.map((bookInfo: BookInfo, index: number) => (
				<Card
					hoverable
					style={{
						width: 200,
						marginBottom: 30,
						boxSizing: "border-box",
						flex: "0 0 calc(20% - 50px)",
					}}
					onClick={() => navigate(`/bookDetail/${bookInfo.id}`, { state: { scrollTo: "top" } })}
					cover={
						<img
							alt="书籍蜂蜜"
							style={{
								width: 160,
								height: 200,
								margin: "auto",
								marginTop: 10,
							}}
							src={
								bookInfo.picture
									? `${import.meta.env.VITE_API_BASE_URL}${bookInfo.picture}`
									: img1
							}
						/>
					}
					key={index}
				>
					<Card.Meta title={bookInfo.title}></Card.Meta>
					<div className={styles.numberContainer}>
						<div>浏览数：{bookInfo.scanNumber}</div>
						<div>评论数：{bookInfo.commentNumber}</div>
					</div>
				</Card>
			))
		) : (
			<div className={styles.bookNoContent}>
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无书籍信息..." />
			</div>
		)
	return (
		<div className={styles.container}>
			<ContentHeader title="书籍推荐">
				<TypeSelect />
			</ContentHeader>
			<div className={styles.bookContainer}>
				{navigation.state === "loading" ? (
					<Spin
						style={{
							width: "100%",
						}}
					></Spin>
				) : (
					bookList
				)}
			</div>
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
	)
}

// loader
export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const searchParams = url.searchParams
	// 从查询参数获取page和page_size
	const page = Number(searchParams.get("page")) || 1
	const page_size = Number(searchParams.get("page_size")) || 10
	const type = searchParams.get("type") || "all"
	// 这里请求后端拿到book数据
	const res = await bookApi.getBooks({
		page,
		page_size,
		type, // 必填
	})
	return res.data
}

export default Books
