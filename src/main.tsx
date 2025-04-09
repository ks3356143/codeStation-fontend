import { createRoot } from "react-dom/client"
import App from "./App.tsx"
// 导入我的样式
import "./styles/index.css"
// 导入toastify样式
import "react-toastify/ReactToastify.css"
// iconfont导入
import "@/asserts/icons/iconfont.css"
// 导入toast-ui/react-editor样式
import "@toast-ui/editor/dist/toastui-editor.css"
import "@toast-ui/editor/dist/i18n/zh-cn"
// 配置高亮和html渲染的样式
import "highlight.js/styles/github.min.css"
import "github-markdown-css/github-markdown.css"
// dayjs中文包配置
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")
// AntdV5兼容React19
import "@ant-design/v5-patch-for-react-19"
createRoot(document.getElementById("root")!).render(<App />)
