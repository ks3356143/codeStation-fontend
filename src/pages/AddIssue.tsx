import { Button, Form, Input, message, Select } from "antd"
import styles from "./addIssue.module.css"
import { Editor } from "@toast-ui/react-editor"
import { useActionState, useRef, startTransition, useEffect, useState } from "react"
import { Typography, Divider } from "antd"
import typeApi from "@/api/system/type"
import issueApi from "@/api/system/issue"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useStoreSelector } from "@/store/hooks"
import type { ICreateIssue } from "@/api/system/issue"

const AddIssue = () => {
	const navigate = useNavigate()
	const userInfo = useStoreSelector(state => state.user.userInfo)
	// 定义表单数据
	const initialIssueInfo = { issueTitle: "", issueContent: "", user_id: "", type_id: "" }
	const [issueInfo, setIssueInfo] = useState(initialIssueInfo as ICreateIssue)
	const addHandle = async (values: { issueTitle: string; type_id: string; issueContent: string }) => {
		const content = (editorRef.current as any).getInstance().getHTML()
		const postData = {
			issueContent: content,
			issueTitle: values.issueTitle,
			user_id: userInfo.id,
			type_id: values.type_id,
		}
		// 提交后返回首页
		await issueApi.createIssue(postData)
		navigate("/")
		toast.success("你的问题已经提交，审核通过后将会进行展示")
	}
	const formRef = useRef(null)
	const editorRef = useRef(null)
	// 定义下拉框的数据
	const [typeArrayState, action, isPending] = useActionState(async preState => {
		try {
			const res = await typeApi.getIssueTypeByPage()
			// 处理为[value:'',label:'']的格式
			const options = res.data.map((it: any) => {
				return {
					value: it.id,
					label: it.name,
				}
			})
			return options || [] // 确保返回数组
		} catch (err) {
			message.error("读取问答类型错误，请稍后再试")
			throw err // 抛出错误以保留preState
		}
	}, [])
	// 在页面展示时就请求数据
	useEffect(() => {
		startTransition(() => action())
	}, [])
	// 更新前端表单数据
	function updateInfo(newContent: string, key: keyof typeof issueInfo) {
		const newIssueInfo = { ...issueInfo }
		newIssueInfo[key] = newContent
		setIssueInfo(newIssueInfo)
	}
	// select因为是可控组件所以改变
	function handleChange(value: string) {
		updateInfo(value, "type_id")
	}
	return (
		<div className={styles.container}>
			<Typography.Title>提问题</Typography.Title>
			<Divider></Divider>
			<Form
				name="basic"
				labelCol={{ span: 2 }}
				wrapperCol={{ span: 24 }}
				initialValues={{}}
				autoComplete="off"
				ref={formRef}
				onFinish={addHandle}
			>
				{/* 问答标题 */}
				<Form.Item label="标题" name="issueTitle" rules={[{ required: true, message: "请输入标题" }]}>
					<Input
						placeholder="请输入标题"
						value={issueInfo.issueTitle}
						size="large"
						onChange={e => updateInfo(e.target.value, "issueTitle")}
					/>
				</Form.Item>

				{/* 问题类型 */}
				<Form.Item
					label="问题分类"
					name="type_id"
					rules={[{ required: true, message: "请选择问题所属分类" }]}
				>
					<Select
						style={{ width: 200 }}
						loading={isPending}
						options={typeArrayState}
						onChange={handleChange}
						notFoundContent={
							<Button onClick={() => startTransition(() => action())} type="link">
								暂无数据，重新请求
							</Button>
						}
					></Select>
				</Form.Item>

				{/* 问答内容 */}
				<Form.Item
					label="问题描述"
					name="issueContent"
					rules={[{ required: true, message: "请输入问题描述" }]}
				>
					<Editor
						initialValue=""
						previewStyle="vertical"
						height="400px"
						initialEditType="wysiwyg"
						useCommandShortcut={true}
						language="zh-CN"
						ref={editorRef}
					/>
				</Form.Item>

				{/* 确认按钮 */}
				<Form.Item wrapperCol={{ offset: 22 }}>
					<Button type="primary" size="large" htmlType="submit">
						确认新增
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddIssue
