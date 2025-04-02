import { Button, message } from "antd"
import { useStoreSelector } from "@/store/hooks"
import { selectUser } from "@/store/userSlice"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
/**
 * 添加问答按钮
 */
const AddIssueBtn = () => {
	const { isLogin } = useStoreSelector(selectUser)
	const navigate = useNavigate()
	const clickHandle = () => {
		if (isLogin) {
		} else {
			toast.error("请先登录，再进行提问")
		}
	}
	return (
		<>
			<Button
				type="primary"
				size="large"
				style={{
					width: "100%",
					marginBottom: "30px",
				}}
				onClick={clickHandle}
			>
				我要发问
			</Button>
		</>
	)
}

export default AddIssueBtn
