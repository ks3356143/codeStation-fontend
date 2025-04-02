import styles from "./recommendItem.module.less"

type Props = {
	recommendInfo: {
		num: number
		title: string
		href: string
	}
}

const RecommendItem = (props: Props) => {
	return (
		<a className={styles.container} href={props.recommendInfo.href} target="_blank" rel="noreferrer">
			<div className={styles.leftSide}>{props.recommendInfo.num}</div>
			<div className={styles.rightSide}>{props.recommendInfo.title}</div>
		</a>
	)
}

export default RecommendItem
