import { Button, Flex, Form, Input, Modal, Radio, type RadioChangeEvent, Divider, Image } from "antd"
import { type CheckboxGroupProps } from "antd/es/checkbox"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import styles from "./index.module.less"
import { useStoreDispatch, useStoreSelector } from "@/store/hooks"
import { fetchTokenCreator } from "@/store/userSlice"
import { selectUser } from "@/store/userSlice"
import noRegisterImg from "@/asserts/imgs/no-register.svg"

type Props = {
	isShow: boolean
	onClose: () => void
}

// 定义登录表单类型
export type LoginFormType = {
	username: string
	password: string
}

// 定义Radio的配置
const RadioOptions: CheckboxGroupProps<string>["options"] = [
	{ label: "登录", value: "login" },
	{ label: "注册", value: "register" },
]

const LoginForm = (props: Props) => {
	const [tabValue, setTabValue] = useState("login")
	const dispatch = useStoreDispatch() // 获取dispatch
	const { isLoading, isLogin } = useStoreSelector(selectUser)

	// 切换Tab事件处理函数
	const onTabChange = (e: RadioChangeEvent) => {
		setTabValue(e.target.value) // 受控组件
	}
	// 登录表单-提交
	const onFinish = (values: LoginFormType) => {
		dispatch(fetchTokenCreator(values)) // 请求登录
	}

	// 登录注册的表单内容
	const container =
		tabValue === "login" ? (
			<Form
				name="login"
				initialValues={{ username: "", password: "" }}
				style={{ maxWidth: "100%" }}
				onFinish={onFinish}
				size="large"
			>
				<Form.Item name="username" rules={[{ required: true, message: "请输入您的用户名" }]}>
					<Input prefix={<UserOutlined />} allowClear placeholder="用户名" />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: "请输入您的密码" }]}>
					<Input prefix={<LockOutlined />} allowClear type="password" placeholder="密码" />
				</Form.Item>

				<Form.Item>
					<Button
						block
						type="primary"
						htmlType="submit"
						className={styles.loginButton}
						disabled={isLoading}
						loading={isLoading}
					>
						登录
					</Button>
				</Form.Item>
			</Form>
		) : (
			<div className={styles.noRegisterImgContainer}>
				<Image preview={false} width={200} height={200} src={noRegisterImg}></Image>
				<span
					style={{
						color: "#666",
					}}
				>
					暂无注册功能，请使用内网账号登录...
				</span>
			</div>
		)

	return (
		<div className="login-form-container">
			<Modal title="登录/注册" open={props.isShow && !isLogin} onCancel={props.onClose} footer={null}>
				<Flex vertical gap="middle" className={styles.radioContainer}>
					<Radio.Group
						block
						options={RadioOptions}
						optionType="button"
						buttonStyle="solid"
						value={tabValue}
						onChange={onTabChange}
					/>
					{/* 显示对应登录/注册表单 */}
					<Divider style={{ borderColor: "#7cb305" }}>
						{tabValue === "login" ? "登录" : "注册"}
					</Divider>
					<div className={styles.formContainer}>{container}</div>
				</Flex>
			</Modal>
		</div>
	)
}

export default LoginForm
