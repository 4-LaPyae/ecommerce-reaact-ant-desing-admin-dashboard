import { ConfigProvider } from "antd"
import defaultTheme from "./themes/default-theme"
import Router from "./config/routes/index"
import "./App.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

function App() {
	return (
		<ConfigProvider componentSize="large" theme={defaultTheme}>
			<Router />
		</ConfigProvider>
	)
}

export default App
library.add(fas)
