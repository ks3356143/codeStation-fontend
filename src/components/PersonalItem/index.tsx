import styles from "./index.module.css"

type Props = {
	info: { itemName: string; itemValue: string }
}

const PersonalItem = (props: Props) => {
	return (
		<div className={styles.infoContainer}>
			<div className={styles.left}>
				<div>{props.info.itemName}：</div>
				<div>{props.info.itemValue}</div>
			</div>
		</div>
	)
}

export default PersonalItem
