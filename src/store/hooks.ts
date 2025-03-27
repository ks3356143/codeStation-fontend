import { useDispatch, useSelector } from "react-redux"
import store, { RootStateType } from "@/store"

export const useStoreDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useStoreSelector = useSelector.withTypes<RootStateType>()
