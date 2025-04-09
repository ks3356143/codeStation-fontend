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
	/**
	 * 请求积分前十的用户
	 */
	getUserByPoints(params = {}) {
		return request({
			url: "/user/points_rank",
			method: "get",
			params,
		})
	},
	/**
	 * 根据id查询单个用户信息
	 */
	getUserInfoById(params: any) {
		return request({
			url: "/user/get_info_by_id",
			method: "get",
			params: {
				user_id: params.user_id, // 注意这里更改了，非常注意
			},
		})
	},
}
