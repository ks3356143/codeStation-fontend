import { useNavigate } from "react-router"
import { BookInfo } from "../IssueItem/types"
import styles from "./index.module.less"
import LaztImage from "@/components/atomics/LazyImage"
import img1 from "@/asserts/imgs/imageQs.png"

type Props = {
	bookInfo: BookInfo
}

const BookItem = (props: Props) => {
	const reg = /<[^<>]+>/g
	const bookIntro = props.bookInfo.bookInfo.replace(reg, "")
	const navigate = useNavigate()
	return (
		<div className={styles.container}>
			{/* 评论数 */}
			<div className={styles.bookNum}>
				<div>{props.bookInfo.commentNumber}</div>
				<div>评论</div>
			</div>
			{/* 浏览数 */}
			<div className={styles.bookNum}>
				<div>{props.bookInfo.scanNumber}</div>
				<div>浏览</div>
			</div>
			{/* 书籍内容 */}
			<div className={styles.bookContainer}>
				{/* 左边图片 */}
				<div className={styles.left}>
					<LaztImage
						className={styles.bookPic}
						src={
							props.bookInfo.picture
								? `${import.meta.env.VITE_API_BASE_URL}${props.bookInfo.picture}`
								: img1
						}
					/>
				</div>
				{/* 右侧分为上下 */}
				<div className={styles.right}>
					<div className={styles.top} onClick={() => navigate(`/bookDetail/${props.bookInfo.id}`)}>
						{props.bookInfo.title}
					</div>
					<div className={styles.bottom}>{bookIntro.slice(0, 55) + "..."}</div>
				</div>
			</div>
		</div>
	)
}

export default BookItem
