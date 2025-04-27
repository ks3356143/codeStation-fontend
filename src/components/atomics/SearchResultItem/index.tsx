import IssueItem from "@/components/issueComponents/IssueItem"
import BookItem from "@/components/issueComponents/BookItem"
import { BookInfo, IssueInfo } from "@/components/issueComponents/IssueItem/types"

type Props = {
	info: IssueInfo | BookInfo
}

/**
 * 储存搜索结果的项目
 * 该组件是根据搜索的searchOption（'issue'或'book'）返回不同类型的组件（issueItem或BookItem）
 * 像这类组件没有视图，只是判断作用 -> 容器组件
 */
const SearchResultItem = (props: Props) => {
	const { info, ...rest } = props
	if ("issueTitle" in info) {
		return <IssueItem issueInfo={info} {...rest}></IssueItem>
	} else if ("title" in info) {
		return <BookItem bookInfo={info} {...rest}></BookItem>
	} else {
		return null
	}
}

export default SearchResultItem
