import { lazy } from "react"
import { buildRoutes, RouteConfig } from "./utils"
import { createBrowserRouter } from "react-router"
import ErrorBoundary from "@/components/ErrorBoundary"
import LazyLoading from "@/components/LazyLoading"
// loader
import { loader as IssueLoader } from "@/pages/Issue"

// 改造后的routes，注意提供middlewares异步组件的数组
const routeConfig: RouteConfig[] = [
	{
		// 整体的loader/action错误边界
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: "/",
				element: lazy(() => import("@/layout")),
				middlewares: [
					// 验证登录和请求用户信息中间件
					lazy(() => import("@/router/middlewares/AuthMiddleware")),
				],
				children: [
					{
						index: true,
						element: lazy(() => import("@/pages/Issue")),
						loader: IssueLoader,
						hydrateFallbackElement: <LazyLoading></LazyLoading>,
						// 配置Issue页面的loader/action错误边界
						errorElement: <ErrorBoundary />,
					},
					{
						path: "/book",
						element: lazy(() => import("@/pages/Book")),
					},
					{
						path: "/quiz",
						element: lazy(() => import("@/pages/Quiz")),
					},
				],
			},
		],
	},
]

export const routes = buildRoutes(routeConfig)
export const router = createBrowserRouter(routes)
