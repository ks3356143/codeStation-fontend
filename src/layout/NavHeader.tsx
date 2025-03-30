import { Input, Select } from "antd"
import { NavLink } from "react-router"
import LoginAvatar from "@/components/LoginAvartar"

type Props = {
	onLogin: () => void
}

const NavHeader = (props: Props) => {
	return (
		<header className="nav-header-container">
			{/* logo */}
			<div className="log-container">
				<div className="logo"></div>
			</div>
			{/* 导航 */}
			<div className="navigation-list">
				<NavLink to="/" viewTransition>
					问答
				</NavLink>
				<NavLink to="/book" viewTransition>
					书籍
				</NavLink>
				<NavLink to="/quiz" viewTransition>
					考试题
				</NavLink>
				<a href="https://www.baidu.com" target="_blank">
					测试管理平台
				</a>
			</div>

			{/* 搜索框 */}
			<div className="input-search">
				<Select defaultValue="issue" size="large">
					<Select.Option value="issue">问答</Select.Option>
					<Select.Option value="book">书籍</Select.Option>
				</Select>
				<Input.Search placeholder="请输入搜索内容..." allowClear enterButton="搜索" size="large" />
			</div>

			{/* 登录注册按钮和用户头像 */}
			<div className="login-button-container">
				<LoginAvatar onLogin={props.onLogin}></LoginAvatar>
			</div>
		</header>
	)
}

export default NavHeader
