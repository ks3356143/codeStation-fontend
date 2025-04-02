import { ConfigProvider, App as AppContainer } from "antd"
import zhCN from "antd/locale/zh_CN"
import { router } from "./router"
import { RouterProvider } from "react-router"
import store from "./store"
import { Provider as StoreProvider } from "react-redux"
import "nprogress/nprogress.css"
import NProgress from "nprogress"
import { ToastContainer } from "react-toastify"

NProgress.configure({
	speed: 500, // 动画速度
	trickleSpeed: 200, // 增量加载速度
})

const App = () => {
	return (
		<ConfigProvider
			locale={zhCN}
			theme={{
				token: {
					borderRadius: 0,
					borderRadiusSM: 0,
					borderRadiusLG: 0,
				},
			}}
		>
			<AppContainer component={false}>
				{/* 配置全局toast */}
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					style={{
						fontSize: "16px",
						fontWeight: 500,
					}}
				></ToastContainer>
				<StoreProvider store={store}>
					<RouterProvider router={router} />
				</StoreProvider>
			</AppContainer>
		</ConfigProvider>
	)
}

export default App
