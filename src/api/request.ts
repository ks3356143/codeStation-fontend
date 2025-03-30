import type { AxiosInstance, AxiosRequestConfig } from "axios"
import createInstance from "./axiosInstanceCreator"
import localTool from "@/tools/localStorageFunc"
import { isEmpty } from "lodash-es"
import { stringify } from "qs"

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 * @returns {Function} 参数请求options，进行请求
 */
function createRequest(service: AxiosInstance) {
	return function (config: AxiosRequestConfig) {
		const env = import.meta.env
		const token = localTool.get(env.VITE_APP_TOKEN_PREFIX)
		// 默认请求options
		const configDefault: AxiosRequestConfig = {
			headers: {
				Authorization: "Bearer " + token,
				"Accept-Language": "zh_CN",
				"Content-Type": "application/json;charset=UTF-8",
			},
			timeout: 20000,
			baseURL: env.VITE_APP_OPEN_PROXY === "true" ? env.VITE_APP_PROXY_PREFIX : env.VITE_APP_BASE_URL,
			data: {},
		}
		const option = Object.assign(configDefault, config)
		if (!isEmpty(option.params)) {
			option.url = option.url + "?" + stringify(option.params)
			option.params = {}
		}
		return service(option)
	}
}

const service = createInstance()
export default createRequest(service)
