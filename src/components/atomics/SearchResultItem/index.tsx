import IssueItem from "@/components/issueComponents/IssueItem"
import { IssueInfo } from "@/components/issueComponents/IssueItem/types"

type Props = {
	issueInfo: IssueInfo
}

/**
 * 储存搜索结果的项目
 * 该组件是根据搜索的searchOption（'issue'或'book'）返回不同类型的组件（issueItem或BookItem）
 * 像这类组件没有视图，只是判断作用 -> 容器组件
 */
const SearchResultItem = (props: Props) => {
	const { ...rest } = props
	return <>{props.issueInfo.issueTitle ? <IssueItem {...rest}></IssueItem> : null}</>
}

export default SearchResultItem
