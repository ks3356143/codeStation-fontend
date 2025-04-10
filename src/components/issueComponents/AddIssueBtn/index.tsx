import { memo } from "react"
import { useStoreSelector } from "@/store/hooks"
import { selectUser } from "@/store/userSlice"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import CtaButton from "@/components/atomics/CtaButton"
import styles from "./index.module.less"
/**
 * 添加问答按钮
 */
const AddIssueBtn = () => {
	const { isLogin } = useStoreSelector(selectUser)
	const navigate = useNavigate()
	const clickHandle = () => {
		if (isLogin) {
			navigate("/addIssue")
		} else {
			toast.error("请先登录，再进行提问")
		}
	}
	return (
		<div className={styles.btnCSS}>
			<CtaButton onClick={clickHandle}></CtaButton>
		</div>
	)
}

export default memo(AddIssueBtn)
