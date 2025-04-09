import { useEffect } from "react"
import { useOutlet } from "react-router"
import { useStoreDispatch, useStoreSelector } from "@/store/hooks"
import { fetchUserInfo } from "@/store/userSlice"
import NProgress from "nprogress"

const AuthMiddleware = () => {
	const outlet = useOutlet()
	const dispatch = useStoreDispatch()
	const { isLogin, userInfo } = useStoreSelector(store => store.user)

	useEffect(() => {
		// 如果登录且没有用户信息的role则进行请求
		if (isLogin && !userInfo.role) {
			dispatch(fetchUserInfo())
		}
	})

	// 进度条设置
	useEffect(() => {
		NProgress.done()
		return () => {
			NProgress.start()
		}
	})

	return <>{outlet}</>
}

export default AuthMiddleware
