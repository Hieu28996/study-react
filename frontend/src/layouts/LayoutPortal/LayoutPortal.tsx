import Header from "components/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const LayoutPortal = () => {
	const User = useSelector((state: any) => state.login.currentUser);

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
