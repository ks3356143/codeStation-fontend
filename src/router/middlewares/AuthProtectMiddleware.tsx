import { useNavigate, useOutlet } from "react-router"
import { useStoreSelector } from "@/store/hooks"
import { toast } from "react-toastify"
import { useEffect } from "react"

/**
 * 对特定页面进行保护：如addIssue页面，让用户不能未登录访问
 */
const AuthProtectMiddleware = () => {
	const outlet = useOutlet()
	const navigate = useNavigate()
	const { isLogin } = useStoreSelector(store => store.user)

	useEffect(() => {
		// 判断是否登录，如果没登录则跳转问答页面
		if (!isLogin) {
			navigate("/")
			toast.error("您不能直接访问页面，需要先登录")
		}
	}, [])

	return <>{outlet}</>
}

export default AuthProtectMiddleware
