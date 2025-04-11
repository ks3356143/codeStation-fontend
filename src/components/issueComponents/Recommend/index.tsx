import { Card, Carousel, Image } from "antd"
import styles from "./recommend.module.less"
import RecommendItem from "./RecommendItem"
import { memo } from "react"
import img1 from "@/asserts/lunbo/1.webp"
import img2 from "@/asserts/lunbo/2.webp"
import img3 from "@/asserts/lunbo/3.webp"

// 问答页面右侧推荐组件
const Recommend = () => {
	return (
		<Card title="推荐内容" variant="borderless" hoverable style={{ cursor: "auto" }}>
			{/* 上方轮播图 */}
			<div style={{ marginBottom: 20 }}>
				<Carousel autoplay arrows adaptiveHeight>
					<Image
						preview={false}
						className={styles.contentStyle}
						src={img1}
						width={315}
						height={178}
					></Image>
					<Image
						preview={false}
						className={styles.contentStyle}
						src={img2}
						width={315}
						height={178}
					></Image>
					<Image
						preview={false}
						className={styles.contentStyle}
						src={img3}
						width={315}
						height={178}
					></Image>
				</Carousel>
			</div>

			<RecommendItem
				recommendInfo={{
					num: 1,
					title: "利用思否猫素材实现一个丝滑的轮播图（html + css + js）",
					href: "https://segmentfault.com/a/1190000042661646",
				}}
			/>
			<RecommendItem
				recommendInfo={{
					num: 2,
					title: "「🌟技术探索🌟」借助 CI / CD 实现前端应用的快速回滚",
					href: "https://segmentfault.com/a/1190000042531062",
				}}
			/>
			<RecommendItem
				recommendInfo={{
					num: 3,
					title: "面试说：聊聊JavaScript中的数据类型",
					href: "https://segmentfault.com/a/1190000042539876",
				}}
			/>
			<RecommendItem
				recommendInfo={{
					num: 4,
					title: "单标签实现复杂的棋盘布局",
					href: "https://segmentfault.com/a/1190000042513947",
				}}
			/>
		</Card>
	)
}

export default memo(Recommend)
