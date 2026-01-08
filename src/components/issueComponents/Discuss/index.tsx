import styles from "./index.module.css"
import { Comment } from "@ant-design/compatible"
import { useStoreSelector } from "@/store/hooks"
import { Avatar, Button, Form, List, Pagination, Popover, Tooltip, Empty } from "antd"
import LazyAvatar from "@/components/atomics/LazyAvatar"
import { UserOutlined } from "@ant-design/icons"
import "@toast-ui/editor/toastui-editor.css"
import { startTransition, useEffect, useOptimistic, useRef, useState } from "react"
import { Editor } from "@toast-ui/react-editor"
import commentApi from "@/api/system/comment"
import userApi from "@/api/system/user"
import { formatDate } from "@/utils/commonUtils"
import { toast } from "react-toastify"

type Props = {
	commentType: number // 1为Issue，2为Book
	targetId: string
	type_id: string[]
}

/**
 * 评论组件
 */
const Discuss = (props: Props) => {
	const { userInfo, isLogin } = useStoreSelector(store => store.user)
	const editorRef = useRef(null)
	// 储存分页器信息
	const [pageInfo, setPageInfo] = useState({
		page: 1,
		page_size: 5,
		total: 0,
		total_pages: 0,
	})
	// 储存评论列表-有乐观更新等内容
	const [commentList, setCommentList] = useState<any>([])
	// state：加载评论的loading
	const [isPending, setIsPending] = useState(false)
	// state：评论的loading
	const [isCommentLoading, setCommentLoading] = useState(false)
	// effect
	useEffect(() => {
		const fetchComments = async () => {
			setIsPending(true)
			if (props.commentType === 1) {
				// 获取问答对应的评论
				const { data } = await commentApi.getCommentByIssueId(
					props.targetId,
					pageInfo.page,
					pageInfo.page_size
				)
				// 把头像数据加入到commentList里面
				for (let i = 0; i < data.results.length; i++) {
					const result = await userApi.getUserInfoById({ user_id: data.results[i].user.id })
					// 将用户的信息添加到评论对象上面
					data.results[i].userInfo = result.data
				}
				// 更新评论数据
				setCommentList(data.results)
				// 更新分页数据-根据后端字段
				setPageInfo({
					page: data.current_page,
					page_size: data.page_size,
					total: data.count,
					total_pages: data.total_pages,
				})
			} else if (props.commentType === 2) {
				// 书籍的东西
				const { data } = await commentApi.getCommentByBookId(
					props.targetId,
					pageInfo.page,
					pageInfo.page_size
				)
				// 把头像数据加入到commentList里面
				const userPromises = data.results.map((comment: any) =>
					userApi.getUserInfoById({ user_id: comment.user })
				)
				const userResults = await Promise.all(userPromises)
				data.results.forEach((comment: any, index: number) => {
					comment.userInfo = userResults[index].data
				})
				// 更新评论数据
				setCommentList(data.results)
				// 更新分页数据-根据后端字段
				setPageInfo({
					page: data.current_page,
					page_size: data.page_size,
					total: data.count,
					total_pages: data.total_pages,
				})
			}
			setIsPending(false)
		}
		// 为了处理出错导致加载中state错误
		fetchComments()
	}, [pageInfo.page, pageInfo.page_size, props.targetId, props.commentType])
	// 分页器切换评论
	const pageChange = (page: number) => {
		// 切换state就可以刷新页面
		setPageInfo(preState => ({
			...preState,
			page: page,
		}))
	}
	// 根据登录状态进行头像处理
	let avatar = <Avatar icon={<UserOutlined />} />
	if (isLogin) {
		avatar = userInfo.avatar ? (
			<LazyAvatar src={`${import.meta.env.VITE_APP_BASE_URL.replace("/api", "")}${userInfo.avatar}`} />
		) : (
			<Avatar icon={<UserOutlined />} />
		)
	}
	// 处理评论【乐观更新】
	const [optimisticState, addOptimistic] = useOptimistic(commentList, (preCommentList, newComment) => {
		return [newComment, ...preCommentList]
	})
	// 点击了提交评论按钮
	const submitDiscuss = async () => {
		const commentContent = (editorRef.current as any).getInstance().getHTML()
		// 这里对editor文字判空
		if (!commentContent.trim() || commentContent.trim() === "<p><br></p>") {
			toast.error("请输入评论内容")
			return
		}
		setCommentLoading(true)
		// 组装提交内容
		const addOptions =
			props.commentType === 1
				? {
						user_id: userInfo.id,
						issue_id: props.targetId,
						commentType: 1,
						commentContent: commentContent,
						type: props.type_id,
				  }
				: {
						user_id: userInfo.id,
						book_id: props.targetId,
						commentType: 2,
						commentContent: commentContent,
						type: props.type_id,
				  }
		startTransition(async () => {
			if (props.commentType === 1) {
				addOptimistic({
					...addOptions,
					// 这里修改commentContent-让用户觉得是乐观更新
					commentContent: addOptions.commentContent + "(这是乐观更新内容，请稍等，正在发送......)",
					create_date: new Date().toISOString(),
					id: "随机ID",
					issue: addOptions.issue_id,
					user: addOptions.user_id,
					userInfo: {
						avatar: "",
					},
				})
			} else if (props.commentType === 2) {
				addOptimistic({
					...addOptions,
					// 同上理由
					commentContent: addOptions.commentContent + "(这是乐观更新内容，请稍等，正在发送......)",
					create_date: new Date().toISOString(),
					id: "随机ID",
					book: addOptions.book_id,
					user: addOptions.user_id,
					userInfo: {
						avatar: "",
					},
				})
			}
			// 手动延迟1s，让用户看见乐观状态
			await new Promise(resolve => setTimeout(resolve, 1000))
			try {
				let res
				if (props.commentType === 1) {
					res = await commentApi.submitCommentOnIssue(addOptions)
				} else if (props.commentType === 2) {
					res = await commentApi.submitCommentOnBook(addOptions)
				}
				const commentObj = res!.data
				const userInfoRes = await userApi.getUserInfoById({ user_id: commentObj.user })
				// 把信息添加到commentObj上面
				commentObj.userInfo = userInfoRes.data
				setCommentList((preState: any) => [commentObj, ...preState])
				toast.success("评论成功")
				setCommentLoading(false)
				// 记得把分页器数据填补上，让组件刷新
				setPageInfo(preState => ({
					...preState,
					total: preState.total + 1,
				}))
				// 记得成功后清空评论内容
				;(editorRef.current as any).getInstance().setMarkdown("")
			} catch (err) {
				// 只需要设置加载即可
				setCommentLoading(false)
			}
		})
	}
	return (
		<div>
			{/* 评论框 */}
			<Comment
				avatar={avatar}
				content={
					<>
						<Form.Item>
							<Editor
								initialValue=""
								previewStyle="vertical"
								height="300px"
								initialEditType="wysiwyg"
								autofocus={false}
								useCommandShortcut={true}
								language="zh-CN"
								ref={editorRef}
							></Editor>
						</Form.Item>
						<Form.Item>
							<Popover
								content={isLogin ? "点击评论" : "请登录后进行评论"}
								trigger={isLogin ? undefined : "hover"}
							>
								<Button
									loading={isPending || isCommentLoading}
									type="primary"
									disabled={!isLogin}
									onClick={submitDiscuss}
								>
									添加评论
								</Button>
							</Popover>
						</Form.Item>
					</>
				}
			/>
			{/* 评论列表 */}
			{commentList?.length > 0 && (
				<List
					loading={isPending || isCommentLoading}
					header="当前评论"
					dataSource={optimisticState}
					renderItem={(item: any) => (
						<Comment
							avatar={
								<LazyAvatar
									src={
										item.userInfo.avatar
											? `${import.meta.env.VITE_APP_BASE_URL.replace("/api", "")}${
													item.userInfo.avatar
											  }`
											: null
									}
									icon={<UserOutlined />}
								/>
							}
							content={<div dangerouslySetInnerHTML={{ __html: item.commentContent }} />}
							datetime={
								<Tooltip title={formatDate(item.create_date)}>
									<span>{formatDate(item.create_date)}</span>
								</Tooltip>
							}
						/>
					)}
				/>
			)}
			{/* 分页器 */}
			{commentList.length > 0 ? (
				<div className={styles.paginationContainer}>
					<Pagination
						showQuickJumper
						defaultCurrent={1}
						current={pageInfo.page}
						pageSize={pageInfo.page_size}
						total={pageInfo.total}
						onChange={pageChange}
					/>
				</div>
			) : (
				<div
					style={{
						fontWeight: "200",
						textAlign: "center",
						margin: "50px",
					}}
				>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无评论" />
				</div>
			)}
		</div>
	)
}

export default Discuss
