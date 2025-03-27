import { createSlice } from "@reduxjs/toolkit"
import { RootStateType } from "./"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { message } from "antd"

const userSlice = createSlice({
	name: "user",
	initialState: {
		isLogin: typeof window !== "undefined" && !!localStorage.getItem("token"),
		isLoading: false,
		userInfo: {},
	},
	reducers: {
		initUserInfo: (state, payload) => {
			state.userInfo = payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTokenCreator.pending, state => {
				state.isLoading = true
				message.open({
					key: "login",
					type: "loading",
					content: "正在登录中...",
				})
			})
			.addCase(fetchTokenCreator.rejected, (state, action) => {
				state.isLoading = false
			})
			.addCase(fetchTokenCreator.fulfilled, (state, action) => {
				state.isLoading = false
				if (action.payload.code === "authentication_failed") {
					message.open({
						key: "login",
						type: "error",
						content: action.payload.detail,
					})
				} else {
					// 这里储存token到localStorage
					localStorage.setItem("token", action.payload.access)
					// 切换已登录状态
					state.isLogin = true
					message.open({
						key: "login",
						type: "success",
						content: "登录成功!",
					})
				}
			})
	},
})

// thunk action creator
// 请求token
import type { LoginFormType } from "@/components/LoginForm"
export const fetchTokenCreator = createAsyncThunk(
	"user/fetchToken",
	async (loginFormValue: LoginFormType) => {
		const res = await fetch("/api/api/user/pair", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginFormValue),
		}).then(res => res.json())
		return res.data
	}
)

// Actions
const { initUserInfo } = userSlice.actions

export default userSlice

// Selectors
export const selectUser = (state: RootStateType) => state.user
