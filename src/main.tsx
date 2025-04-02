import { createRoot } from "react-dom/client"
import App from "./App.tsx"
// 导入我的样式
import "./styles/index.css"
// 导入toastify样式
import "react-toastify/ReactToastify.css"
// dayjs中文包配置
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")
// AntdV5兼容React19
import "@ant-design/v5-patch-for-react-19"
createRoot(document.getElementById("root")!).render(<App />)
