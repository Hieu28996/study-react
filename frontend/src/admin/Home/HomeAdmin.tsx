import LayoutAdmin from "admin/Layout";
import { UserState } from "pages/Login/Login";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const HomeAdmin = () => {
	const navigate = useNavigate();
	const currentUser = useSelector(
		(state: UserState) => state.login.currentUser
	);

	useEffect(() => {
		if (!currentUser) {
			navigate(`/admin/login`);
		}
	}, [currentUser, navigate]);

	return (
		<LayoutAdmin>
			<div className="main_ct">
				<div className="card">
					<Outlet />
				</div>
			</div>
		</LayoutAdmin>
	);
};

export default HomeAdmin;
