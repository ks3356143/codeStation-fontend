import { createSlice } from "@reduxjs/toolkit"
import { RootStateType } from "./"
import { createAsyncThunk } from "@reduxjs/toolkit"
import userApi from "@/api/system/user"
import localTool from "@/tools/localStorageFunc"

const userSlice = createSlice({
	name: "user",
	initialState: {
		isLogin: typeof window !== "undefined" && !!localStorage.getItem("token"),
		isLoading: false,
		userInfo: {
			id: "",
			avatar: "",
			date_joined: "",
			email: "",
			first_name: "",
			last_login: "",
			name: "",
			role: "",
			username: "",
			points: "",
		},
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchTokenCreator.pending, state => {
				state.isLoading = true
			})
			.addCase(fetchTokenCreator.rejected, (state, action) => {
				// 登录失败也提示
				state.isLoading = false
			})
			.addCase(fetchTokenCreator.fulfilled, (state, action) => {
				state.isLoading = false
				// 这里储存token到localStorage
				localTool.set("token", action.payload.data.access)
				// 切换已登录状态
				state.isLogin = true
			})
			.addCase(fetchUserInfo.rejected, state => {
				// 如果获取用户信息失败则退出登录
				localTool.remove("token")
				state.isLogin = false
			})
			.addCase(fetchUserInfo.fulfilled, (state, action: any) => {
				if (action.payload.success) {
					state.userInfo = action.payload.data
				} else {
					localTool.remove("token")
					state.isLogin = false
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
		const res = await userApi.fetchToken(loginFormValue)
		return res
	}
)
// 请求用户信息
export const fetchUserInfo = createAsyncThunk("user/fetchUserInfo", async () => {
	const res = await userApi.fetchUserInfo()
	return res
})

// Actions
export default userSlice

// Selectors
export const selectUser = (state: RootStateType) => state.user
