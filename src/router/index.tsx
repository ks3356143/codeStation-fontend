import { lazy } from "react"
import { buildRoutes, RouteConfig } from "./utils"
import { createBrowserRouter } from "react-router"
import ErrorBoundary from "@/components/ErrorBoundary"
import LazyLoading from "@/components/LazyLoading"
// loader
import { loader as IssueLoader } from "@/pages/Issue"
import { loader as IssueDetailLoader } from "@/pages/IssueDetail"
import { loader as PageSearchLoader } from "@/pages/PageSearch"
import { loader as QuizLoader } from "@/pages/Quiz"
import { loader as PersonalLoader } from "@/pages/Personal"

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
						errorElement: <ErrorBoundary />,
					},
					{
						path: "/quiz",
						element: lazy(() => import("@/pages/Quiz")),
						loader: QuizLoader,
						hydrateFallbackElement: <LazyLoading></LazyLoading>,
						errorElement: <ErrorBoundary />,
					},
					{
						path: "/addIssue",
						element: lazy(() => import("@/pages/AddIssue")),
						middlewares: [lazy(() => import("@/router/middlewares/AuthProtectMiddleware"))],
					},
					{
						path: "/issueDetail/:issueId",
						element: lazy(() => import("@/pages/IssueDetail")),
						hydrateFallbackElement: <LazyLoading></LazyLoading>,
						loader: IssueDetailLoader,
					},
					{
						path: "/pageSeach/:searchValue/:searchOption",
						element: lazy(() => import("@/pages/PageSearch")),
						hydrateFallbackElement: <LazyLoading></LazyLoading>,
						loader: PageSearchLoader,
						errorElement: <ErrorBoundary />,
					},
					{
						path: "/personal/:id",
						element: lazy(() => import("@/pages/Personal")),
						middlewares: [lazy(() => import("@/router/middlewares/AuthProtectMiddleware"))],
						hydrateFallbackElement: <LazyLoading></LazyLoading>,
						loader: PersonalLoader,
					},
				],
			},
		],
	},
]

export const routes = buildRoutes(routeConfig)
export const router = createBrowserRouter(routes)
