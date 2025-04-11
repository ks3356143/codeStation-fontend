import styles from "./quiz.module.css"
import { startTransition, useActionState } from "react"
import { FloatButton, Result, Skeleton, Tree } from "antd"
import type { DataNode } from "antd/lib/tree"
import { SmileOutlined } from "@ant-design/icons"
import ContentHeader from "@/components/ContentHeader"
import quizApi from "@/api/system/quiz"
import { useLoaderData } from "react-router"
// 覆盖默认样式
import "@/styles/quiz/quiz.less"
import DOMPurify from "dompurify"

const Quiz = () => {
	const loaderData = useLoaderData()
	// 组装treeData
	const treeData: DataNode[] = loaderData.map((it: any) => {
		return {
			title: it.type.name,
			key: it.type.id,
			children: it.titles.map((item: { id: string; quizTitle: string }) => ({
				title: item.quizTitle,
				key: item.id,
				isSelect: true,
			})),
		}
	})
	// 点击树节点事件触发异步请求并设置quizId
	const onTreeClick = (selectedKeys: any[], e: any) => {
		if (e.node.isSelect) {
			if (selectedKeys.length > 0) {
				startTransition(() => {
					quizAction(selectedKeys[0])
				})
			}
		}
	}
	// 异步请求
	const [quizInfo, quizAction, isQuizPending] = useActionState(async (_: string, quizId: string) => {
		const res = await quizApi.getQuizById(quizId)
		// 人工加延迟
		await new Promise(resolve => setTimeout(resolve, 1000))
		return res.data
	}, null)
	// 右侧显示
	let quizRightSide = null
	if (quizInfo) {
		// 赋值为考试题的内容
		quizRightSide = isQuizPending ? (
			<div className={styles.skeleton}>
				<Skeleton active paragraph={{ width: "78%", rows: 18 }} />
			</div>
		) : (
			<div className={styles.content}>
				<h1 className={styles.interviewRightTitle}>{quizInfo?.quizTitle}</h1>
				<div className={styles.contentContainer}>
					<div
						className="markdown-body"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(quizInfo?.quizContent || ""),
						}}
					></div>
				</div>
			</div>
		)
	} else {
		quizRightSide = (
			<div className={styles.noContent}>
				<Result
					className={styles.noContentInner}
					icon={<SmileOutlined />}
					title="请在左侧点击选择考试题"
				/>
			</div>
		)
	}
	return (
		<div className={styles.container}>
			<ContentHeader title="考试题大全" />
			<div className={styles.interviewContainer}>
				<div className={styles.leftSide}>
					<div className={styles.treeTitle}>所有类型</div>
					<Tree onSelect={onTreeClick} treeData={treeData} showLine blockNode />
				</div>
				<div className={styles.rightSide}>{quizRightSide}</div>
			</div>
			<FloatButton.BackTop />
		</div>
	)
}

// loader
export const loader = async () => {
	const res = await quizApi.getQuizTitleByType()
	return res.data
}

export default Quiz
