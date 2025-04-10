import { Layout as AntdLayout } from "antd"
import NavHeader from "./NavHeader"
import PageFooter from "./PageFooter"
import LoginForm from "@/components/LoginForm"
import "./index.less"
import { useOutlet } from "react-router"
import { useState } from "react"
// 获取antd组件
const { Header, Footer, Content } = AntdLayout

const Layout = () => {
	// 点击打开登录Modal
	const onLogin = () => {
		setIsModalOpen(true)
	}
	// 登录弹窗状态
	const [isModalOpen, setIsModalOpen] = useState(false)
	const closeModal = () => {
		setIsModalOpen(false)
	}
	// 子路由显示
	const outlet = useOutlet()
	return (
		<div className="layout-container">
			{/* 顶部导航 */}
			<Header className="header-main">
				<NavHeader onLogin={onLogin}></NavHeader>
			</Header>
			{/* 登录的弹窗 */}
			<LoginForm isShow={isModalOpen} onClose={closeModal}></LoginForm>
			{/* 匹配路由内容 */}
			<Content>{outlet}</Content>
			{/* 底部页脚 */}
			<Footer style={{ textAlign: "center" }}>
				<PageFooter></PageFooter>
			</Footer>
		</div>
	)
}

export default Layout
