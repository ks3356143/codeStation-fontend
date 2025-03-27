import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"

const store = configureStore({
	reducer: { user: userSlice.reducer },
})

export default store

// 类型定义
export type RootStateType = ReturnType<typeof store.getState>
