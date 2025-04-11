import styles from "./personal.module.css"
import ContentHeader from "@/components/ContentHeader"
import { useStoreSelector, useStoreDispatch } from "@/store/hooks"
import { fetchUserInfo } from "@/store/userSlice"
import { Button, Card, Image, Upload } from "antd"
import type { UploadProps } from "antd"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import PersonalItem from "@/components/PersonalItem"
import { formatDate } from "@/utils/commonUtils"
import { useState } from "react"
// 容错头像处理
import img1 from "@/asserts/imgs/imageQs.png"
import { toast } from "react-toastify"

const Personal = () => {
	const userInfo = useStoreSelector(store => store.user.userInfo)
	const dispatch = useStoreDispatch()
	// 上传按钮
	const [loading, setLoading] = useState(false) // 上传状态
	const uploadButton = (
		<button style={{ border: 0, background: "none", cursor: "pointer" }} type="button">
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>点击上传</div>
		</button>
	)
	// 上传回调
	const handleChange: UploadProps["onChange"] = info => {
		if (info.file.status === "uploading") {
			setLoading(true)
			return
		}
		if (info.file.status === "done") {
			// 成功后重新请求userInfo
			dispatch(fetchUserInfo())
			setLoading(false)
			toast.success("上传更新头像成功")
			return
		}
		// 上传失败的处理
		if (info.file.status === "error") {
			setLoading(false)
			toast.error("上传头像失败")
		}
	}
	return (
		<div className={styles.container}>
			<ContentHeader title="个人中心"></ContentHeader>
			{/* 信息展示 */}
			<div className={styles.container}>
				{/* 基本信息 */}
				<div className={styles.row}>
					<Card title="基本信息" extra={<Button type="link">编辑</Button>}>
						<PersonalItem info={{ itemName: "登录账号", itemValue: userInfo.username }} />
						<PersonalItem info={{ itemName: "账号密码", itemValue: "**** **** ***" }} />
						<PersonalItem info={{ itemName: "用户昵称", itemValue: userInfo.name }} />
						<PersonalItem info={{ itemName: "用户积分", itemValue: userInfo.points }} />
						<PersonalItem
							info={{ itemName: "注册时间", itemValue: formatDate(userInfo.date_joined) }}
						/>
						<div style={{ height: "50px", marginBottom: "-15px" }}>当前头像</div>
						{/* 头像容错处理 */}
						{userInfo.avatar ? (
							<Image
								src={`${import.meta.env.VITE_API_BASE_URL}${userInfo.avatar}`}
								width={100}
							/>
						) : (
							<Image src={img1} width={100} />
						)}
						<div style={{ height: "50px", marginTop: "20px" }}>上传新头像</div>
						<Upload
							name="file"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							accept="image/*"
							action={`/api/user/avatar?user_id=${userInfo.id}`}
							onChange={handleChange}
							disabled={loading}
						>
							{uploadButton}
						</Upload>
					</Card>
				</div>

				{/* 社交账号 */}
				<div className={styles.row}>1</div>

				{/* 个人简介 */}
				<div className={styles.row}>1</div>
			</div>
		</div>
	)
}

// loader
export const loader = () => {
	console.log("进入个人中心")
}

export default Personal
