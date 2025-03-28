import axios from "axios"
import { message } from "antd"

// 创建axios实例 -> 目的是设置响应拦截器默认处理一些事情
const createService = () => {
	const service = axios.create()
	//

	// 实例请求拦截器
	service.interceptors.request.use(
		config => config,
		err => {
			return Promise.reject(err)
		}
	)
	// 实例响应拦截器
	service.interceptors.response.use(
		res => {
			if (
				(res.headers["content-disposition"] ||
					!/^application\/json/.test(res.headers["content-type"])) &&
				res.status === 200
			) {
				// 1.如果status=200直接放行
				return res.data
			} else if (res.data.code && res.data.code !== 200 && res.data.code !== 20000) {
				// 2.如果data.code不为200或20000，报antd中message错误、
				message.error(res.data.message)
			}
			return res.data
		},
		error => {
			const errFunc = (text: string) => {
				message.error(
					error.response && error.response.data && error.response.data.message
						? error.response.data.message
						: text
				)
			}
			// status = 400或500进入此处
			if (error.response && error.response.data) {
				switch (error.response.status) {
					case 404:
						errFunc("服务器资源不存在")
						break
					case 500:
						errFunc("服务器内部错误")
						break
					case 401:
						errFunc("登录状态已过期，或者账号密码错误")
						break
					case 403:
						errFunc("没有权限访问该资源")
						break
					default:
						errFunc("未知错误！")
						break
				}
			} else {
				errFunc("请求超时，服务器无响应")
			}
			return Promise.reject(error.response && error.response.data ? error.response.data : null)
		}
	)
	return service
}

export default createService
