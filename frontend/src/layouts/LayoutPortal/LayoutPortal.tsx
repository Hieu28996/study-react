import Header from "components/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "pages/Login/Login";

const LayoutPortal = () => {
	const User = useSelector((state: UserState) => state.login.currentUser);

	return (
		<>
			<Header user={User} />
			<div className="container">
				<Outlet />
			</div>
		</>
	);
};

export default LayoutPortal;
