import { useStoreSelector } from "@/store/hooks"
import { selectUser } from "@/store/userSlice"
import { Avatar, Dropdown, type MenuProps } from "antd"
import styles from "./uiverse.module.css"
import { memo } from "react"
import { useNavigate } from "react-router"
import LazyAvatar from "@/components/atomics/LazyAvatar"

type Props = {
	onLogin: () => void
}

// 定义退出登录逻辑 - 1.清除localStorage的token 2.刷新页面
const logout = () => {
	// 1.清除localStorage的token
	localStorage.removeItem("token")
	// 2.刷新页面即可清除登录状态
	location.reload()
}

// 缺省头像随机颜色
const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#f5222d", "#7cb305", "#13c2c2", "#1677ff"]
const getColor = () => {
	return colorList[Math.floor(Math.random() * colorList.length)]
}

// 该组件显示用户头像，如果没有登录，则显示注册/登录按钮
const LoginAvatar = (props: Props) => {
	const navigate = useNavigate()
	const toPersonal = () => {
		navigate(`/personal/${userInfo.id}`)
	}
	// 定义下拉框数据
	const items: MenuProps["items"] = [
		{
			key: "1",
			label: <div onClick={toPersonal}>个人中心</div>,
		},
		{
			key: "2",
			label: <div onClick={logout}>退出登录</div>,
		},
	]
	// 获取用户登录状态
	const { isLogin, userInfo } = useStoreSelector(selectUser)
	// 判断userInfo是否存在
	const url = `${import.meta.env.VITE_APP_BASE_URL.replace("/api", "")}${userInfo.avatar}`
	return isLogin ? (
		<Dropdown menu={{ items }} placement="bottom" arrow>
			<div style={{ userSelect: "none", cursor: "pointer" }}>
				{userInfo.avatar ? (
					<LazyAvatar size="large" src={<img src={url} alt="avatar" />} />
				) : (
					<Avatar size="large" style={{ backgroundColor: getColor() }}>
						{userInfo.name[0]}
					</Avatar>
				)}
			</div>
		</Dropdown>
	) : (
		<button className={styles.buttonStyle} onClick={props.onLogin}>
			注册/登录
		</button>
	)
}

export default memo(LoginAvatar)
