import { createRoot } from "react-dom/client"
import App from "./App.tsx"
// 导入me样式
import "./styles/index.css"
// dayjs中文包配置
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")
// AntdV5兼容React19
import "@ant-design/v5-patch-for-react-19"
createRoot(document.getElementById("root")!).render(<App />)
