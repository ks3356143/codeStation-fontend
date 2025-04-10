import typeApi from "@/api/system/type"
import { Suspense, use } from "react"
import { Spin, Tag } from "antd"
import { getColorByType } from "@/tools/tagColorFunc"
import styles from "./index.module.less"
import { useSearchParams } from "react-router"

type Props = {}

// use-Promise
const fetchTypesPromise = typeApi.getIssueTypeByPage()

/**
 * 分类组件
 */
const TypeSelect = (props: Props) => {
	const { data: typeList } = use(fetchTypesPromise)
	const [, setSearchParams] = useSearchParams()
	const arr = []
	// 点击Tag事件
	const tagClickFunction = (type: { id: string; name: string }) => {
		setSearchParams({
			page: "1",
			page_size: "10",
			type: type.id,
		})
	}
	// 添加全部
	arr.push(
		<Tag
			color="magenta"
			key="all"
			className={styles.tag}
			onClick={() =>
				tagClickFunction({
					id: "all",
					name: "all",
				})
			}
		>
			全部
		</Tag>
	)
	// 添加每一个标签
	typeList.forEach((it: { id: string; name: string }) => {
		arr.push(
			<Tag
				color={getColorByType(it.name)}
				key={it.id}
				className={styles.tag}
				onClick={() => tagClickFunction(it)}
			>
				{it.name}
			</Tag>
		)
	})
	return <Suspense fallback={<Spin></Spin>}>{arr}</Suspense>
}

export default TypeSelect
