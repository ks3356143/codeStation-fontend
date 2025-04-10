import { Input, Select } from "antd"
import { NavLink, useNavigate, useParams } from "react-router"
import LoginAvatar from "@/components/LoginAvartar"
import { useState } from "react"

type Props = {
	onLogin: () => void
}

const NavHeader = (props: Props) => {
	const navigate = useNavigate()
	const params = useParams()
	const [searchType, setSearchType] = useState("issue")
	// 维护用户输入框状态-受控起来
	const [searchValue, setSearchValue] = useState(params.searchValue)
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
				<Select
					defaultValue="issue"
					value={searchType}
					size="large"
					onChange={val => {
						setSearchType(val)
					}}
				>
					<Select.Option value="issue">问答</Select.Option>
					<Select.Option value="book">书籍</Select.Option>
				</Select>
				<Input.Search
					placeholder="请输入搜索内容..."
					allowClear
					enterButton="搜索"
					size="large"
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					onSearch={value => {
						if (value.trim()) {
							// 搜索框有内容，需要搜索操作
							navigate(`/pageSeach/${value}/${searchType}`)
						} else {
							// 搜索框没有内容或点击了x，跳转首页
							navigate("/")
						}
					}}
				/>
			</div>
			{/* 登录注册按钮和用户头像 */}
			<div className="login-button-container">
				<LoginAvatar onLogin={props.onLogin}></LoginAvatar>
			</div>
		</header>
	)
}

export default NavHeader
