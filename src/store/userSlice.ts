import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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
			.addCase(fetchTokenCreator.rejected, state => {
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
			.addCase(modifyNameOnUser.pending, state => {
				state.isLoading = true
			})
			.addCase(modifyNameOnUser.rejected, state => {
				state.isLoading = false
			})
			.addCase(modifyNameOnUser.fulfilled, (state, action: PayloadAction<string>) => {
				state.userInfo.name = action.payload
				state.isLoading = false
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
// 修改用户name -> 三个泛型分别为：返回值类型/参数类型(无参数void)/thunkAPI类型(里面指定state类型)
export const modifyNameOnUser = createAsyncThunk<string, string, { state: RootStateType }>(
	"user/modifyNameOnUser",
	async (name, thunkApi) => {
		// 获取仓库的user_id
		const user_id = thunkApi.getState().user.userInfo.id
		const res = await userApi.modifyUserNickName(user_id, name)
		return res.data
	}
)

// Actions
export default userSlice

// Selectors
export const selectUser = (state: RootStateType) => state.user
