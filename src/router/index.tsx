import { lazy } from "react"
import { buildRoutes, RouteConfig } from "./utils"
import { createBrowserRouter } from "react-router"
import ErrorBoundary from "@/components/ErrorBoundary"

// 改造后的routes，注意提供middlewares异步组件的数组
const routeConfig: RouteConfig[] = [
	{
		ErrorBoundary: ErrorBoundary, // 统一处理的错误边界
		children: [
			{
				path: "/",
				element: lazy(() => import("@/layout")),
				children: [
					{
						index: true,
						element: lazy(() => import("@/pages/Issue")),
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
