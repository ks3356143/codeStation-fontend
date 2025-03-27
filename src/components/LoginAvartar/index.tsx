import { useStoreSelector } from "@/store/hooks"
import { selectUser } from "@/store/userSlice"
import { Avatar, Button, Dropdown, type MenuProps } from "antd"
import { UserOutlined } from "@ant-design/icons"

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

// 定义下拉框数据
const items: MenuProps["items"] = [
	{
		key: "1",
		label: (
			<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
				个人中心
			</a>
		),
	},
	{
		key: "2",
		label: <div onClick={logout}>退出登录</div>,
	},
]

// 该组件显示用户头像，如果没有登录，则显示注册/登录按钮
const LoginAvatar = (props: Props) => {
	// 获取用户登录状态
	const { isLogin, userInfo } = useStoreSelector(selectUser)
	// 判断userInfo是否存在
	const url = userInfo.avatar

	return isLogin ? (
		<Dropdown menu={{ items }} placement="bottom" arrow>
			{url ? (
				<Avatar size="large" src={<img src={url} alt="avatar" />} />
			) : (
				<Avatar size="large" style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
			)}
		</Dropdown>
	) : (
		<Button type="primary" size="large" onClick={props.onLogin}>
			注册/登录
		</Button>
	)
}

export default LoginAvatar
