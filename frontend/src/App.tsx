import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import LoginAdmin from "admin/Login";
import HomeAdmin from "admin/Home";
import Users from "admin/Users/Users";

const App = () => {
	axios.defaults.baseURL = process.env.REACT_APP_SERVER_REQUEST;

	return (
		<Router>
			<div className="wrap">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/admin/login" element={<LoginAdmin />} />
					<Route path="/admin" element={<HomeAdmin />}>
						<Route path="users" element={<Users />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
