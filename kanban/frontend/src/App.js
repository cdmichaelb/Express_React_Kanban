import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Kanban from "./pages/kanban";
import Users from "./pages/users";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Kanban />} />
				<Route path="/users" element={<Users />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
