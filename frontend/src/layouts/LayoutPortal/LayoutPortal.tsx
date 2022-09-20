import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "components/Header";
import { UserState } from "pages/Login/Login";

const LayoutPortal = () => {
	const loginUser = useSelector((state: UserState) => state.login.currentUser);

	const currentUser = useSelector(
		(state: { allUser: { currentUser: UserState } }) =>
			state.allUser.currentUser
	);

	return (
		<>
			<Header user={currentUser?.user || loginUser} />
			<div className="container">
				<Outlet />
			</div>
		</>
	);
};

export default LayoutPortal;
