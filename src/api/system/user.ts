/* 该APIs为用户相关 */
import request from "@/api/request"

export default {
	/**
	 * 请求jwt-token
	 */
	fetchToken(data = {}) {
		return request({
			url: "/user/pair",
			method: "post",
			data,
		})
	},
	/**
	 * 请求用户信息
	 */
	fetchUserInfo(params = {}) {
		return request({
			url: "/user/get_info",
			method: "get",
			params,
		})
	},
}
