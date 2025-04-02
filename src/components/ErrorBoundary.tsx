/* 组件说明：这是统一的错误页面，专用错误页面请在各级边界定义 */
import { Empty, Typography, Flex, Button, Alert, Spin } from "antd"
import { useRevalidator, useRouteError } from "react-router"
import { LoadingOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

// 注意你没有使用react router vite插件只能使用钩子函数
// const error = useRouteError() 注意axios拦截器拦截错误了，这里拿不到错误信息
const ErrorBoundary = () => {
	const error = useRouteError()
	// 判断是否为开发环境，开发环境则展示错误
	const showDev = process.env.NODE_ENV === "development"
	// 重试按钮-使用useRevalidation重新加载页面
	const revalidator = useRevalidator()
	const onRetry = () => {
		revalidator.revalidate()
	}
	return (
		<div
			style={{
				margin: "80px 0",
			}}
		>
			<Flex align="center" justify="center">
				<Empty
					image={<div style={{ fontSize: 80, lineHeight: 1, userSelect: "none" }}>🤔</div>}
					description={
						<Flex gap={16} vertical>
							<Title level={5}>
								{revalidator.state === "loading" ? (
									<div>
										<Spin indicator={<LoadingOutlined spin />} size="large" />
										正在尝试重新加载
									</div>
								) : (
									"页面似乎出了点小问题"
								)}
							</Title>
							<div>
								<Text type={"secondary"}>不过别担心，您的数据还在，可能是服务器错误</Text>
								<br />
								<div style={{ marginTop: 8 }}>
									<Text type={"secondary"}>如重试后仍然存在问题，请联系开发人员</Text>
								</div>
								<div style={{ marginTop: 24, marginBottom: 24 }}>
									<Button
										type="primary"
										onClick={onRetry}
										style={{ width: 200, height: 40 }}
									>
										重试
									</Button>
								</div>
								{error ? (
									showDev ? (
										<Alert
											type="error"
											message="开发环境报错"
											showIcon
											description={
												<div
													style={{
														overflow: "auto",
														maxHeight: "calc(100vh - 200px)",
														maxWidth: "1200px",
													}}
												>
													{JSON.stringify(error)}
												</div>
											}
										></Alert>
									) : (
										"生成环境无法查看堆栈"
									)
								) : null}
							</div>
						</Flex>
					}
				></Empty>
			</Flex>
		</div>
	)
}

export default ErrorBoundary
