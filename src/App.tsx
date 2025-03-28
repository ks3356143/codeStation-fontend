import { ConfigProvider, App as AppContainer } from "antd"
import zhCN from "antd/locale/zh_CN"
import { router } from "./router"
import { RouterProvider } from "react-router"
import store from "./store"
import { Provider as StoreProvider } from "react-redux"
import type { MessageInstance } from "antd/es/message/interface"
import "nprogress/nprogress.css"
import NProgress from "nprogress"

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
				<StoreProvider store={store}>
					<RouterProvider router={router} />
				</StoreProvider>
			</AppContainer>
		</ConfigProvider>
	)
}

export default App
