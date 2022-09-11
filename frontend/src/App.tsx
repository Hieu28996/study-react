import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutPortal from "layouts/LayoutPortal";
import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import CreatePost from "pages/CreatePost";
import PostDetail from "pages/PostDetail";
import Profile from "pages/Profile";

const App = () => {
	axios.defaults.baseURL = process.env.REACT_APP_SERVER_REQUEST;

	return (
		<div className="wrap">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/main" element={<LayoutPortal />}>
						<Route path="home" element={<Home />} />
						<Route path="createpost" element={<CreatePost />} />
						<Route path="postdetail" element={<PostDetail />} />
						<Route path="profile" element={<Profile />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
